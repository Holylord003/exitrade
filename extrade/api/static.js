const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const { filePath } = req.query;
    
    if (!filePath) {
        return res.status(400).json({ error: 'File path is required' });
    }
    
    // Security: prevent directory traversal
    if (filePath.includes('..') || filePath.includes('~')) {
        return res.status(403).json({ error: 'Access denied' });
    }
    
    const fullPath = path.join(__dirname, '..', 'public', filePath);
    
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
        return res.status(404).json({ error: 'File not found' });
    }
    
    // Get file extension to set correct content type
    const ext = path.extname(fullPath).toLowerCase();
    const contentTypes = {
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.eot': 'application/vnd.ms-fontobject'
    };
    
    const contentType = contentTypes[ext] || 'application/octet-stream';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    const fileStream = fs.createReadStream(fullPath);
    fileStream.pipe(res);
}; 