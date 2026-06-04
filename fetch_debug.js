const http = require('http');

http.get('http://localhost:3000/debug/orgs', (res) => {
  console.log('Status:', res.statusCode);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Body:', body);
  });
}).on('error', (err) => {
  console.error('Request error:', err.message);
});