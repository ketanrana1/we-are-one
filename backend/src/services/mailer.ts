// import path from 'path';
// import sendgrid from '@sendgrid/mail';
// import dayjs from 'dayjs';
// import ejs from 'ejs';
// import logger from 'app/services/Logger';

// const sendEmail = async (message: {
//   to: string;
//   cc?: string;
//   subject: string;
//   html: any;
// }) => {
 
//   sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

//   return sendgrid.send({
//     to: message.to,
//     cc: message.cc,
//     from: 'Candy Coin <noreply@candycoin.com>',
//     subject: message.subject,
//     html: message.html,
//   }).then(() => {
//     logger.info(`[Email Sent] to ${message.to} with Subject: ${message.subject}`);
//   }, (error) => {
//     logger.info(`[Email Failed] ${error.message}`);
//     if (error.response) {
//       console.error(error.response.body);
//     }
//   });
// };

// const getTemplate = async (templateLocation: string, data: any = {}) => ejs.renderFile(path.join(__dirname, '..', 'views', templateLocation), { ...data, dayjs, reactAppUrl: process.env.REACT_APP_URL });

// export {
//   sendEmail,
//   getTemplate,
// };
