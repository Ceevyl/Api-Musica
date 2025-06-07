const YouTubeSearchService = require('../services/YouTubeSearchService');
const YouTubeStreamService = require('../services/YouTubeStreamService');

class MusicController {
  constructor() {
    this.searchService = new YouTubeSearchService();
    this.streamService = new YouTubeStreamService();
  }

  async search(req, res) {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Parâmetro de busca ausente.' });

    try {
      const result = await this.searchService.searchMusic(q);
      if (!result) return res.status(404).json({ error: 'Música não encontrada.' });
      res.json(result);
    } catch (error) {
      console.error('Erro na busca:', error);
      res.status(500).json({ error: 'Erro ao buscar música.' });
    }
  }

  async stream(req, res) {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'Parâmetro de URL ausente.' });

    try {
      await this.streamService.streamAudio(url, res);
    } catch (error) {
      console.error('Erro no stream:', error);
      res.status(500).json({ error: 'Erro ao fazer streaming.' });
    }
  }
}

module.exports = MusicController;