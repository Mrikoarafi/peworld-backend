// Call Model
const {getAllModelEmploye} = require('../../model/pekerja/pekerjaModel')
// Call Response
const {success,failed,errorServer} = require('../../helper/response')
const {sendEmailPekerja} = require('../../helper/sendEmail')
module.exports = {
  getAllControllerEmploye: async () => {
    // try {
    //   const getEmploye = await getAllModelEmploye()
    //   sendEmailPekerja(email)
    //   success(res, getEmploye, 'Success get all data Employe')

    // } catch (error) {
      
    // }
  }
}
