import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, path.join(process.cwd(), "uploads", "resumes"));
        console.log(path.join(process.cwd(), "uploads", "resumes"));
        
    },
    filename:(req, file, cb)=> {
        cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"));
    }
});

const uploadResume = multer({
    storage
});

export default uploadResume;