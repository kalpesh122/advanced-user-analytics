import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY: string = process.env.SENDGRID_API_KEY || '';
const FROM_EMAIL: string = process.env.FROM_EMAIL || '';
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (
  email: string,
  subject: string,
  message: string
): Promise<void> => {
  const msg = {
    to: email,
    from: {
      name: 'THE BACKEND ENGINEER',
      email: FROM_EMAIL,
    }, // Use the email address or domain you verified above
    subject: subject,
    text: message,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  try {
    const response = await sgMail.send(msg);
    console.log(response, 'FinalDebug');
  } catch (error: any) {
    console.error(error);
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export default sendEmail;
