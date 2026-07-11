const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// إعداد لاستقبال بيانات JSON من النماذج
app.use(express.json());

// تقديم ملفات المشروع (HTML, CSS, إلخ)
app.use(express.static(__dirname));

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// مسار تسجيل المستخدم وحفظ البيانات في users.json
app.post('/register', (req, res) => {
    const newUser = req.body;
  
    // قراءة الملف الحالي أو إنشاء مصفوفة جديدة إذا لم يوجد
    let users = [];
    if (fs.existsSync('users.json')) {
        const data = fs.readFileSync('users.json');
        users = JSON.parse(data);
    }
   
    users.push(newUser);
   
    // حفظ البيانات في الملف
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
    res.status(200).send('تم التسجيل بنجاح');
});// أضيفي هذا المسار في ملف server.js ليتمكن المتصفح من قراءة البيانات
app.get('/get-users', (req, res) => {
    const fs = require('fs');
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8'));
    res.json(users);
});


// إعداد المنفذ للعمل محلياً أو على Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
