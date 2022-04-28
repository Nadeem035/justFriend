const {
  createUser,
  getUser,
  getUserLogin,
  createSocialUser,
  checkEmail,
  updateUserWithEmail,
  userDataWithEmail,
  changePassword,
  updateUser,
  reportUser,
  getAllUsers,
  checkFacebook,
  userDataWithFacebook,
  updateUserWithFacebook,
  checkEmailExist,
  checkMobileExist,
  blockUser,
  unBlockUser,
  blockUserList,
  getMyReviewOnUser,
  getUserReviews,
  getUserRating,
} = require("../services/user.service");
const { sendMail } = require("../auth/sendMail");
const {
  resetPasswordEmail,
  verifyUserProfile,
  EditUserProfile,
} = require("../webView");
const {
  sendMsg,
  sendOTP,
  phoneLookup,
  verifyPhone,
} = require("../smsverification");

const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { resolveHostname } = require("nodemailer/lib/shared");

module.exports = {
  signup: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    checkEmail(body.email, (error, isEmail, result) => {
      console.log(result);
      if (isEmail && result.isActive === 1) {
        sendMail(
          body.email,
          "New SignUp Alert",
          "Someone is Trying to Signup with your Email"
        );
        return res.status(200).json({
          error: true,
          success: false,
          message: "email Already Registerd",
          data: {},
        });
      } else if (isEmail) {
        updateUser(result.id, body, (err, results) => {
          if (err) {
            console.log(err);
          }
          const jsontoken = sign({ result: result.id }, process.env.JWT_KEY, {
            expiresIn: "10m",
          });
          const link = `http://${req.headers.host}/api/user/verify/${jsontoken}`;
          const msg = `Please Follow the Link to Verify Your Email <a class="btn btn-success" href="${link}">Click Here</a> `;
          sendMail(body.email, "Email Verification", msg);
          return res.status(200).json({
            error: false,
            success: true,
            message: "inActive Account. Please Verify Your Email.",
            data: results,
          });
        });
      } else {
        createUser(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(200).json({
              error: true,
              success: false,
              message: "Database connection error",
              data: {},
              // report: err,
            });
          }
          const jsontoken = sign(
            { result: results.insertId },
            process.env.JWT_KEY,
            {
              expiresIn: "10m",
            }
          );
          console.log("OK");
          return;
          // const link = `http://${req.headers.host}/api/user/verify/${jsontoken}`;
          // const msg = `Please Follow the Link to Verify Your Email <a class="btn btn-success" href="${link}">Click Here</a> `;
          // sendMail(body.email, "Email Verification", msg);
          return res.status(200).json({
            error: false,
            success: true,
            message: "User Created Successfully.Please Verify Your Email.",
            data: results,
          });
        });
      }
    });
  },

  socialSignin: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    if (body.platform === "Facebook") {
      checkFacebook(body.facebook, (error, result, user_id) => {
        if (result) {
          updateUserWithFacebook(user_id, body, (error, result) => {
            if (error) {
              console.log(error);
            } else {
              userDataWithFacebook(body.facebook, (error, result) => {
                if (error) {
                  console.log(err);
                  return res.status(200).json({
                    error: true,
                    success: false,
                    message: "Database connection error",
                    data: {},
                  });
                }
                if (result) {
                  result.password = undefined;
                  const jsontoken = sign(
                    { result: result },
                    process.env.JWT_KEY,
                    {
                      expiresIn: "30d",
                    }
                  );
                  return res.status(200).json({
                    error: false,
                    success: true,
                    message: "WelCome Back",
                    data: result,
                    token: jsontoken,
                  });
                }
              });
            }
          });
        } else {
          createSocialUser(body, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(200).json({
                error: true,
                success: false,
                message: "Database connection error",
                data: {},
              });
            }
            console.log(results);
            getUser(results.insertId, (error, result) => {
              if (error) {
                console.log(err);
                return res.status(200).json({
                  error: true,
                  success: false,
                  message: "Database connection error",
                  data: {},
                });
              }
              if (result) {
                result.password = undefined;
                const jsontoken = sign(
                  { result: result },
                  process.env.JWT_KEY,
                  {
                    expiresIn: "30d",
                  }
                );
                return res.status(200).json({
                  error: false,
                  success: true,
                  message: "Social Signed in Successfully",
                  data: result,
                  token: jsontoken,
                });
              }
            });
          });
        }
      });
    } else {
      checkEmail(body.email, (error, result, user) => {
        if (result) {
          updateUserWithEmail(user.id, body, (error, result) => {
            if (error) {
              console.log(error);
            } else {
              userDataWithEmail(body.email, (error, result) => {
                if (error) {
                  console.log(err);
                  return res.status(200).json({
                    error: true,
                    success: false,
                    message: "Database connection error",
                    data: {},
                  });
                }
                if (result) {
                  result.password = undefined;
                  const jsontoken = sign(
                    { result: result },
                    process.env.JWT_KEY,
                    {
                      expiresIn: "30d",
                    }
                  );
                  return res.status(200).json({
                    error: false,
                    success: true,
                    message: "WelCome Back",
                    data: result,
                    token: jsontoken,
                  });
                }
              });
            }
          });
        } else {
          createSocialUser(body, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(200).json({
                error: true,
                success: false,
                message: "Database connection error",
                data: {},
              });
            }
            console.log(results);
            getUser(results.insertId, (error, result) => {
              if (error) {
                console.log(err);
                return res.status(200).json({
                  error: true,
                  success: false,
                  message: "Database connection error",
                  data: {},
                });
              }
              if (result) {
                result.password = undefined;
                const jsontoken = sign(
                  { result: result },
                  process.env.JWT_KEY,
                  {
                    expiresIn: "30d",
                  }
                );
                return res.status(200).json({
                  error: false,
                  success: true,
                  message: "Social Signed in Successfully",
                  data: result,
                  token: jsontoken,
                });
              }
            });
          });
        }
      });
    }
  },

  signin: (req, res) => {
    const body = req.body;
    getUserLogin(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          msg: err,
          error: true,
          success: false,
          message: "Invalid email or password",
          data: {},
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
          expiresIn: "30d",
        });
        return res.json({
          error: false,
          success: true,
          message: "login successfully",
          data: results,
          token: jsontoken,
        });
      } else {
        return res.json({
          msgw: err,
          error: true,
          success: false,
          message: "Invalid email or password",
          data: {},
        });
      }
    });
  },

  getUserInfo: (req, res) => {
    const id = req.params.id;
    const user = req.decoded.result;
    var reviews = [];
    var myReview = [];
    var rating = 0;

    getMyReviewOnUser(user.id, id, (error, results) => {
      if (error) {
        console.log(error);
      }
      console.log(results);
      myReview = results;
      getUserReviews(id, (error, results) => {
        if (error) {
          console.log(error);
        }
        reviews = results;
        getUserRating(id, (error, results) => {
          if (error) {
            console.log(error);
          }
          if (results[0].rating) {
            rating = results[0].rating;
          }
          getUser(id, (error, result) => {
            if (error) {
              console.log(error);
            }
            if (!result) {
              return res.json({
                error: true,
                success: false,
                message: "No User Id Available",
                data: {},
              });
            }
            result.rating = rating;
            result.myreview = myReview;
            result.reviews = reviews;
            result.password = undefined;
            return res.json({
              error: false,
              success: true,
              message: "User Profile",
              data: result,
            });
          });
        });
      });
    });
  },

  sendLink: (req, res) => {
    const email = req.params.email;
    userDataWithEmail(email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          error: true,
          success: false,
          message: "E-mail not Registered",
          data: {},
        });
      }
      if (results) {
        results.password = undefined;
        const jsontoken = sign({ result: results.id }, process.env.JWT_KEY, {
          expiresIn: "10m",
        });
        const link = `http://${req.headers.host}/api/user/reset/${jsontoken}`;
        const msg = `Please Fllow This link to reset your Password <a class="btn btn-success" href="${link}">Click Here</a> `;
        sendMail(email, "Password Reset", msg);
        return res.json({
          error: false,
          success: true,
          message: "Please Check registerd Email for Password Reset Link",
          data: {},
        });
      } else {
        return res.json({
          error: true,
          success: false,
          message: "Invalid E-Mail",
          data: {},
        });
      }
    });
  },

  paswordResetPage: (req, res) => {
    console.log(req.params.token);
    return res.send(resetPasswordEmail(req));
  },

  changePassword: (req, res) => {
    const user = req.decoded.result;
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    changePassword(user, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Password Changed successfully",
        data: results,
      });
    });
  },

  UpdateToken: (req, res) => {
    const user = req.decoded.result;
    const body = req.body;
    updateUser(user.id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Push Token Updated successfully",
        data: results,
      });
    });
  },

  reportUser: (req, res) => {
    const user = req.decoded.result;
    const body = req.body;
    reportUser(user.id, body, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "User Reported Successfully",
        data: result,
      });
    });
  },

  updatePassword: (req, res) => {
    const user = req.decoded.result;
    const oldPassword = req.body.oldPassword;
    const body = req.body;
    getUserLogin(user.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          error: true,
          success: false,
          message: "No User Found",
          data: {},
        });
      }

      const result = compareSync(oldPassword, results.password);
      if (result) {
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        changePassword(user.id, body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          return res.json({
            error: false,
            success: true,
            message: "Password Changed successfully",
            data: {},
          });
        });
      }
      if (!result) {
        return res.json({
          error: true,
          success: false,
          message: "Current Password Not Matched",
          data: {},
        });
      }
    });
  },
  // sendOTP: (req, res) => {
  //   const mobile = req.params.mobile;
  //   sendMsg(mobile, (result) => {
  //     if (result === 400) {
  //       return res.json({
  //         error: true,
  //         success: false,
  //         message: "Failed to send OTP on your number",
  //       });
  //     }
  //     return res.json({
  //       error: false,
  //       success: true,
  //       message: "OTP has been sent to your number",
  //     });
  //   });
  // },
  sendOTP: (req, res) => {
    const mobile = req.params.mobile;
    const OTP = Math.floor(100000 + Math.random() * 900000);
    sendOTP(mobile, OTP, (result) => {
      if (result === 400) {
        return res.json({
          error: true,
          success: false,
          message: "Failed to send OTP on your number",
          data: { OTP: OTP },
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "OTP has been sent to your number",
        data: { OTP: OTP },
      });
    });
  },
  verifyOTP: (req, res) => {
    const mobile = req.params.mobile;
    const otp = req.params.otp;
    verifyPhone(mobile, otp, (error, result) => {
      if (error) {
        return res.json({
          error: true,
          success: false,
          message: "Failed to Verify OTP",
        });
      }
      if (result === "pending") {
        return res.json({
          error: true,
          success: false,
          message: `Invalid OTP, Verification ${result}`,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: `OTP Verification ${result}`,
      });
    });
  },
  updateProfile: (req, res) => {
    const user = req.decoded.result;
    const body = req.body;
    updateUser(user.id, body, (error, result) => {
      if (error) {
        console.log(error);
      }
      getUser(user.id, (err, results) => {
        if (err) {
          console.log(err);
        }
        return res.json({
          error: false,
          success: true,
          message: "Profile Data Changed Successfully",
          data: results,
        });
      });
    });
  },
  uploadProfileImg: (req, res) => {
    const user = req.decoded.result;
    if (req.files.length) {
      req.body.userImg = req.files[0].path;
    }
    const userImg = req.files[0].path;
    updateUser(user.id, req.body, (error, results) => {
      if (error) {
        console.log(error);
      }
      return res.json({
        error: false,
        success: true,
        message: "Profile Img Changed Successfully",
        data: { userImg },
      });
    });
  },
  checkMobileExist: (req, res) => {
    const mobile = req.params.mobile;
    checkMobileExist(mobile, (error, isMobile, result) => {
      if (result) {
        if (isMobile && result.isActive) {
          return res.json({
            error: true,
            success: false,
            message: "Mobile Already Exist With Active Account",
            data: {},
          });
        }
        if (isMobile) {
          return res.json({
            error: true,
            success: false,
            message: "Mobile Already Exist",
            data: {},
          });
        }
      }
      return res.json({
        error: false,
        success: true,
        message: "Valid Mobile",
        data: {},
      });
    });
  },
  checkEmailExist: (req, res) => {
    const email = req.params.email;
    checkEmailExist(email, (error, isEmail, result) => {
      if (result) {
        if (isEmail && result.isActive) {
          return res.json({
            error: true,
            success: false,
            message: "Email Already Exist With Active Account",
            data: {},
          });
        }
        if (isEmail) {
          return res.json({
            error: true,
            success: false,
            message: "Email Already Exist",
            data: {},
          });
        }
      }
      return res.json({
        error: false,
        success: true,
        message: "Valid Email",
        data: {},
      });
    });
  },

  blockUser: (req, res) => {
    const user = req.decoded.result;
    const blocked_user_id = req.params.blocked_user_id;
    blockUser(user.id, blocked_user_id, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "User Blocked Successfully",
        data: result,
      });
    });
  },
  unBlockUser: (req, res) => {
    const user = req.decoded.result;
    const blocked_user_id = req.params.blocked_user_id;
    unBlockUser(user.id, blocked_user_id, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "User UnBlocked Successfully",
        data: result,
      });
    });
  },
  blockUserList: (req, res) => {
    const user = req.decoded.result;
    blockUserList(user.id, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        return res.json({
          error: false,
          success: true,
          message: "No User Blocked",
          data: result,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Blocked User List",
        data: result,
      });
    });
  },
  sendEditEmailLink: (req, res) => {
    const user = req.decoded.result;
    console.log(user);
    const email = req.params.email;
    checkEmail(email, (err, isEmail, result) => {
      if (err) {
        console.log(err);
      }
      if (isEmail) {
        return res.json({
          error: true,
          success: false,
          message: "Email Already exist with Active account",
          data: {},
        });
      }
      const jsontoken = sign(
        { result: { id: user.id, email: email } },
        process.env.JWT_KEY,
        {
          expiresIn: "10m",
        }
      );
      const link = `http://${req.headers.host}/api/user/editemail/${jsontoken}`;
      const msg = `Please Follow the Link to Verify Add New Email <a class="btn btn-success" href="${link}">Click Here</a> `;
      sendMail(email, "Email Edit", msg);
      return res.json({
        error: false,
        success: true,
        message: "Please Check your Email and Verify Email",
        data: {},
      });
    });
  },
  EditEmailPage: (req, res) => {
    return res.send(EditUserProfile(req));
  },
  editEmailInDatabase: (req, res) => {
    const user = req.decoded.result;
    const body = req.body;
    getUser(user.id, (err, result) => {
      if (err) {
        console.log(err);
      }
      const isVerified = compareSync(body.password, result.password);
      if (isVerified) {
        checkEmail(user.email, (err, isEmail, result) => {
          if (err) {
            console.log(err);
          }
          if (isEmail && result.isActive) {
            return res.json({
              error: true,
              success: false,
              message: "Email already exist with active account",
              data: {},
            });
          }
          updateUser(user.id, { email: user.email }, (err, result) => {
            if (err) {
              console.log(err);
            }
            return res.json({
              error: false,
              success: true,
              message: "Email Changed Successfully",
              data: result,
            });
          });
        });
      } else {
        return res.json({
          error: true,
          success: false,
          message: "Wrong Password",
          data: {},
        });
      }
    });
  },
};
