const {
  createCategory,
  updateCategory,
  getCategories,
  allCategories,
  getSubCategoryById,
  disableCategory,
  enableCategory,
  getCategoryBySearch,

  getSubCategoriesByCatId,
  createSubCategory,
  updateSubCategory,
  enableSubCategory,
  disableSubCategory,
} = require("../services/category.service.js");

module.exports = {
  getCategories: (req, res) => {
    getCategories((error, results) => {
      if (error) {
        console.log(error);
        return;
      }

      return res.json({
        error: false,
        success: true,
        message: "Category Data Fetched",
        data: results,
      });
    });
  },
  getSubCategoryById: (req, res) => {
    const id = req.params.id;
    getSubCategoryById(id, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        return res.json({
          error: true,
          success: false,
          message: "Sub Category Record Not Found",
          data: {},
        });
      }
      return res.json({
        success: true,
        message: "Sub Category Record Found",
        data: result,
      });
    });
  },
  getCategoryBySearch: (req, res) => {
    var body = req.body;
    getCategoryBySearch(body, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!result) {
        return res.json({
          error: true,
          success: false,
          message: "Search Not Found",
          data: {},
        });
      }
      if (result.length == 0) {
        return res.json({
          error: false,
          success: true,
          message: "No Matched Category to Show",
          data: {},
        });
      }
      return res.json({
        success: true,
        message: "Search For Category Successfull",
        data: result,
      });
    });
  },

  // Admin Operations.................Category................
  allCategories: (req, res) => {
    allCategories((error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Category Data Fetched",
        data: results,
      });
    });
  },
  createCategory: (req, res) => {
    console.log(req.files);
    req.body.img = req.files[0].path;
    const body = req.body;
    createCategory(body, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Item Category Creation failed",
        });
      }
      return res.status(200).json({
        sucess: true,
        message: "Category Creation Successfully",
        data: results,
      });
    });
  },
  updateCategory: (req, res) => {
    const id = req.params.catId;
    console.log(id);
    console.log(req.files);
    if (req.files.length) {
      req.body.img = req.files[0].path;
    }
    const body = req.body;
    updateCategory(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Item Cat updated successfully",
        DatabaseMsg: results.message,
      });
    });
  },
  enableCategory: (req, res) => {
    const Cat_id = req.params.id;
    enableCategory(Cat_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: " Category Record Not Found",
        });
      }
      return res.json({
        success: true,
        message: "Category Enabled Successfully",
      });
    });
  },
  disableCategory: (req, res) => {
    const Cat_id = req.params.id;
    disableCategory(Cat_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: " Category Record Not Found",
        });
      }
      return res.json({
        success: true,
        message: "Category Disabled Successfully",
      });
    });
  },

  // Admin Operations.................Category................
  getSubCategoriesByCatId: (req, res) => {
    const cat_id = req.params.cat_id;
    getSubCategoriesByCatId(cat_id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Sub Category Data Fetched",
        data: results,
      });
    });
  },
  createSubCategory: (req, res) => {
    const body = req.body;
    createSubCategory(body, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Sub Category Creation failed",
        });
      }
      return res.status(200).json({
        sucess: true,
        message: "Sub Category Creation Successfully",
        data: results,
      });
    });
  },
  updateSubCategory: (req, res) => {
    const sub_cat_id = req.params.id;
    const body = req.body;
    updateSubCategory(sub_cat_id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Sub Cat updated successfully",
        DatabaseMsg: results.message,
      });
    });
  },
  enableSubCategory: (req, res) => {
    const sub_cat_id = req.params.id;
    enableSubCategory(sub_cat_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: "Sub Category Record Not Found",
        });
      }
      return res.json({
        success: true,
        message: "Sub Category Enabled Successfully",
      });
    });
  },
  disableSubCategory: (req, res) => {
    const sub_cat_id = req.params.id;
    disableSubCategory(sub_cat_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: " Sub Category Record Not Found",
        });
      }
      return res.json({
        success: true,
        message: "Sub Category Disabled Successfully",
      });
    });
  },
};
