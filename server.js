const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(express.static(__dirname));

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// مسار تسجيل المستخدم
app.post('/register', (req, res) => {
    const newUser = req.body;
    let users = [];
    if (fs.existsSync('users.json')) {
        const data = fs.readFileSync('users.json', 'utf8');
        users = JSON.parse(data);
    }
    users.push(newUser);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.status(200).send("تم التسجيل بنجاح");
});

// مسار جلب المستخدمين (تم تصحيحه)
app.get('/get-users', (req, res) => {
    const filePath = path.join(__dirname, 'users.json');
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
});

// إعداد البريد الإلكتروني
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password'
    }
});

let otpStorage = {};

app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStorage[email] = otp;
   
    transporter.sendMail({
        from: 'EcoTechDZ <your-email@gmail.com>',
        to: email,
        subject: 'كود التحقق الخاص بك',
        text: 'كود التحقق الخاص بك هو: ' + otp
    }, (error, info) => {
        if (error) return res.status(500).json({ message: "خطأ في الإرسال" });
        res.json({ success: true });
    });
});

app.post('/verify-otp', (req, res) => {
    const { email, code } = req.body;
    if (otpStorage[email] === code) {
        delete otpStorage[email];
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: "الكود خاطئ" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
}); 
