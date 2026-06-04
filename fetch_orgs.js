const http = require('http');

http.get('http://localhost:3000/organizations', (res) => {
  console.log('Status:', res.statusCode);
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Body length:', body.length);
    console.log('Body snippet:\n', body.substring(0, 300));
  });
}).on('error', (err) => {
  console.error('Request error:', err.message);
});