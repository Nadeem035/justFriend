const {
  getAllUsers,
  getUserById,
  disableUser,
  enableUser,
  checkEmail,
  createUser,
  getUserLogin,
  getUserPostProduct,
  getAllProducts,
  getPayments,
  userCount,
  productCount,
  featuredProductCount,
  getProductById,
  getReportedUsers,

  soldProductCount,
  categoryCount,
  favCount,

  getReportedReviews,
  deleteReportedReviews,
} = require("../services/admin.service");
const { sendMail } = require("../auth/sendMail");

const bcrypt = require("bcrypt");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
  signup: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    checkEmail(body.email, (error, result) => {
      if (result) {
        return res.status(500).json({
          error: true,
          success: false,
          message: "email Already Exist",
          data: {},
        });
      } else {
        createUser(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: true,
              success: false,
              message: "Database connection error",
              data: {},
              // report: err,
            });
          }
          sendMail(body.email, "Please Follow the Link to Verify Your Email");
          return res.status(200).json({
            error: false,
            success: true,
            message: "Signed up Successfully",
            data: results,
          });
        });
      }
    });
  },
  signin: (req, res) => {
    const body = req.body;
    console.log(body);
    getUserLogin(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
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
      result.password = undefined;
      return res.json({
        error: false,
        success: true,
        message: "User Profile",
        data: result,
      });
    });
  },

  //..............................User Page..............................
  getAllUsers: (req, res) => {
    getAllUsers((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Users List Fetched",
        data: results,
      });
    });
  },
  getReportedUsers: (req, res) => {
    getReportedUsers((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Reported Users",
        data: results,
      });
    });
  },
  getUserById: (req, res) => {
    const id = req.params.user_id;
    getUserById(id, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        return res.json({
          success: 0,
          message: "Record Not Found",
        });
      }
      result.password = undefined;
      return res.json({
        error: false,
        success: true,
        message: "User data Fetched",
        data: result,
      });
    });
  },
  disableUser: (req, res) => {
    const user_id = req.params.user_id;
    disableUser(user_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          error: true,
          success: false,
          message: "No User Found",
          data: {},
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Users Disabled Successfully",
        data: results,
      });
    });
  },
  enableUser: (req, res) => {
    const user_id = req.params.user_id;
    enableUser(user_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          error: true,
          success: false,
          message: "No User Found",
          data: {},
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Users Enabled Successfully",
        data: results,
      });
    });
  },

  //............................................................................
  getReportedReviews: (req, res) => {
    getReportedReviews((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Reported reviews Fetched",
        data: results,
      });
    });
  },
  deleteReportedReviews: (req, res) => {
    const review_id = req.params.review_id;
    deleteReportedReviews(review_id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Reported review Deleted",
        data: results,
      });
    });
  },

  //....................................Products Page...........................
  getProductById: (req, res) => {
    const product_id = req.params.id;
    getProductById(product_id, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        return res.json({
          error: true,
          success: false,
          message: "Record Not Found",
          data: {},
        });
      }
      if (result.imgs) {
        result.imgs = JSON.parse(result.imgs);
      }
      return res.json({
        error: false,
        success: true,
        message: "Product Record found",
        data: result,
      });
    });
  },
  getAllProducts: (req, res) => {
    getAllProducts((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product in Database",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Products List Fetched",
        data: results,
      });
    });
  },
  getUserPostProduct: (req, res) => {
    const user_id = req.params.user_id;
    console.log(user_id);
    getUserPostProduct(user_id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product Posted By User",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "List of User Posted Products",
        data: results,
      });
    });
  },
  getPayments: (req, res) => {
    getPayments((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "All Payments List",
        data: results,
      });
    });
  },
  productCount: (req, res) => {
    productCount((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Total Number of Product",
        data: results,
      });
    });
  },
  soldProductCount: (req, res) => {
    soldProductCount((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Total Number of Sold Products",
        data: results,
      });
    });
  },
  featuredProductCount: (req, res) => {
    featuredProductCount((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Total Number of featured Product",
        data: results,
      });
    });
  },
  userCount: (req, res) => {
    userCount((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Total Number of Users",
        data: results,
      });
    });
  },
  categoryCount: (req, res) => {
    categoryCount((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Total Number of Categories",
        data: results,
      });
    });
  },
  favCount: (req, res) => {
    favCount((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Total Number of Favourite Products",
        data: results,
      });
    });
  },
};
