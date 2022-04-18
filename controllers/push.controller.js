const {
  getToken,
  addNotification,
  getNotifications,
} = require("../services/push.service");

var FCM = require("fcm-node");
var serverKey =
  "AAAAJUcars0:APA91bGEw_AhAsYnLjbzxcWxF_FaxrDKbX7p4PxhO4cRZ9CwLQmdGFhPr4mwKWruFCP7J36wbPWWiAG3FnWaKR2Gb7mWOuyMuS9vCorAxlFnAontdLogcAuLmzAahHc_tffnxKj9phv9";
var fcm = new FCM(serverKey);

module.exports = {
  pushNotification: (user_id, title, body, product_id) => {
    getToken(user_id, (err, pushToken) => {
      if (err) {
        console.log(err);
      }
      let push = {
        product_id: product_id,
        user_id: user_id,
        title: title,
        push_body: body,
      };
      addNotification(push);
      console.log("push token===>", pushToken);
      let deviceToken = pushToken.token;
      var message = {
        to: deviceToken,
        notification: {
          title: title,
          body: body,
        },
        data: {
          title: title,
          body: body,
        },
      };
      fcm.send(message, function (err, response) {
        if (err) {
          console.log("Something has gone wrong!");
        } else {
          console.log("Successfully sent with response: ", response);
        }
      });
    });
  },

  getNotifications: (req, res) => {
    const user = req.decoded.result;
    getNotifications(user.id, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Get Notification Failed",
          data: {},
        });
      }
      return res.status(200).json({
        error: false,
        success: true,
        message: `Get All Notifications`,
        data: results,
      });
    });
  },
};
