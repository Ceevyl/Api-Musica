const express = require('express');
const MusicController = require('../controllers/MusicController');

const router = express.Router();
const musicController = new MusicController();

router.get('/search', (req, res) => musicController.search(req, res));
router.get('/stream', (req, res) => musicController.stream(req, res));

module.exports = router;