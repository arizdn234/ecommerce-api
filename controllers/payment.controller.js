const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PaymentController {
  static async processPayment(req, res) {
    try {
      const { orderId, amount, paymentMethod } = req.body;

      // *note
      // Perform the payment processing here.
      // Assuming the payment was approved

      const paymentResult = {
        status: 'success',
        message: 'Payment processed successfully',
        orderId,
        amount,
        paymentMethod,
      };

      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'paid' },
      });

      res.status(200).json(paymentResult);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = PaymentController;
