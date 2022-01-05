// @ts-ignore
import paypal from '@paypal/checkout-server-sdk';
import Order from 'models/order';

class PayPalService {

  private client: any;

  constructor() {

    const clientId = process.env.PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const environment = process.env.PAYPAL_ENV === 'prod' ? new paypal.core.LiveEnvironment(clientId, clientSecret) : new paypal.core.SandboxEnvironment(clientId, clientSecret);
    this.client = new paypal.core.PayPalHttpClient(environment);
  }
  
  async createPayment(order:any,  return_url: string, cancel_url: string) {
  // console.log(order)
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      application_context: {
        return_url,
        cancel_url,
      },
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: order.total_amount,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: order.sub_amount,
              },
              shipping: {
                currency_code: 'USD',
                value: order.shipping_cost,
              },
              discount: {
                currency_code: 'USD',
                value: '0',
              }
              ,
            },
          },
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

  async filterOrderItems(items: any) {
    return items.map((item: any) => ({
      name: item.product.title,
      sku: item.product.sku,
      unit_amount: {
        currency_code: 'USD',
        value: item.price,
      },
      quantity: item.quantity,
      category: 'PHYSICAL_GOODS',
    }));
  }

}

export default new PayPalService();
