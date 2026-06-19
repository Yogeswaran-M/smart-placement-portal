import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        const uploadPath = path.join(process.cwd(), "uploads", "resumes");
        console.log(path.join(process.cwd(), "uploads", "resumes"));

        fs.mkdirSync(uploadPath,{
            recursive:true
        });

        cb(null, uploadPath);
    },
    filename:(req, file, cb)=> {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
    }
});

const uploadResume = multer({
    storage
});

export default uploadResume;