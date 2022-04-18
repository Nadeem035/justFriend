const {
  createAddress,
  getAllAddresss,
  getOneAddress,
  updateAddressInfo,
  enableAddress,
  disableAddress,
  selectAddresss,
} = require("../services/address.service");

module.exports = {
  createAddress: (req, res) => {
    const user = req.decoded.result;
    req.body.userId = user.id;
    const body = req.body;
    createAddress(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: true,
          success: false,
          message: "Database connection error",
          data: {},
        });
      }
      return res.status(200).json({
        error: false,
        success: true,
        message: "New Address Added Successfully",
        data: results,
      });
    });
  },
  getAllAddresss: (req, res) => {
    const user = req.decoded.result;
    getAllAddresss(user.id, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      return res.json({
        error: false,
        success: true,
        message: "Address List Fetched",
        data: results,
      });
    });
  },
  getOneAddress: (req, res) => {
    const Address_id = req.params.address_id;
    const user = req.decoded.result;
    getOneAddress(user.id, Address_id, (error, results) => {
      if (error) {
        console.log(error);
        return res.json({
          error: true,
          success: false,
          message: "Database Connection Error",
          data: results,
        });
      }
      if (results) {
        return res.json({
          error: false,
          success: true,
          message: "Address Info Fetched",
          data: results,
        });
      }
      return res.json({
        error: true,
        success: false,
        message: "No Address Found In Database",
        data: results,
      });
    });
  },
  updateAddressInfo: (req, res) => {
    const Address_id = req.params.address_id;
    const user = req.decoded.result;
    const body = req.body;
    updateAddressInfo(user.id, Address_id, body, (error, result) => {
      if (error) {
        console.log(error);
      }
      getOneAddress(user.id, Address_id, (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results);
        return res.json({
          error: false,
          success: true,
          message: "Address Data Changed Successfully",
          data: results,
        });
      });
    });
  },
  selectAddresss: (req, res) => {
    const Address_id = req.params.address_id;
    const user = req.decoded.result;
    selectAddresss(user.id, Address_id, (error, result) => {
      if (error) {
        console.log(error);
      }
      return res.json({
        error: false,
        success: true,
        message: "Selected Address",
        data: result,
      });
    });
  },
  disableAddress: (req, res) => {
    const Address_id = req.params.address_id;
    const user = req.decoded.result;
    disableAddress(user.id, Address_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          error: true,
          success: false,
          message: "No Address Found",
          data: {},
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Address Disabled Successfully",
        data: results,
      });
    });
  },
  enableAddress: (req, res) => {
    const Address_id = req.params.address_id;
    const user = req.decoded.result;
    enableAddress(user.id, Address_id, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          error: true,
          success: false,
          message: "No Address Found",
          data: {},
        });
      }
      return res.json({
        error: false,
        success: true,
        message: "Address Enabled Successfully",
        data: results,
      });
    });
  },
};
