import { v4 } from 'uuid';
import aws from 'aws-sdk';
import multer from "multer";

aws.config.update({
  accessKeyId: process.env.AWS_S3_KEY_ID,
  secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
});

const uploadFile = (directory = 'uploads') => ({
  storage: multer({
    s3: new aws.S3(),
    bucket: process.env.AWS_S3_BUCKET_NAME || 'candycoin-static',
    contentType(req: any, file: any, cb: any) {
      cb(null, file.mimetype);
    },
    key(req: any, file: any, cb: any) {
      const ext = file.originalname.split('.').pop();
      cb(null, `${directory}/${v4()}.${ext}`);
    },
  }),
});

export default uploadFile;