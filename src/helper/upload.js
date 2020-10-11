const multer = require("multer");
const path = require("path");
const fs = require("fs");
// import uuid from "uuid/v4";

const storageMultiple = multer.diskStorage({
  destination: function (req, file, cb) {
    var dir = "public/images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadMultiple = multer({
  storage: storageMultiple,
  // limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("image", 12);

// Set storage engine
const storage = multer.diskStorage({
  destination: "public/images",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadsingle = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

// // Check file Type
function checkFileType(file, cb) {
  // Allowed ext
  const fileTypes = /jpeg|jpnpg|g|gif/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only !!!");
  }
}

module.exports = { uploadMultiple, uploadsingle };
// const multer = require('multer');
// const {failed} = require('../helper/response')
// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'src/img')
//     },
//     filename: (req, file, callback) => {
//       const exstensi = file.originalname.split('.')
//         callback(null, `${file.originalname}-${Date.now()}.${exstensi[1]}`);
//     }
// });

// const upload = multer({
//     storage,
//     // Max 2 mb
//     limits:{fileSize:2000000},
//     fileFilter(req,file,callback) {
//         if (file.originalname.match(/\.(JPG|jpg|JPEG|jpeg|png|PNG)\b/)) {
//             callback(null,true)
//         }else{
//             callback('File must be of type jpeg,jpg or png', null)
//         }
//     }
// });

// module.exports = upload;
