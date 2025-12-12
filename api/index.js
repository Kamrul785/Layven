// Vercel Serverless Function wrapper for Express app
import('../dist/index.cjs').then((module) => {
  exports.default = module.default;
}).catch(err => {
  console.error('Failed to load Express app:', err);
  exports.default = (req, res) => {
    res.status(500).json({ error: 'Server initialization failed' });
  };
});
