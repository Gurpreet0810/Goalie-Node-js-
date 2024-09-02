import nodemailer from 'nodemailer'
import { asyncHandler } from './asyncHandler.js'



const sendEmail = asyncHandler(async (req, res) => {
    
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'gurpreetiws123@gmail.com',
                pass: 'gejotaugdxvdqykc'
            }
        });
        
        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: 'gurpreetiws123@gmail.com', // sender address
            to: "kamaljeetinsiderwebsolutions@gmail.com", // list of receivers
            subject: "Hello  gurpreet ✔", // Subject line
            text: "Hello world? gurpreet", // plain text body
            html: "<b>Hello world? gurpreet</b>", // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <mailto:d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }
        
        main().catch(console.error);
    
    
        return res.status(200)
        .json({
            message: 'sueccwss'
        })
        
        
})
    
    export default sendEmail