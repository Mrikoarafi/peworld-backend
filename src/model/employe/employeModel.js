const db = require('../../config/db_hireapp')

module.exports = {
  getAllModelEmploye : () => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM employe`, (err,result) => {
        err?reject(new Error(err.message)): resolve(result)
      })
    })
  },
  getDetailEmploye : (id) => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM employe WHERE id_employe=${id}`, (err,result) => {
        err?reject(new Error(err.message)): resolve(result)
      })
    })
  },
  loginModelEmploye : (data) => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM employe WHERE email='${data.email}'`, (err,result) => {
        err?reject(new Error (err.message)) : resolve(result)
      })
    })
  },
  register: (name, email, phone_number, password) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO employe (name, email, phone_number, password, status) VALUES ('${name}', '${email}', '${phone_number}', '${password}', 0)`,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
  verification: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE employe set status = 1 WHERE email = '${email}'`, (err, result) => {
        if(err){
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  },
  UpdateRefreshToken: (token, id) => {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE employe SET refreshtoken ='${token}' WHERE id_employe = '${id}'`,
            (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
              }
        })
    })
},
  logoutModel : (id) => {
    return new Promise((resolve,reject) => {
      db.query(`UPDATE employe SET refreshtoken=null WHERE id_employe='${id}'`, (err,result) => {
        err?reject(new Error(err.message)) : resolve(result)
      })
    })
  },
  deleteModel : (id) => {
    return new Promise((resolve,reject) => {
      db.query(`DELETE FROM employe WHERE id_employe='${id}'`, (err,result) => {
        err?reject(new Error(err.message)) : resolve(result)
      })
    })
  }
}