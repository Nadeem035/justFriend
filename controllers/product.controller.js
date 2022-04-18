const {
  createProduct,
  updateProduct,
  getProducts,
  getProductsByCatId,
  getProductById,
  getSortProducts,
  deleteProduct,
  getSearchProducts,
  getRecentProducts,
  addSearchArray,
  getSearchArray,
  getFilterProducts,
  addToFavourite,
  deleteFromFavourite,
  getFavProducts,
  getMyPostProduct,
  getMySoldProduct,
  getUserPostProduct,
  addFeatured,
  getFeatured,
  addPaymentDetails,
  markProductSold,
  mySoldProducts,
  getProductReviews,
  getMyReviewOnProduct,
  getProductRating,
} = require("../services/product.service.js");
var cron = require("node-cron");
const { pushNotification } = require("../controllers/push.controller");

module.exports = {
  createProduct: (req, res) => {
    const user = req.decoded.result;
    console.log(req.body);
    var msg = "image added";
    if (req.files.length == 0) {
      req.body.img = "";
      var msg = "no img added";
      var imgs = [""];
    } else {
      var a = [];
      a = req.files;
      var imgs = [];
      a.map((items, index) => {
        imgs.push(items.path);
      });
      req.body.img = req.files[0].path;
      req.body.imgs = JSON.stringify(imgs);
    }
    if (!req.body.is_charity) {
      req.body.charity_amt = 0;
      req.body.foundation_id = 0;
      req.body.foundation_name = 0;
    }
    const body = req.body;

    if (Object.keys(body).length === 0) {
      return res.json({
        error: true,
        success: false,
        message: "No Data Found",
        data: {},
      });
    }

    createProduct(body, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Product Creation failed",
          data: {},
        });
      }
      pushNotification(
        user.id,
        body.name,
        "Your ad is now published",
        results.insertId
      );
      return res.status(200).json({
        error: false,
        success: true,
        message: `Product created successfully ${msg} `,
        data: { product_id: results.insertId },
      });
    });
  },
  updateProduct: (req, res) => {
    const body = req.body;
    updateProduct(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Item updated successfully",
        data: results,
      });
    });
  },
  getProducts: (req, res) => {
    const user = req.decoded.result;
    getProducts(user.id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product Found",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Get Products",
        data: results,
      });
    });
  },

  getProductsByCatId: (req, res) => {
    const cat_id = req.params.cat_id;
    const user = req.decoded.result;
    getProductsByCatId(user.id, cat_id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product in Selected Category",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Get Products from Category success",
        data: results,
      });
    });
  },
  getFavProducts: (req, res) => {
    const user = req.decoded.result;
    getFavProducts(user.id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product in Favourite List",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Get Products from favourite List",
        data: results,
      });
    });
  },

  getSortProducts: (req, res) => {
    const body = req.body;
    const user = req.decoded.result;
    getSortProducts(user.id, body, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Category id Not Provided",
          data: {},
        });
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product in Selected Category",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Get Products success",
        data: results,
      });
    });
  },
  getFilterProducts: (req, res) => {
    const body = req.body;
    const user = req.decoded.result;
    getFilterProducts(user.id, body, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Category id Not Provided",
          data: {},
        });
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product in Selected Category",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Get Filtered Products success",
        data: results,
      });
    });
  },

  getSearchProducts: (req, res) => {
    const body = req.body;
    const user = req.decoded.result;
    if (body.keyword.length > 3) {
      addSearchArray(user.id, body);
    }

    getSearchProducts(user.id, body, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product For Searched Keyword",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Search Products Successfully",
        data: results,
      });
    });
  },

  getProductById: (req, res) => {
    const product_id = req.params.id;
    const user = req.decoded.result;
    getProductById(user.id, product_id, (err, result) => {
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
  deleteProduct: (req, res) => {
    const product_id = req.params.productId;
    deleteProduct(product_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          error: true,
          success: false,
          message: "Product Record Not Found",
          data: {},
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Product deleted successfully",
        data: results,
      });
    });
  },

  addToFavourite: (req, res) => {
    const user = req.decoded.result;
    const product_id = req.params.product_id;
    addToFavourite(product_id, user, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
        });
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product added to favourite",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Product Added To Favourite List",
        data: results,
      });
    });
  },
  deleteFromFavourite: (req, res) => {
    // console.log(req);
    const user = req.decoded.result;
    const product_id = req.params.product_id;
    deleteFromFavourite(product_id, user, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
        });
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product deleted from favourite",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Product Removed From Favourite List",
        data: results,
      });
    });
  },

  getMyPostProduct: (req, res) => {
    const user = req.decoded.result;
    console.log(user.id);
    getMyPostProduct(user.id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product in Selected Category",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Get Products from Category success",
        data: results,
      });
    });
  },
  getMySoldProduct: (req, res) => {
    const user = req.decoded.result;
    console.log(user.id);
    getMySoldProduct(user.id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product in Sold",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Get Sold Products ",
        data: results,
      });
    });
  },
  getUserPostProduct: (req, res) => {
    const user_id = req.params.user_id;
    const user = req.decoded.result;
    console.log(user_id);
    getUserPostProduct(user_id, user.id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Product in Selected Category",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Get Products from Category success",
        data: results,
      });
    });
  },

  addFeatured: (req, res) => {
    const body = req.body;
    const user = req.decoded.result;
    addPaymentDetails(user.id, body, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result) {
        addFeatured(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          pushNotification(
            user.id,
            "Ad Featured",
            "Now Your Ad will reach more customers",
            body.product_id
          );
          return res.json({
            error: false,
            success: true,
            message: "Item added to featured list",
            data: results,
          });
        });
      }
    });
  },

  getFeatured: (req, res) => {
    const body = req.body;
    const user = req.decoded.result;
    var keywords;

    var recents = [];
    getSearchArray(user.id, (error, keyword) => {
      if (error) {
        console.log(error);
      }
      keywords = keyword;
      if (keywords) {
        getRecentProducts(user.id, keywords, (error, result) => {
          if (error) {
            console.log(error);
          }
          recents = result;
          getFeatured(user.id, body, (error, results) => {
            if (error) {
              console.log(error);
              return res.json({
                error: error,
                success: false,
                message: "No Products Found",
                data: {},
              });
            }
            if (results.length == 0) {
              return res.json({
                error: false,
                success: true,
                message: "No Product in Featured",
                data: results.concat(recents),
              });
            }
            return res.json({
              error: false,
              success: true,
              message: "Get Featured Products success",
              data: results.concat(recents),
            });
          });
        });
      }
    });
  },

  markProductSold: (req, res) => {
    const product_id = req.params.product_id;
    const user = req.decoded.result;
    console.log(product_id, user.id);
    markProductSold(user.id, product_id, (error, result) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Product Mark as Sold Successfully",
        data: result,
      });
    });
  },

  mySoldProducts: (req, res) => {
    const user = req.decoded.result;

    mySoldProducts(user.id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      if (results.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Sold Product ",
          data: results,
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Get Sold Products",
        data: results,
      });
    });
  },
};
