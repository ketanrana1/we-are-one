// @ts-ignore
import paypal from '@paypal/checkout-server-sdk';
//import Order from 'models/order';



class PayPalService {

  private client: any;    

  constructor() {

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const environment = process.env.PAYPAL_ENV === 'prod' ? new paypal.core.LiveEnvironment(clientId, clientSecret) : new paypal.core.SandboxEnvironment(clientId, clientSecret);
    this.client = new paypal.core.PayPalHttpClient(environment);
  }

  async createPayment( returnUrl: any, cancelUrl: any) {

    const order = {

      totalAmount: 25,
      subTotalAmount: 25,
      shippingCost: 0,
      internationalShippingCost: 0,
      discountAmount: 0


    
    }

    const request = new paypal.orders.OrdersCreateRequest();
    // const orderItems = await this.filterOrderItems(order.items);
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: `${order.totalAmount}`,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: `${order.subTotalAmount}`,
              },
              shipping: {
                currency_code: 'USD',
                value: parseFloat(`${order.shippingCost}`) + parseFloat(`${order.internationalShippingCost}`),
              },
              discount: {
                currency_code: 'USD',
                value: `${order.discountAmount}`,
              }
              ,
            },
          },
          // items: orderItems,
          // shipping: {
          //   name: {
          //     full_name: `${order.shippingAddress.firstName} ${order.shippingAddress.firstName}`,
          //   },
          //   address: {
          //     address_line_1: order.shippingAddress.addressLine1,
          //     address_line_2: order.shippingAddress.addressLine2,
          //     admin_area_2: order.shippingAddress.state,
          //     admin_area_1: order.shippingAddress.city,
          //     postal_code: order.shippingAddress.postalCode,
          //     country_code: order.shippingAddress.country,
          //   },
          // },
        },
      ],
    });
    return this.client.execute(request);
  }

  async captureOrder(orderId: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    return this.client.execute(request);
  }

  // async refundOrder(transaction: Transaction , amount: any) {
  //   const request = new paypal.payments.CapturesRefundRequest(transaction.gatewayId);
  //   request.requestBody({
  //     amount: {
  //       currency_code: transaction.currency,
  //       value: parseFloat(String(amount)).toFixed(2)
  //     }
  //   });
  //   return this.client.execute(request);
  // }

  // async filterOrderItems(items: any) {
  //   return items.map((item: any) => ({
  //     name: item.product.title,
  //     sku: item.product.sku,
  //     unit_amount: {
  //       currency_code: 'USD',
  //       value: item.price,
  //     },
  //     quantity: item.quantity,
  //     category: 'PHYSICAL_GOODS',
  //   }));
  // }

}

export default new PayPalService();