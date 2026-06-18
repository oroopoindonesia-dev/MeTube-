const NodeMediaServer = require('node-media-server');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Konfigurasi server video RTMP untuk menerima siaran dari OBS Studio
const config = {
  rtmp: {
    port: 1935, 
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000, 
    allow_origin: '*'
  }
};

const nms = new NodeMediaServer(config);
nms.run(); 

// API untuk memberikan alamat stream ke aplikasi frontend (React)
app.get('/api/live', (req, res) => {
    res.json({
        streamUrl: "http://localhost:8000/live/streamkeyku.flv",
        status: "ONLINE"
    });
});

app.listen(5000, () => {
    console.log("API Server pendukung aktif di http://localhost:5000");
});
