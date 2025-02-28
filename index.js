module.exports = async (req, res) => {
    if (req.method === 'POST') {
      try {
        const data = req.body;
  
        // Обрабатываем успешную оплату
        if (data.event === 'payment.succeeded') {
          const paymentId = data.object.id;
          const amount = data.object.amount.value;
          const email = data.object.receipt.customer.email || 'не указан';
  
          // Логируем событие
          console.log(`Оплата успешна: ${paymentId}, сумма: ${amount}, email: ${email}`);
  
          // Ответ ЮKassa, что запрос обработан
          res.status(200).send('OK');
        } else {
          res.status(200).send('Event not processed');
        }
      } catch (error) {
        console.error('Ошибка обработки вебхука:', error);
        res.status(500).send('Internal Server Error');
      }
    } else {
      res.status(405).send('Method Not Allowed');
    }
  };
