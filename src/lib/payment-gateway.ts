export type PaymentResult = {
  success: boolean;
  transactionId?: string;
  error?: string;
};

export type CardPaymentInput = {
  amount: number;
  currency: string;
  orderId: string;
  cardLast4: string;
};

export async function processCardPayment(
  input: CardPaymentInput
): Promise<PaymentResult> {
  // =============================================================
  // PAYMENT GATEWAY INTEGRATION POINT
  // =============================================================
  // The client will connect their own payment gateway here.
  // Replace the body of this function with a real charge call, e.g.:
  //
  // Stripe (https://stripe.com/docs/payments/quickstart):
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: input.amount * 100, // paise / minor units
  //     currency: "pkr",
  //     metadata: { orderId: input.orderId },
  //     confirm: true,
  //   });
  //   return { success: true, transactionId: paymentIntent.id };
  //
  // JazzCash (https://developer.jazzcash.com.pk):
  //   return { success: true, transactionId: "<gateway-txn-id>" };
  //
  // EasyPaisa: similar HTTP POST flow.
  //
  // On failure return { success: false, error: "A user-friendly message" }.
  // =============================================================

  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    success: true,
    transactionId: `TXN-${input.orderId}-${Date.now().toString(36).toUpperCase()}`,
  };
}
