import {
  Get, JsonController, Req, Res,
} from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import paypal from 'app/services/PayPal';
import Order, { OrderStatus, ShippingPartners } from 'app/entity/Order';
import Transaction, { TransactionStatus } from 'app/entity/Transaction';
import shippingEasy from 'app/services/ShippingEasy';
import { getTemplate, sendEmail } from 'services/mailer';
import commonService from 'app/services/Common';
import logger from 'app/services/Logger';
import { sendToSales, sendToCsrDeclines } from 'app/services/Slack';

@JsonController('/payment')
export default class PaymentController {

  @Get('/paypal/success')
  @OpenAPI({
    description: 'PayPal Success Callback',
  })
  async paymentSuccess(@Req() request: any, @Res() response: any) {
    const { orderId, token, transactionId } = request.query;
    const order = await Order.findOne({
      relations: ['billingAddress', 'shippingAddress', 'items', 'items.product'],
      where: { orderId },
    });
    const transaction = await Transaction.findOne({ transactionId });
    try {
      const url = process.env.REACT_APP_URL;
      if (order instanceof Order) {
        if (transaction instanceof Transaction) {
          const payment: any = await paypal.captureOrder(token);
          if (payment.statusCode === 201) {
            transaction.gatewayId = payment.result.purchase_units[0].payments.captures[0].id;
            transaction.responseData = payment.result;
            transaction.status = TransactionStatus.Completed;
            await transaction.save();

            order.status = OrderStatus.Received;
            try {
              const easyShippingOrder = await shippingEasy.createOrder(order);
              if (easyShippingOrder?.data?.order) {
                order.shippingPartner = ShippingPartners.ShippingEasy;
                order.status = OrderStatus.Awaiting_Shipment;
                order.shippingMeta = easyShippingOrder.data.order;
                order.shipmentTrackingNumber = easyShippingOrder.data.order.id;
              }
            } catch (_err: any) {
              logger.warn(`[ShippingEasy Order Creation Failed] #${order.orderId} ${_err.message} ${JSON.stringify(_err.response?.data)}`);
            }
            await order.save();
            const totalShippingCost = parseFloat(`${order.shippingCost}`) + parseFloat(`${order.internationalShippingCost}`);
            const emailContent = await getTemplate('emails/order-received.ejs', { order, transaction, totalShippingCost });
            sendEmail({
              to: order.shippingAddress.emailAddress,
              cc: 'sales@candycoin.com',
              subject: `Order ${order.orderId} Receipt from CandyCoin.com`,
              html: emailContent,
            });

            try {
              await sendToSales(order, transaction);
            } catch (_salesErr: any) {
              await sendToCsrDeclines(order, transaction, _salesErr.message);
            }

            await commonService.updateInventoryHistory(order);
            response.redirect(`${url}/order-confirmation/${orderId}?payment_mode=paypal`);
            return response;
          }
        }
      }
      return {
        success: false,
        message: 'Invalid Request',
      };
    } catch (_err: any) {
      if (order instanceof Order && transaction instanceof Transaction) {
        await sendToCsrDeclines(order, transaction, _err.message);
      }
      logger.warn(`[Payment Success Callback Failed] ${_err.message}`);
      return {
        success: false,
        message: 'Invalid Request',
        error: _err.message,
      };
    }
  }

  @Get('/paypal/cancel')
  @OpenAPI({
    description: 'PayPal Cancel Callback',
  })
  async paymentCancel(@Req() request: any, @Res() response: any) {
    const { orderId, transactionId } = request.query;
    const order = await Order.findOne({ orderId });
    const transaction = await Transaction.findOne({ transactionId });
    try {
      const url = process.env.REACT_APP_URL;
      if (order instanceof Order) {
        if (transaction instanceof Transaction) {
          transaction.status = TransactionStatus.Cancelled;
          await transaction.save();

          order.status = OrderStatus.Cancelled;
          await order.save();
          response.redirect(`${url}/checkout`);
          return response;
        }
      }
      return {
        success: false,
        message: 'Invalid Request',
      };
    } catch (_err: any) {
      logger.warn(`[Payment Cancel Callback Failed] ${_err.message}`);
      return {
        success: false,
        message: 'Invalid Request',
        error: _err.message,
      };
    }
  }

}
