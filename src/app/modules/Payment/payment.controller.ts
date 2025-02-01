import { asyncHandler } from "../../utils/global/asyncHandler";


const paymentSuccessController = asyncHandler(async (req, res) => {
    // const transactionId = req.params.transactionId;
    // console.log(transactionId);
    res.redirect(
        `http://localhost:5173/payment-success`
    );
});

const paymentFailController = asyncHandler(async (req, res) => {
    // const transactionId = req.params.transactionId;
    // console.log(transactionId);
    res.redirect(
        `http://localhost:5173/payment-fail`
    );
});
const paymentCancelController = asyncHandler(async (req, res) => {
    // const transactionId = req.params.transactionId;
    // console.log(transactionId);
    res.redirect(
        `http://localhost:5173/payment-cancel`
    );
});


export const PaymentControllers = {
    paymentSuccessController,
    paymentFailController,
    paymentCancelController,
}

