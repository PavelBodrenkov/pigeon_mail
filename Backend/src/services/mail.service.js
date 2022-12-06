const nodemailer = require('nodemailer')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            // host: 'smtp.mail.ru',
            // port: 465,
            // secure: false,
            service:'Mail',
            auth: {
                user: 'pigeonmail91@mail.ru',
                pass: 'AlinaMalina1021!'
            }
        })

    }

    async sendActivationMail(to, link) {
       await this.transporter.sendMail({
            from: 'smtp.mail.ru',
            to,
            subject: 'Активация аккаунта на http://localhost:8080/',
            text: '',
            html:
                `
                <div>
                    <h1>Для активации перейдите по ссылке</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
        }, function (error, info) {
           let emailMessage
           if(error){
               emailMessage = "there was an error :-(, and it was this: " + error.message
           }else{
               emailMessage = "Message sent: " + info.response
           }
           return {
               message: "success",
               email: emailMessage
           };
       })
    }
}

module.exports = new MailService()