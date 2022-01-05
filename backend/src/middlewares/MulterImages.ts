import multer from "multer";

const PATH = './uploads/';

const storage = multer.diskStorage({
destination: (req, file, cb) => {
        cb(null, PATH);
    },
    filename: (req, file, cb) => {
        // console.log(file)
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
		fileSize: 1024 * 1024 * 8,
		files: 5 
	}
};

