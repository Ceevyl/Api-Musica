const ytSearch = require('yt-search');

class YouTubeSearchService {
  async searchMusic(query) {
    const result = await ytSearch(query);
    const video = result.videos.length > 0 ? result.videos[0] : null;

    if (!video) return null;

    return {
      title: video.title,
      url: video.url,
      duration: video.timestamp,
      thumbnail: video.thumbnail
    };
  }
}

module.exports = YouTubeSearchService;