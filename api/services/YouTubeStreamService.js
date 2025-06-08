const { spawn } = require('child_process');

class YouTubeStreamService {
  async streamAudio(url, res) {
    if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) {
      return res.status(400).json({ error: 'URL inválida do YouTube' });
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Disposition', 'inline; filename="audio.mp3"');

    const ytProcess = spawn('yt-dlp', [
      '-f', 'bestaudio',
      '-o', '-', // saída para stdout
      url
    ]);

    ytProcess.stdout.pipe(res);

    ytProcess.stderr.on('data', (data) => {
      console.error(`yt-dlp erro: ${data}`);
    });

    ytProcess.on('error', (error) => {
      console.error('Erro ao executar yt-dlp:', error);
      res.status(500).send('Erro ao processar o áudio');
    });

    ytProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`yt-dlp saiu com código ${code}`);
        res.status(500).send('Erro ao baixar áudio');
      }
    });
  }
}

module.exports = YouTubeStreamService;