const pool = require("../config/database");

module.exports = {
  createAddress: (data, callBack) => {
    data.selected = Date.now();
    var names = Object.keys(data);
    pool.query(
      `insert into user_address(${names}) values(?)`,
      [Object.values(data)],

      (error, results, fields) => {
        if (error) {
          console.log(data);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAllAddresss: (user_id, callBack) => {
    pool.query(
      `SELECT * FROM user_address where userId=${user_id} && isDeleted=0 ORDER BY selected DESC `,
      [],
      (error, results, field) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getOneAddress: (user_id, id, callBack) => {
    pool.query(
      `SELECT * FROM user_address where id=${id} && userId=${user_id}`,
      [],
      (error, results, field) => {
        if (error) {
          console.log(error);
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  updateAddressInfo: (user_id, Address_id, data, callBack) => {
    data.selected = Date.now();
    var names = Object.keys(data);
    pool.query(
      `UPDATE user_address SET ? where id=${Address_id} && userId=${user_id}`,
      [data],

      (error, results, fields) => {
        if (error) {
          console.log(data);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  selectAddresss: (user_id, Address_id, callBack) => {
    pool.query(
      `UPDATE user_address SET selected=${Date.now()} where id=${Address_id} && userId=${user_id}`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  disableAddress: (user_id, Address_id, callBack) => {
    pool.query(
      `UPDATE user_address SET isDeleted=1 where id = ? && userId=?`,
      [Address_id, user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  },
  enableAddress: (user_id, Address_id, callBack) => {
    pool.query(
      `UPDATE user_address SET isDeleted=0 where id = ? && userId=?`,
      [Address_id, user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  },
};
