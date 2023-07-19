import multer from 'multer';
import uniqid from 'uniqid';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'storage')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + uniqid() + path.extname(file.originalname))
    }
});

// const upload = multer({ storage: storage }); 

// module.exports = upload;
const upload = multer({storage:storage});

export default upload;