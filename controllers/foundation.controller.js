const {
  createFoundation,
  updateFoundation,
  getFoundations,
  deleteFoundation,
  getAllFoundations,
} = require("../services/foundation.service.js");

module.exports = {
  createFoundation: (req, res) => {
    const body = req.body;
    createFoundation(body, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: error,
          success: false,
          message: "Foundation Creation failed",
        });
      }
      return res.status(200).json({
        sucess: true,
        message: "Foundation Creation Successfully",
        data: results,
      });
    });
  },
  updateFoundation: (req, res) => {
    const id = req.params.id;
    const body = req.body;
    updateFoundation(id, body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        message: "Foundation updated successfully",
        DatabaseMsg: results.message,
      });
    });
  },
  getFoundations: (req, res) => {
    getFoundations((error, results) => {
      if (error) {
        console.log(error);
        return;
      }

      return res.json({
        error: false,
        success: true,
        message: "foundation Data Fetched",
        data: results,
      });
    });
  },
  getAllFoundations: (req, res) => {
    getAllFoundations((error, results) => {
      if (error) {
        console.log(error);
        return;
      }

      return res.json({
        error: false,
        success: true,
        message: "foundation Data Fetched",
        data: results,
      });
    });
  },
  deleteFoundation: (req, res) => {
    const id = req.params.id;
    deleteFoundation(id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: false,
          message: " Foundation Record Not Found",
        });
      }
      return res.json({
        success: true,
        message: "Foundation deleted successfully",
      });
    });
  },
};
