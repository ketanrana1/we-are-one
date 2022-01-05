import path from 'path';
import sendgrid from '@sendgrid/mail';
import dayjs from 'dayjs';
import ejs from 'ejs';


const sendEmail = async (message: {
  to: string;
  cc?: string;
  subject: string;
  html: any;
}) => {
 
    //@ts-ignore
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  return sendgrid.send({
    to: message.to,
    cc: message.cc,
    from: 'naveen.kumar@geeky.dev',
    subject: message.subject,
    html: message.html,
  }).then(() => {
      console.log("mail sent", message.to)
  }, (error) => {
      console.log("mail not send", error)
    if (error.response) {
      console.error(error.response.body);
    }
  });
};

const getTemplate = async (templateLocation: string, data: any = {}) => ejs.renderFile(path.join(__dirname, '..', 'views', templateLocation), { ...data, dayjs, reactAppUrl: process.env.REACT_APP_URL });

export {
  sendEmail,
  getTemplate,
};
