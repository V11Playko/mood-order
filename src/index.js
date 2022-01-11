const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');
const app = express();
const { getMaxListeners } = require('process');
const { config } = require('./../config/config');

/* En estos momentos el proyecto queda en espero ya que no encontre una forma de obtener el valor del input "correo" y al enviar el email me aparece el mensaje "No recipients defined"...  */

const port = process.env.PORT || 3000;
// Capture of the values of INPUTS
/*
Esto es para traer el id del correo, se tiene que hacer eso supuestamente porque la ventana se carga antes que el DOM, por eso tiene que esperar.


let correo;

if (typeof window === 'object') {
    // Check if document is finally loaded
       document.addEventListener("DOMContentLoaded", function () {
            correo = document.getElementById("correo").value;
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
        //to:`${correo}`,
        to: 'heinnervega20@gmail.com',
        subject: 'Correo de prueba de Mood-Order',
        text: '!Hola, soy Mood Order!',
        html: '<body>!Hola,Yes!</body>',
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