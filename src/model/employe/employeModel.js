const db = require('../../config/db_hireapp')

module.exports = {
  getAllModelEmploye : (where,name,orderby,sort,start,end) => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT employe.id_employe,employe.name,employe.jobdesk,employe.domisili,employe.image_employe,GROUP_CONCAT(skills.name_skill) as skill_employe, (SELECT COUNT(*) FROM employe) as count FROM employe
      JOIN skills ON employe.id_employe=skills.id_employe
       WHERE ${where} LIKE'%${name}%' GROUP BY(employe.id_employe) ORDER BY ${orderby} ${sort} LIMIT ${start},${end}`, (err,result) => {
      err?reject(new Error(err.message)): resolve(result);
      })
    })
  },
  getDetailEmploye : (id) => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT  employe.id_employe,employe.name,employe.email,employe.phone_number,employe.image_employe,employe.jobdesk,employe.domisili,employe.workplace,employe.description,employe.instagram,github,linkedin,employe.created_at FROM employe WHERE id_employe=${id}`, (err,result) => {
        err?reject(new Error(err.message)): resolve(result)
      })
    })
  },
  getWorkExperience : (id) => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM work_experience WHERE id_employe=${id}`, (err,result) => {
        err?reject(new Error(err.message)): resolve(result)
      })
    })
  },
  getSkill : (id) => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM skills WHERE id_employe=${id}`, (err,result) => {
        err?reject(new Error(err.message)): resolve(result)
      })
    })
  },
  getPortfolio : (id) => {
    return new Promise((resolve,reject) => {
      db.query(`SELECT * FROM portfolio WHERE id_employe=${id}`, (err,result) => {
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
      db.query(`UPDATE employe set status = 1, image_employe = 'default.jpg' WHERE email = '${email}'`, (err, result) => {
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
  },
}