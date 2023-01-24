const pool = require("../config/database");
var moment = require("moment");
function getReportedUserProducts(user_id) {
  return new Promise((res, rej) => {
    pool.query(
      `SELECT GROUP_CONCAT(tbl_products.id) as productIds FROM tbl_products
          INNER JOIN tbl_report
          ON tbl_products.user_id=tbl_report.reported_user_id
          WHERE tbl_report.user_id=?`,
      [user_id],
      (error, results, fields) => {
        //
        if (error) {
          return rej(error);
        }
        //
        res(results);
      }
    );
  });
}

module.exports = {
  // ...........................Product Services..........................................

  createProduct: (data, callBack) => {
    var names = Object.keys(data);
    pool.query(
      `insert into tbl_products(${names}) values(?)`,
      [Object.values(data)],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateProduct: (data, callBack) => {
    pool.query(
      `UPDATE tbl_products SET ? where id=${data.id}`,
      [data],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getProducts: async (user_id, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    } 
    var q = ` SELECT tbl_products.*,IFNULL(tbl_favourite.isFavourite,0)as isFav FROM tbl_products
            LEFT JOIN tbl_favourite
            ON tbl_products.id=tbl_favourite.product_id
            && tbl_favourite.user_id=?
            where isSold="0" && isDeleted=0
            ${where}
            order by tbl_products.id DESC`;
    pool.query(q, [user_id], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getProductsByCatId: async (user_id, cat_id, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    } 
    
    var q = ` SELECT tbl_products.*,IFNULL(tbl_favourite.isFavourite,0)as isFav FROM tbl_products
            LEFT JOIN tbl_favourite
            ON tbl_products.id=tbl_favourite.product_id
            && tbl_favourite.user_id=?
            where isSold="0" && category_id=?
            ${where}
            order by tbl_products.id DESC`;
    pool.query(q, [user_id, cat_id], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getFavProducts: async (user_id, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    pool.query(
      `SELECT * FROM tbl_products 
      LEFT JOIN tbl_favourite 
      ON tbl_products.id=tbl_favourite.product_id 
      WHERE tbl_favourite.user_id=? 
      ${where}
      `,
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getSearchProducts: async (id, body, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    var q = ` SELECT tbl_products.*,IFNULL(tbl_favourite.isFavourite,0)as isFav FROM tbl_products
            LEFT JOIN tbl_favourite
            ON tbl_products.id=tbl_favourite.product_id
            && tbl_favourite.user_id=${id}
            where isSold="0" && name Like '%${body.keyword}%'
            ${where}
            order by tbl_products.id`;
    pool.query(q, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  addSearchArray: (user_id, body) => {
    pool.query(
      `INSERT INTO tbl_search(user_id, search_keyword) VALUES ('${user_id}',"${body.keyword}")`,
      [],
      (error, results, fields) => {
        if (error) {
          console.log(error);
        }
      }
    );
  },
  getSearchArray: async (user_id, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    pool.query(
      `SELECT * FROM tbl_search WHERE user_id=${user_id} ${where} order by createdDtm desc limit 5`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getRecentProducts: async (id, body, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    if (body.length != 0) {
      let keywords = "";
      for (let i = 0; i < body.length; i++) {
        keywords += `name Like '%${body[i].search_keyword}%' or `;
      }
      console.log(keywords);

      var q = ` SELECT tbl_products.*,IFNULL(tbl_favourite.isFavourite,0)as isFav ,
      IF(featuredUpto >= '${moment(Date.now()).format(
        "YYYY-MM-DD HH:mm:ss"
      )}',isFeatured,0) as isFeatured FROM tbl_products
            LEFT JOIN tbl_favourite
            ON tbl_products.id=tbl_favourite.product_id
            && tbl_favourite.user_id=${id}
            where isSold="0" AND  ${keywords} name Like '%${
        body[0].search_keyword
      }%'
            ${where}
            order by isFeatured DESC,id DESC  limit 10`;
      pool.query(q, [], (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      });
    } else {
      return callBack(null, []);
    }
  },

  getProductById: async (user_id, product_id, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    var q = `SELECT tbl_products.*,IFNULL(tbl_favourite.isFavourite,0)as isFav ,
              tbl_users.name as user_name,tbl_users.userImg,tbl_users.mobile,
              tbl_category.name as category_name
              FROM tbl_products LEFT JOIN tbl_favourite 
              ON tbl_products.id=tbl_favourite.product_id && tbl_favourite.user_id=${user_id} 
              JOIN tbl_users ON tbl_products.user_id=tbl_users.id
              JOIN tbl_category ON tbl_products.category_id=tbl_category.id
              WHERE tbl_products.isSold="0" 
              ${where}
               && tbl_products.id= ${product_id}`;
    pool.query(q, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      // console.log(results);
      return callBack(null, results[0]);
    });
  },

  deleteProduct: (product_id, callBack) => {
    pool.query(
      `UPDATE tbl_products SET isDeleted="1" where id=?`,
      [product_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results.affectedRows);
      }
    );
  },

  getSortProducts: async (user_id, body, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    var con = "id";

    if (body.sort_type == "Newest") {
      con = "createdDtm DESC";
      var q = `SELECT tbl_products.*,IFNULL(tbl_favourite.isFavourite,0)as isFav 
              FROM tbl_products LEFT JOIN tbl_favourite 
              ON tbl_products.id=tbl_favourite.product_id && tbl_favourite.user_id=${user_id} 
              WHERE tbl_products.isSold="0" && category_id=${body.category_id} ${where} ORDER BY ${con}`;
    }
    if (body.sort_type == "Price:Low to high") {
      con = "price ASC";
      var q = `SELECT tbl_products.*,IFNULL(tbl_favourite.isFavourite,0)as isFav 
              FROM tbl_products LEFT JOIN tbl_favourite 
              ON tbl_products.id=tbl_favourite.product_id && tbl_favourite.user_id=${user_id} 
              WHERE tbl_products.isSold="0" && category_id=${body.category_id} ${where} ORDER BY ${con}`;
    }
    if (body.sort_type == "Price:High to low") {
      con = "price DESC";
      var q = `SELECT tbl_products.*,IFNULL(tbl_favourite.isFavourite,0)as isFav 
              FROM tbl_products LEFT JOIN tbl_favourite 
              ON tbl_products.id=tbl_favourite.product_id && tbl_favourite.user_id=${user_id} 
              WHERE tbl_products.isSold="0" && category_id=${body.category_id} ${where} ORDER BY ${con}`;
    }
    if (body.sort_type == "Closest") {
      const cat_id = body.category_id;
      const lat = body.latitude;
      const long = body.longitude;
      var q = `SELECT tbl_products.*,
                IFNULL(tbl_favourite.isFavourite,0) AS isFav ,
                (6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos( radians(longitude)
                - radians(${long})) + sin(radians(${lat})) * sin(radians(latitude))))
                AS distance
              FROM tbl_products LEFT JOIN tbl_favourite 
              ON tbl_products.id=tbl_favourite.product_id && tbl_favourite.user_id=${user_id} 
              WHERE tbl_products.isSold="0" ${where} && tbl_products.category_id=${cat_id} 
              HAVING distance < 500   
              ORDER BY distance`;
    }
    pool.query(q, [], (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      return callBack(null, results);
    });
  },

  getFilterProducts: async (user_id, body, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    var filter = ` && tbl_products.category_id=${body.category_id}`;
    var distance = 300000;
    var lat = body.latitude;
    var long = body.longitude;

    if (body.sort_type == "Newest") {
      con = "createdDtm DESC";
    }
    if (body.sort_type == "Price:Low to high") {
      con = "price ASC";
    }
    if (body.sort_type == "Price:High to low") {
      con = "price DESC";
    }
    if (body.sort_type == "Closest") {
      con = "distance ASC";
      distance = 300000;
    }

    if (body.minPrice) {
      var min = body.minPrice;
      filter += ` && tbl_products.price >= ${min}`;
    }
    if (body.maxPrice) {
      var max = body.maxPrice;
      filter += ` && tbl_products.price <= ${max}`;
    }
    if (body.condition) {
      console.log(body.condition);
      filter += ` && tbl_products.product_condition = '${body.condition}' `;
    }
    if (body.distance) {
      distance = body.distance;
    }
    pool.query(
      `         SELECT tbl_products.*,
                IFNULL(tbl_favourite.isFavourite,0) AS isFav ,
                (6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos( radians(longitude)- radians(${long})) + sin(radians(${lat})) * sin(radians(latitude))))
                AS distance
              FROM tbl_products LEFT JOIN tbl_favourite 
              ON tbl_products.id=tbl_favourite.product_id && tbl_favourite.user_id=${user_id} 
              WHERE tbl_products.isSold="0" ${filter} ${where}
              HAVING distance < ${distance}   
              ORDER BY ${con}`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addToFavourite: (product_id, user, callBack) => {
    pool.query(
      `INSERT INTO tbl_favourite(user_id, product_id) VALUES (? ,?) `,
      [user.id, product_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteFromFavourite: (product_id, user, callBack) => {
    pool.query(
      `DELETE FROM tbl_favourite WHERE user_id=? && product_id=? `,
      [user.id, product_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getMyPostProduct: async (user_id, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    pool.query(
      `SELECT tbl_products.*,IFNULL(tbl_favourite.isFavourite,0)as isFav FROM tbl_products
            LEFT JOIN tbl_favourite
            ON tbl_products.id=tbl_favourite.product_id
            && tbl_favourite.user_id=${user_id}
            where tbl_products.isDeleted="0" && tbl_products.isSold="0" && tbl_products.user_id=?
            ${where}
            order by tbl_products.id`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getMySoldProduct: async (user_id, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    pool.query(
      `SELECT tbl_products.*,IFNULL(tbl_favourite.isFavourite,0)as isFav FROM tbl_products
            LEFT JOIN tbl_favourite
            ON tbl_products.id=tbl_favourite.product_id
            && tbl_favourite.user_id=${user_id}
            where tbl_products.isSold="1"&& tbl_products.isDeleted="0" && tbl_products.user_id=?
            ${where}
            order by tbl_products.id`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUserPostProduct: async (user_id, my_id, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    pool.query(
      `SELECT tbl_products.*,IFNULL(tbl_favourite.isFavourite,0)as isFav FROM tbl_products
            LEFT JOIN tbl_favourite
            ON tbl_products.id=tbl_favourite.product_id
            && tbl_favourite.user_id=${my_id}
            where tbl_products.isSold="0" && tbl_products.user_id=?
            ${where}
            order by tbl_products.id`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  addFeatured: (data, callBack) => {
    console.log("request===>", data);
    // data.featuredUpto = Date(data.featuredUpto);
    // data.featuredUpto = moment(data.featuredUpto).format("YYYY-MM-DD HH:mm:ss");
    // console.log(data.featuredUpto);
    var a = new Date(data.featuredUpto * 1000);
    var months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
    console.log(time);
    ("YYYY-MM-DD HH:mm:ss");
    pool.query(
      `UPDATE tbl_products SET isFeatured='${data.isFeatured}',featuredUpto='${time}' where id=${data.product_id}`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  addPaymentDetails: (user_id, body, callBack) => {
    pool.query(
      `insert into tbl_featured_payment (user_id,product_id,transaction_id,payment_status,amount)values(?,?,?,?,?)`,
      [
        user_id,
        body.product_id,
        body.transaction_id,
        body.payment_status,
        body.amount,
      ],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getFeatured: async (user_id, body, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    let filter = "&& isFeatured!=0";
    var distance = 20000;
    var lat = body.latitude;
    var long = body.longitude;
    pool.query(
      `         SELECT tbl_products.*,
                IFNULL(tbl_favourite.isFavourite,0) AS isFav ,
                (6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * cos( radians(longitude)- radians(${long})) + sin(radians(${lat})) * sin(radians(latitude))))
                AS distance
              FROM tbl_products LEFT JOIN tbl_favourite 
              ON tbl_products.id=tbl_favourite.product_id && tbl_favourite.user_id=${user_id} 
              WHERE tbl_products.isSold="0" ${filter} 
              ${where}
              && featuredUpto >= '${moment(Date.now()).format(
                "YYYY-MM-DD HH:mm:ss"
              )}'
              HAVING distance < ${distance}   
              ORDER BY isFeatured DESC,id DESC`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  markProductSold: (user_id, product_id, callBack) => {
    pool.query(
      `UPDATE tbl_products SET isSold=1 WHERE user_id=? && id=?`,
      [user_id, product_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  mySoldProducts: (user_id, callBack) => {
    pool.query(
      `SELECT * FROM tbl_products WHERE user_id=? && isSold="1"`,
      [user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getMyReviewOnProduct: async (user_id, product_id, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    pool.query(
      `SELECT tbl_product_reviews.*,tbl_users.userImg as user_img,tbl_users.name as user_name
      FROM tbl_product_reviews left join tbl_users on tbl_product_reviews.user_id=tbl_users.id
      WHERE tbl_product_reviews.product_id=? && tbl_product_reviews.user_id=? ${where} order by id desc limit 2`,
      [product_id, user_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getProductReviews: async (product_id, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    pool.query(
      `SELECT tbl_product_reviews.*,tbl_users.userImg as user_img,tbl_users.name as user_name
      FROM tbl_product_reviews left join tbl_users on tbl_product_reviews.user_id=tbl_users.id
      WHERE tbl_product_reviews.product_id=? ${where} order by id desc limit 2`,
      [product_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getProductRating: async (product_id, callBack) => {
    const response = await getReportedUserProducts(user_id);
    var where = ''; 
    if (response[0].productIds) {
      where = `&& tbl_products.id NOT IN(${response[0].productIds})`;
    }
    pool.query(
      `SELECT AVG(rating)as rating FROM tbl_product_reviews WHERE product_id=? ${where}`,
      [product_id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
