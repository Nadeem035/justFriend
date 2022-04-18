var FCM = require("fcm-node");
var serverKey =
  "AAAAJUcars0:APA91bGEw_AhAsYnLjbzxcWxF_FaxrDKbX7p4PxhO4cRZ9CwLQmdGFhPr4mwKWruFCP7J36wbPWWiAG3FnWaKR2Gb7mWOuyMuS9vCorAxlFnAontdLogcAuLmzAahHc_tffnxKj9phv9";
var fcm = new FCM(serverKey);

var message = {
  to: "fb-Olhfxd0EpvKml3uAQ2p:APA91bGBeQiZ7YsJKeTvCrEqkKdmFxJlktaZjP2BocgYCNfdqbgOG9igpt7pKAujTXUQ8FAp279JNyqwarvgzflglZg-2kJMGv7qPpyvpgf6B73kJq37W_cZDE8ZPaBNqqRJd6pqUWSb",
  notification: {
    title: "Your Product has beeen published ",
    body: "Kida Gaurav",
  },
  data: {
    my_key: "my value",
    my_another_key: "my another value",
  },
};
fcm.send(message, function (err, response) {
  if (err) {
    console.log("Something has gone wrong!", err);
  } else {
    console.log("Successfully sent with response: ", response);
  }
});
