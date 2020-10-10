const db = require('../../config/db_hireapp')

module.exports = {
  getAllModelRecruiter: () => {
    
  },

  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO recruiter (name_recruiter, email_recruiter, company_name, position, phone_number, password, status) VALUES ('${data.name_recruiter}','${data.email_recruiter}','${data.company_name}','${data.position}','${data.phone_number}','${data.password}', 0)`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  },

  updateStatus: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE recruiter SET status = 1 WHERE email_recruiter='${email}'`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
        }
      })
    })
  }
}