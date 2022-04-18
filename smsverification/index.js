require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const client = require("twilio")(accountSid, authToken);

module.exports = {
  sendMsg: (phone, callback) => {
    client.verify
      .services("VA0c86d4b072690d1b7580d89e95a12bd8")
      .verifications.create({ to: phone, channel: "sms" })
      .then((verification) => {
        console.log(verification);
        callback(verification.status);
      })
      .catch((err) => {
        console.log(err);
        callback(400);
      });
  },

  verifyPhone: (phone, otp, callback) => {
    client.verify
      .services("VA0c86d4b072690d1b7580d89e95a12bd8")
      .verificationChecks.create({ to: phone, code: otp })
      .then((verification_check) => {
        console.log(verification_check);
        callback(null, verification_check.status);
      })
      .catch((err) => {
        console.log(err);
        callback(true);
      });
  },
  phoneLookup: (phone, callback) => {
    client.lookups.v1
      .phoneNumbers(phone)
      .fetch({ countryCode: "IN" })
      .then((phone_number) => {
        if (phone_number) {
          callback(phone_number);
        } else {
          callback(false);
        }
      })
      .catch((err) => {
        console.log(err);
        callback(false);
      });
  },
  sendOTP: (phone, otp, callback) => {
    client.messages
      .create({
        body: `Your JustFriend Verification Code is: ${otp}`,
        from: twilioPhone,
        to: phone,
      })
      .then((verification) => {
        console.log(verification);
        callback(verification.status);
      })
      .catch((err) => {
        console.log(err);
        callback(err.status);
      });
  },
};
