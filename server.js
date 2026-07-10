const express = require('express');
const app = express();

// إعداد المنفذ ليعمل على Render بشكل صحيح
const port = process.env.PORT || 3000;

// تعريف المسار الأساسي (الجذر)
app.get('/', (req, res) => {
  res.send('تم تشغيل موقع EcoTechDZ بنجاح!');
});

// إعداد السيرفر للاستماع
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 
