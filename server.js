require('dotenv').config();
const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// خدمة ملفات الواجهة الأمامية (index.html, script.js, style.css, images)
app.use(express.static(path.join(__dirname)));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // STARTTLS على المنفذ 587
  auth: {
    user: process.env.SMTP_USER || 'c47e35001@smtp-brevo.com',
    pass: process.env.SMTP_PASS
  }
});

app.post('/api/send-email', async (req, res) => {
  const { to, subject, text, html } = req.body || {};

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ ok: false, error: 'بيانات البريد غير مكتملة' });
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      html
    });

    return res.json({ ok: true, messageId: info.messageId });
  } catch (error) {
    console.error('SMTP Send Error:', error);
    return res.status(500).json({ ok: false, error: 'فشل الإرسال عبر خادم SMTP' });
  }
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`STORE X server running on http://localhost:${PORT}`);
});
