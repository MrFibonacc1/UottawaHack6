const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const ROOT_DIR = 'html'; // Directory where your web files are located
const PORT = 3000;

http.createServer((request, response) => {
  let parsedUrl = url.parse(request.url);
  let pathname = `${ROOT_DIR}${parsedUrl.pathname}`;
  
  // Default to index.html if no file is specified
  if (pathname === `${ROOT_DIR}/`) {
    pathname = `${ROOT_DIR}/index.html`;
  }

  const ext = path.extname(pathname);
  let contentType = 'text/html'; // Default content type

  switch (ext) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'application/javascript';
      break;
    // Add more cases for other content types you expect to serve, like images
  }

  fs.exists(pathname, (exist) => {
    if(!exist) {
      // If the file is not found, return 404
      response.statusCode = 404;
      response.end(`File ${pathname} not found!`);
      return;
    }

    // If is a directory, then look for index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
    }

    // Read the file from file system
    fs.readFile(pathname, (err, data) => {
      if(err){
        response.statusCode = 500;
        response.end(`Error getting the file: ${err}.`);
      } else {
        // If the file is found, set Content-type and send data
        response.setHeader('Content-type', contentType);
        response.end(data);
      }
    });
  });

}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
