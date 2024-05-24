import multer from 'multer';
import path from 'path'
import fs from 'fs';

const uploadDir = path.join(__dirname, './../../uploads');
const profilesDir = path.join(__dirname, './../../uploads/profile_images');

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
if (!fs.existsSync(profilesDir)) fs.mkdirSync(profilesDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './../../uploads/profile_images'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });
