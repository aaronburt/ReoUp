import crypto from 'crypto';
import multer from 'multer';
import path from 'path';

export const storage: multer.StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), 'uploads'));
    },
    filename: (req, file, cb) => {
        const { name, ext } = path.parse(file.originalname);


        cb(null, `${name}_${Date.now()}${ext}`);
    }
});

export const imageFilter = function imageFilter(file: Express.Multer.File, cb: any) {
    const filetypes = /jpeg|jpg|png|gif|webp|avif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
