import { Request,Response,NextFunction } from "express";
import multer from 'multer';
import express from 'express';
// import upload from "../helpers/uploader";
import flash from 'express-flash';
const upload = multer(); 
const router = express.Router();
import util from 'util';
import { request } from "http";
// const auth = require("../middleware/auth");


router.post('/',  (req: Request, res: Response, next: NextFunction) => {
    return res.render('index', { message: req.flash() });
});

router.post('/upload-single', upload.single('file'), (req: Request, res: Response) => {
    if (req.file) {
        return res.send({ status: 'true', message: 'File Uploaded.', data: req.file });
    }
});



router.post('/upload-multiple', upload.array('files', 5), (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.files && req.files.length) { // Check if req.files exists before accessing its length
            return res.status(200).json({ status: 'true', message: 'File Uploaded.', data: req.files });
        }
    } catch (err) {
       return res.status(409).json({ status: 'false', message: 'Something went wrong', error: err });
   }
});



/*
router.post('/upload-single-v2', auth, (req, res, next) => {
//exports.uploadSingleV2 = async (req, res) => {
    const uploadFile = util.promisify(upload.single('file'));
    try {
         uploadFile(req, res);
        //console.log(req.file)
        return res.send({ status:'success',data: req.file,message: 'File Uploaded.'});    
        req.flash('success', 'File Uploaded.');
    } catch (error) {
        console.log(error)
    }
    return res.redirect('/');
});
*/

// module.exports = router;
export default router;