const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');
const app = express();
const { getMaxListeners } = require('process');
const { config } = require('./../config/config');
// Mira esta clase de PLATZI para asi implementar mejor nodemailer y poder enviar los correos 
// https://platzi.com/clases/2489-passport/41841-como-enviar-emails-con-nodejs/

const port = process.env.PORT || 3000;

/*
if (typeof window === 'object') {
    // Check if document is finally loaded
       document.addEventListener("DOMContentLoaded", function () {
            var correo = window.document.getElementById("correo");
            alert('Finished loading')
         });
      }
*/

app.post("/send-email", (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true, // upgrade later with STARTTLS
        port: 465,
        auth: {
            user: config.smtpEmail,
            pass: config.smtpPassword
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
    });
    var mailOptions = {
        from: config.smtpEmail,
        //correo
        // to:`${correo}`,
        to:"heinnervega20@gmail.com",
        subject: 'Correo de prueba de Mood-Order',
        text: '!Hola, soy Mood Order!',
        html: '<body>!Hola, soy Mood Order!</body>',
    }
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });
    /* However, note that this call only tests connection and authentication, but does not check whether the service allows you to use a specific sender address or not. */

    transporter.sendMail(mailOptions, (error,info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado.");
            res.status(200).jsonp(req.body);
        }
    });
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Servidor en -> http://localhost:${port}`)
});