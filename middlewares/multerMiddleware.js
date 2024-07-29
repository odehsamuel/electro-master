const multer = require('multer');
const uuid = require('uuid').v4
// const currentDate = `${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()} `

const fileUpload = multer({
    storage : multer.diskStorage({
        destination : "product-data/images",
        filename : function(req, file, cb){
            // cb(null, `${currentDate}-${file.originalname}`)
            cb(null, `${uuid()}-${file.originalname}`)
        }
    })
})

const configuredmulterMiddleware = fileUpload.single("image");

module.exports = configuredmulterMiddleware;