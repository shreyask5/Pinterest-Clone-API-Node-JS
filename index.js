const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
const morgan = require('morgan');
// Use morgan to log all requests
app.use(morgan('combined')); // Use 'combined' for detailed logs

// Serve static files from the React app's build folder
app.use(express.static(path.join(__dirname, '../clone/dist')));

// Configure AWS SDK
const s3 = new AWS.S3({
  region: 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Configure Multer for file upload
const upload = multer();

// Function to compress image to Pinterest dimensions and under 100KB
async function compressImageForPinterest(buffer) {
  const maxSizeKB = 100;
  const maxSizeBytes = maxSizeKB * 1024;
  
  let quality = 85;
  let compressedBuffer;
  
  do {
    compressedBuffer = await sharp(buffer)
      .jpeg({ 
        quality: quality,
        progressive: true,
        mozjpeg: true // Use mozjpeg encoder for better compression
      })
      .toBuffer();
    
    // If still too large, reduce quality
    if (compressedBuffer.length > maxSizeBytes && quality > 20) {
      quality -= 5;
    } else {
      break;
    }
  } while (compressedBuffer.length > maxSizeBytes && quality > 20);
  
  // If still too large even at lowest quality, try smaller dimensions
  if (compressedBuffer.length > maxSizeBytes) {
    let width = targetWidth;
    let height = targetHeight;
    
    while (compressedBuffer.length > maxSizeBytes && width > 300) {
      width = Math.floor(width * 0.9);
      height = Math.floor(height * 0.9);
      
      compressedBuffer = await sharp(buffer)
        .resize(width, height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ 
          quality: 60,
          progressive: true,
          mozjpeg: true
        })
        .toBuffer();
    }
  }
  
  return compressedBuffer;
}

// POST endpoint to upload a file directly to S3
app.post('/projects/pinterest-clone/demo/api', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'File is required.' });
    }

    // Check if file is an image
    if (!file.mimetype.startsWith('image/')) {
      return res.status(400).json({ error: 'Only image files are allowed.' });
    }

    // Compress the image for Pinterest (2:3 ratio, max 100KB)
    const compressedBuffer = await compressImageForPinterest(file.buffer);
    
    // Log the final file size for debugging
    console.log(`Original size: ${(file.buffer.length / 1024).toFixed(2)}KB`);
    console.log(`Compressed size: ${(compressedBuffer.length / 1024).toFixed(2)}KB`);

    const fileKey = `uploads/${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '.jpg')}`; // Ensure file has .jpg extension

    const params = {
      Bucket: 'pinterest-clone-s3-bucket-shreyas', // Replace with your S3 bucket name
      Key: fileKey,
      Body: compressedBuffer,
      ContentType: 'image/jpeg',
      Metadata: {
        'original-name': file.originalname,
        'compressed-size': compressedBuffer.length.toString(),
        'pinterest-optimized': 'true'
      }
    };

    // Upload file to S3
    const data = await s3.upload(params).promise();

    // Respond with the uploaded file's details
    res.status(200).json({
      message: 'File uploaded successfully.',
      fileKey: data.Key,
      fileUrl: data.Location,
      bucket: data.Bucket,
      originalSize: `${(file.buffer.length / 1024).toFixed(2)}KB`,
      compressedSize: `${(compressedBuffer.length / 1024).toFixed(2)}KB`,
      dimensions: '600x900 (Pinterest optimized)'
    });
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    res.status(500).json({ error: 'Failed to upload file to S3.' });
  }
});

// Add this route to handle GET requests for this endpoint
app.get('/projects/pinterest-clone/demo/api', (req, res) => {
  res.status(405).json({ error: 'GET method not allowed on this endpoint. Use POST instead.' });
});

// Route all other requests to the React app
// Serve React for specific routes
const reactRoutes = [
  '/projects/pinterest-clone/demo',
  '/projects/pinterest-clone/demo/my-pins',
  '/projects/pinterest-clone/demo/profile',
  '/',
  '/my-pins',
  '/profile',
];

reactRoutes.forEach((route) => {
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, '../clone/dist', 'index.html'));
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});