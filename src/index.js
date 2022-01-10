const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');
const { getMaxListeners } = require('process');
const app = express();


/* It is expected to load the page so that the "ID" email can be accessed */
if (typeof window === 'object') {
    // Check if document is finally loaded
       document.addEventListener("DOMContentLoaded", function () {
            var correo = window.document.getElementById("correo");
            alert('Finished loading')
         });
      }

app.post("/send-email", (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: 'orlo.price5@ethereal.email',
            pass: 'fRN5Kqrr56ak6hcRXA'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
    });
    var mailOptions = {
        from: "Mood Order",
        //correo
        to:`${h}`,
        subject: 'Enviado desde nodemailer',
        text: '!Hola, soy Mood Order!',
        html: '<body>Hello World?</body>',
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

app.listen(3000, () => {
    console.log("Servidor en -> http://localhost:3000")
});
/*

const express = require('express');
const app = express();
const path = require('path');

const nodemailer = require('nodemailer');
 



app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('Server on port 3000');
});

*/
