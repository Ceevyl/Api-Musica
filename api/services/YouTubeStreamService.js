const ytdl = require('ytdl-core');

class YouTubeStreamService {
  async streamAudio(url, res) {
    if (!ytdl.validateURL(url)) {
      throw new Error('URL inválida do YouTube');
    }

    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, {
      quality: 'highestaudio',
      filter: 'audioonly'
    });

    res.setHeader('Content-Type', 'audio/mpeg');
    ytdl(url, { format }).pipe(res);
  }
}

module.exports = YouTubeStreamService;