const axios = require("axios");
var FormData = require("form-data");

const {
  addPaymentDetails,
  getPayments,
} = require("../services/payment.service.js");
const { updateProduct } = require("../services/product.service.js");
module.exports = {
  paymentRes: (req, res) => {
    const body = req.body;
    const form = new FormData();
    form.append("P_MID", "INIpayTest");
    form.append("P_OID", body.order_id);
    form.append("P_GOODS", body.product_name);
    form.append("P_UNAME", body.customer_name);
    form.append("P_AMT", body.amount);

    form.append("P_RESERVED", "twotrs_isp=Y&block_isp=Y&twotrs_isp_noti=N");
    form.append("P_NOTI_URL", "justfriend.appdeft.biz");
    form.append("P_HPP_METHOD", 1);
    form.append("P_INI_PAYMENT", "CARD");

    axios
      .post("https://mobile.inicis.com/smart/payment/", form, {
        headers: form.getHeaders(),
      })
      .then((resData) => {
        console.log(`statusCode: ${resData.status}`);
        console.log(resData.data);
        return res.status(200).json({
          error: false,
          success: true,
          message: "Html",
          data: resData.data,
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(200).json({
          error: true,
          success: false,
          message: "Html",
          data: error,
        });
      });
  },
  addPaymentDetails: (req, res) => {
    const body = req.body;
    const user = req.decoded.result;
    addPaymentDetails(user.id, body, (err, result) => {
      if (err) {
        console.log(err);
      }
      updateProduct(
        { id: body.product_id, isSold: 1, soldTo: user.id },
        (error, results) => {
          if (error) {
            console.log(error);
          }
          return res.json({
            error: false,
            success: true,
            message: "주문 확인",
            data: results,
          });
        }
      );
    });
  },
  getPayments: (req, res) => {
    const body = req.body;
    const user = req.decoded.result;
    getPayments((err, result) => {
      if (err) {
        console.log(err);
      }
      return res.json({
        error: false,
        success: true,
        message: "Get all payments",
        data: result,
      });
    });
  },
};
