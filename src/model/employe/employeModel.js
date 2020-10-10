const db = require('../../config/db_hireapp')

module.exports = {
  getAllModelEmploye: () => {},
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
      db.query(`UPDATE employe set status = 1, image_employe = 'default.jpg' WHERE email = '${email}'`, (err, result) => {
        if(err){
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
};