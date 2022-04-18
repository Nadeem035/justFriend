const jwt = require("jsonwebtoken");
const { getUser } = require("../services/user.service.js");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            error: true,
            success: false,
            message: "Invalid Token...",
            data: {},
          });
        } else {
          console.log(decoded);
          getUser(decoded.result.id, (error, result) => {
            if (error) {
              console.log(error);
              return res.json({
                error: true,
                success: false,
                message: "Something went wrong",
                data: {},
              });
            }
            console.log(result);
            if (result.isDeleted) {
              return res.status(401).json({
                error: true,
                success: false,
                message: "Account Disabled",
                data: {},
              });
            } else {
              req.decoded = decoded;
              next();
            }
          });
        }
      });
    } else {
      return res.status(401).json({
        error: true,
        success: false,
        message: "Access Denied! Unauthorized User",
        data: {},
      });
    }
  },
  checkPasswordToken: (req, res, next) => {
    let token = req.get("authorization");
    // console.log(token);
    if (token) {
      // token = token.slice(7);
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            error: true,
            success: false,
            message: "Password Change Request Timeout",
            data: {},
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        error: true,
        success: false,
        message: "Access Denied! Unauthorized User",
        data: {},
      });
    }
  },
  checkVerifyEmailToken: (req, res, next) => {
    let token = req.get("authorization");
    // console.log(token);
    if (token) {
      // token = token.slice(7);
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            error: true,
            success: false,
            message: "Verify Request Timeout",
            data: {},
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        error: true,
        success: false,
        message: "Access Denied! Unauthorized User",
        data: {},
      });
    }
  },
  checkAdminToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.json({
            error: true,
            success: false,
            message: "Invalid Token Admin...",
            data: {},
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        error: true,
        success: false,
        message: "Access Denied! Unauthorized User",
        data: {},
      });
    }
  },
};
