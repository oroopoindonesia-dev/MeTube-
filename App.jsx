import React, { useEffect, useRef, useState } from 'react';
import flvjs from 'flv.js';

export default function App() {
  const videoRef = useRef(null);
  const [streamUrl, setStreamUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/live')
      .then(res => res.json())
      .then(data => setStreamUrl(data.streamUrl))
      .catch(err => console.error("Koneksi gagal ke server streaming:", err));
  }, []);

  const startStreamingPlayer = () => {
    if (flvjs.isSupported() && streamUrl) {
      const videoElement = videoRef.current;
      const flvPlayer = flvjs.createPlayer({ type: 'flv', url: streamUrl });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play()
        .then(() => setIsPlaying(true))
        .catch(() => alert("Kreator belum menekan tombol Live di OBS Studio!"));
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      <nav className="bg-zinc-900 border-b border-zinc-800 p-4 sticky top-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="bg-red-600 px-2.5 py-1 rounded-lg text-sm font-black">ME</span>
          <span className="text-xl font-bold">Tube Live</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-black aspect-video rounded-2xl overflow-hidden relative border border-zinc-800 flex items-center justify-center">
            <video ref={videoRef} controls className="w-full h-full" />
            {!isPlaying && (
              <div className="absolute inset-0 bg-zinc-900/95 flex flex-col items-center justify-center text-center p-4">
                <p className="text-lg font-semibold text-zinc-400">Siaran Langsung Belum Terhubung</p>
                <button onClick={startStreamingPlayer} className="mt-4 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-600/20 transition">
                  Hubungkan & Tonton Live
                </button>
              </div>
            )}
          </div>
          <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
            <h1 className="text-xl font-bold">🔴 Live Stream Nyata (PWA Enabled)</h1>
            <p className="text-zinc-400 text-sm mt-2">Web ini bisa diinstal di HP kamu menjadi aplikasi mandiri berkat fitur PWA.</p>
          </div>
        </div>
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 flex items-center justify-center text-zinc-600 text-sm">
          Fitur Obrolan Utama Aktif.
        </div>
      </div>
    </div>
  );
}
