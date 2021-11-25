const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');
const { getMaxListeners } = require('process');
const app = express();

if (typeof window === 'object') {
    // Check if document is finally loaded
       document.addEventListener("DOMContentLoaded", function () {
            var correo = window.document.getElementById('correo');
            alert('Finished loading')
         });
      }


app.post("/send-email", (req, res) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'orlo.price5@ethereal.email',
            pass: 'fRN5Kqrr56ak6hcRXA'
        }
    });
    var mailOptions = {
        from: "Mood Order",
        to:"heinnervega20@gmail.com",
        subject: 'Enviado desde nodemailer',
        text: '!Hola, soy Mood Order!'
    }
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