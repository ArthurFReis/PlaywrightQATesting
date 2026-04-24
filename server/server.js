const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const APP_DIR = path.join(__dirname, '../app');

// MIME types mapping
const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Log request
    console.log(`${req.method} ${req.url}`);
    
    // Parse URL
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Remove query string if present
    const queryIndex = filePath.indexOf('?');
    if (queryIndex !== -1) {
        filePath = filePath.substring(0, queryIndex);
    }
    
    // Build full file path
    const fullPath = path.join(APP_DIR, filePath);
    
    // Get file extension
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Read and serve file
    fs.readFile(fullPath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`, 'utf-8');
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Serving files from: ${APP_DIR}`);
    console.log('Press Ctrl+C to stop the server');
});

// Made with Bob
