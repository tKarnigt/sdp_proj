import multer from "multer";
import path from 'path';

const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file,cb){
            cb(null, 'uploads/');
        },
        filename: function(req, file, cb){
            cb(null,file.fieldname + '_' +  new Date().valueOf() + path.extname(file.originalname))
        }
    })
})

export default upload;