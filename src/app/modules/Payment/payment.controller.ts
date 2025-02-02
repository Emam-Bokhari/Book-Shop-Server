import { asyncHandler } from '../../utils/global/asyncHandler';

const paymentSuccessController = asyncHandler(async (req, res) => {
  // const transactionId = req.params.transactionId;
  // console.log(transactionId);
  res.redirect(`https://book-shop-client-mauve.vercel.app/payment-success`);
});

const paymentFailController = asyncHandler(async (req, res) => {
  // const transactionId = req.params.transactionId;
  // console.log(transactionId);
  res.redirect(`https://book-shop-client-mauve.vercel.app/payment-fail`);
});
const paymentCancelController = asyncHandler(async (req, res) => {
  // const transactionId = req.params.transactionId;
  // console.log(transactionId);
  res.redirect(`https://book-shop-client-mauve.vercel.app/payment-cancel`);
});

export const PaymentControllers = {
  paymentSuccessController,
  paymentFailController,
  paymentCancelController,
};
