// netlify/functions/yookassa_webhook.js
module.exports.handler = async function (event, context) {
    const body = JSON.parse(event.body);
  
    if (body.event === 'payment.succeeded') {
      const paymentId = body.object.id;
      const amount = body.object.amount.value;
      const email = body.object.receipt.customer.email || 'не указан';
  
      console.log(`Оплата успешна: ${paymentId}, сумма: ${amount}, email: ${email}`);
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Оплата прошла успешно' }),
      };
    }
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Событие не обработано' }),
    };
  };
