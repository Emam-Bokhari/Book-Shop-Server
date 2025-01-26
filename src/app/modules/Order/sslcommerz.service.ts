import config from "../../config"
import SSLCommerzPayment from 'sslcommerz-lts';
import { HttpError } from "../../errors/HttpError";
import axios from "axios";

const store_id = config.store_id;
const store_pass = config.store_pass;
const is_live = false; // true for live false for sandbox

const initiatePayment = async (paymentData) => {
    const sslcz = new SSLCommerzPayment(store_id, store_pass, is_live);

    try {
        const apiResponse = await sslcz.init({
            ...paymentData,
            success_url: config.success_url,
            fail_url: config.fail_url,
        });
        return apiResponse.GatewayPageURL;
    } catch (error) {
        throw new HttpError(400, "Failed to initiate payment")
    }
}

const verifyPayment = async (tran_id: string) => {
    try {
        const response = await axios.post("https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php", {
            val_id: tran_id,
            tran_id: tran_id,
            store_id: store_id,
            store_pass: store_pass,
        })

        const paymentData = response.data;

        if (paymentData.status === "VALID") {
            return "SUCCESS";
        } else {
            return "FAILURE"
        }

    } catch (err) {
        console.log(err)
    }
}

export const SSLCommerzService = {
    initiatePayment,
    verifyPayment,
}