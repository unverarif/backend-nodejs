import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// MySQL bağlantısı yap
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '132465798a',
  database: 'test'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL bağlantısı yapıldı!');
});


// Express.js uygulaması oluştur
const app = express();
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname + '/public')))

// POST yöntemi ile verileri MySQL veritabanına ekle
app.post('/iletisim', (req, res) => {
  const { email, konu, mesaj } = req.body;
  const sql = `INSERT INTO contacts (email, konu, mesaj) VALUES ('${email}', '${konu}', '${mesaj}')`;

  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(`${result.affectedRows} satır eklendi!`);
    res.send('Form başarıyla gönderildi!');
  });
});

app.get('/', (re, res) => {
    return res.json("backend");
})

// Sunucu çalıştır
const port = 3001;
app.listen(port, () => console.log(`Sunucu http://localhost:${port} adresinde çalışıyor!`));
