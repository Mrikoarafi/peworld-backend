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
  }
}