// test



// download resource at URL to local path

// > node fetcher.js http://www.example.edu/ ./index.html Downloaded and saved 3261 bytes to ./index.html

// use request to make the HTTP request

// use Node's fs system to write the file
 

const request = require('request');
const fs = require('fs');

const [URL, filePath] = process.argv.slice(2);

// Edge Case 1: File Already Exists
// Check if the file already exists
if (fs.existsSync(filePath)) {
  console.error('Error: File already exists. Please provide a different file path.');
} else {
  // Make an HTTP request to the provided URL
  request(URL, function (error, response, body) {
    if (error) {
      console.error('Request failed:', error);
    } else if (response.statusCode !== 200) {
      // Edge Case 3: Invalid URL
      console.error('Request failed with status code:', response.statusCode);
    } else {
      // Write the response body to the specified file path
      fs.writeFile(filePath, body, 'utf8', function (err) {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          // Get the file size of the saved file
          fs.stat(filePath, function (statErr, stats) {
            if (statErr) {
              console.error('Error getting file size:', statErr);
            } else {
              const fileSize = stats.size;
              console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}.`);

              // Read the saved file and log its content
              fs.readFile(filePath, 'utf8', function (readErr, data) {
                if (readErr) {
                  // Edge Case 2: Invalid File Path
                  console.error('Error reading file:', readErr);
                } else {
                  console.log('Saved file content:');
                  console.log(data);
                }
              });
            }
          });
        }
      });
    }
  });
}
