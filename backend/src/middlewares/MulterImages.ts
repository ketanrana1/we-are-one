import multer from "multer";
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

// export default class MulterImages implements ExpressMiddlewareInterface {

//     use(request: any, response: any, next: (err?: any) => any) {
//         const PATH = './uploads/';
        
//         const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//                 cb(null, PATH);
//             },
//             filename: (req, file, cb) => {
//                 console.log(file)
//                 const fileName = file.originalname.toLowerCase().split(' ').join('-');
//                 cb(null, fileName)
//             }
//         });
        
        
//         const upload = multer({
//             storage: storage,
//             fileFilter: (req, file, cb) => {
//                 if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
//                     cb(null, true);
//                 } else {
//                     cb(null, false);
//                     return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
//                 }
//             }
//         });

//         return response.json({
//             success: upload,
//             message: 'TEST',
//         });

//     }

// }

const PATH = './uploads/';

const storage = multer.diskStorage({
destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        console.log(file)
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});


export const imgUploadOptions :any = {
	storage: storage,
	fileFilter: (req : Request, file : File, acceptFile : any) => {
		const allowedMimeTypes = [
			"image/jpeg",
			"image/png",
			"image/gif",
			"image/bmp",
			"image/tiff"
		];
        //@ts-ignore
		acceptFile(null, allowedMimeTypes.includes(file.mimetype));
	},
	limits: {
		fileSize: 1024 * 1024 * 8, // 8MB max file size
		files: 5 // max of five files at a time
	}
};

