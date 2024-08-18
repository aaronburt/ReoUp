import multer from 'multer';
import { load } from 'ts-dotenv';
import { Router, Request, Response } from 'express';
import { imageFilter, storage } from './multer.controller.js';

const env = load({
    MAX_FILE_SIZE: Number
});


const v1Endpoint: Router = Router();

v1Endpoint.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins, adjust as needed
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers

    // Handle preflight requests (OPTIONS method)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    next();
});


v1Endpoint.get('/status', (req: Request, res: Response) => {
    return res.sendStatus(200);
});

v1Endpoint.post('/upload', (req: Request, res: Response) => {
    const upload = multer({ storage, limits: { fileSize: env.MAX_FILE_SIZE }, fileFilter: (req, file, cb) => { imageFilter(file, cb); } }).single('file');
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err });
        } else {
            if (req.file === undefined) {
                return res.status(400).json({ success: false, message: 'No file selected!' });
            } else {
                return res.status(200).json({ success: true, message: 'File uploaded!', filePath: `/${req.file.filename}` });
            }
        }
    });
});
  
export default v1Endpoint;