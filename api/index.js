// Vercel Serverless Function wrapper for Express app
import('../dist/index.cjs').then(({ default: app }) => {
  module.exports = app;
}).catch(err => {
  console.error('Failed to load Express app:', err);
  module.exports = (req, res) => {
    res.status(500).json({ error: 'Server initialization failed' });
  };
});
