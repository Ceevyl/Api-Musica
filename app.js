const express = require('express');
const cors = require('cors');
const apiRoutes = require('./api/routes/api');

const app = express();
app.use(cors());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API ouvindo na porta ${PORT}`);
});