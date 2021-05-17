let Smtp = require('./smtp'); 
const nodemailer = require('nodemailer');



class Notification{
    constructor(){
        this.smtpObject = new Smtp(
            {
               HOST:'smtp.gmail.com',
               PORT:465,
               USER:'aswinactive@gmail.com',
               PASS:'iamaswin'
            }
        )
        

        this.transporter = nodemailer.createTransport({
            host: this.smtpObject.smtpConfiguration.HOST,
            port: this.smtpObject.smtpConfiguration.PORT,
            secure: this.smtpObject.smtpConfiguration.PORT == 465 ? true : false,
            auth: {
              user: this.smtpObject.smtpConfiguration.USER,
              pass: this.smtpObject.smtpConfiguration.PASS
          } // true for 465, false for other ports
            
          });

    }

    async send(fromMailID,toMailID,subject,content){
         
    try {
       
        let info = await this.transporter.sendMail({
          from: fromMailID, // sender address
          to: toMailID, // list of receivers
          subject: subject, // Subject line
          html: `<b>${content}</b>`
        });
        console.log("Email sent: %s", info.messageId);
        return true
        }
        catch(error){
          console.log("Email not sent, error occured ",error)
          return false
        }
    }
    

}

module.exports = Notification;