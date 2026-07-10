const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// قومي بوضع بريدك وكلمة مرور التطبيق هنا فقط على جهازك
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ddnya2857@gmail.com',
        pass: 'اكتبي_كلمة_مرور_التطبيق_هنا'  
    }
});

app.post('/send-code', (req, res) => {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
        from: 'EcoTechDZ <اكتبي_إيميلك_هنا@gmail.com>',
        to: email,
        subject: 'كود التحقق الخاص بـ EcoTechDZ',
        text: `مرحباً بك في EcoTechDZ! كود التحقق الخاص بك هو: ${code}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send("خطأ في إرسال الإيميل");
        }
        res.send({ status: "success" });
    });
});

app.listen(3000, () => console.log('السيرفر يعمل على المنفذ 3000')); 
