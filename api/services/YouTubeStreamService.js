const ytdl = require('ytdl-core');

class YouTubeStreamService {
  async streamAudio(url, res) {
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'URL inválida do YouTube' });
    }

    try {
      const info = await ytdl.getInfo(url);
      const format = ytdl.chooseFormat(info.formats, {
        quality: 'highestaudio',
        filter: 'audioonly'
      });

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', 'inline; filename="audio.mp3"');

      const audioStream = ytdl.downloadFromInfo(info, { format });

      // Tratar erro de stream do YouTube
      audioStream.on('error', (err) => {
        console.error('Erro no stream do YouTube:', err);
        if (!res.headersSent) {
          res.status(500).send('Erro ao transmitir o áudio');
        } else {
          res.end();
        }
      });

      audioStream.pipe(res);
    } catch (error) {
      console.error('Erro ao preparar o stream:', error);
      res.status(500).send('Erro ao processar o áudio do YouTube');
    }
  }
}

module.exports = YouTubeStreamService;