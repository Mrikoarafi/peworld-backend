const db = require('../../config/db_hireapp')

module.exports = {
  getAllModelRecruiter : () => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM recruiter`, (err,result) => {
        err?reject(new Error(err.message)): resolve(result)
      })
    })
  },
  getDetailRecruiter : (id) => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM recruiter WHERE id_recruiter=${id}`, (err,result) => {
        err?reject(new Error(err.message)): resolve(result)
      })
    })
  },
  loginModelRecruiter : (data) => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM recruiter WHERE email_recruiter='${data.email}'`, (err,result) => {
        err?reject(new Error (err.message)) : resolve(result)
      })
    })
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
  deleteModel : (id) => {
    return new Promise((resolve,reject) => {
      db.query(`DELETE FROM recruiter WHERE id_recruiter='${id}'`, (err,result) => {
        err?reject(new Error(err.message)) : resolve(result)
      })
    })
  },
  updateStatus: (email,id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE recruiter SET status = 1 WHERE email_recruiter='${email}'`, (err, result) => {
        if (err) {
          reject(new Error(err))
        } else {
          resolve(result)
          return new Promise((resolve,reject) => {
            db.query(`INSERT INTO company (image_company,id_recruiter) VALUES('default.jpg',${id})`, (error,result) => {
              error?reject(new Error(error.message)): resolve(result)
            })
          })
        }
      })
    })
  },
  updateCompanyModel:(data, id) => {
    return new Promise((resolve,reject) => {
      db.query(`UPDATE company SET 
      sector = '${data.sector}',
      city = '${data.city}',
      description = '${data.description}',
      company_email = '${data.company_email}',
      instagram = '${data.instagram}',
      phone_number = '${data.phone_number}',
      linkedin = '${data.linkedin}',
      image_company = '${data.image_company}'
       WHERE id_company = ${id} `,
      (err,result) => {
        if (err) {
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  updateRecruiterModel:(companyName, id) => {
    return new Promise((resolve,reject) => {
      db.query(`UPDATE recruiter SET 
      company_name = '${companyName}'
      WHERE id_recruiter = ${id} `,
      (err,result) => {
        if (err) {
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  updateWallpaperModel:(data, id) => {
    console.log(data);
    return new Promise((resolve,reject) => {
      db.query(`UPDATE company SET 
      wallpaper_image = '${data.wallpaper_image}'
      WHERE id_company = ${id} `,
      (err,result) => {
        if (err) {
          reject(new Error(err))
        }else{
          resolve(result)
        }
      })
    })
  },
  getDetailCompany : (id) => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM company WHERE id_company=${id}`, (err,result) => {
        err?reject(new Error(err.message)): resolve(result)
      })
    })
  },
}