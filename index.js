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

// POST endpoint to upload a file directly to S3
app.post('/projects/pinterest-clone/demo/api', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'File is required.' });
    }

    // Compress the image and convert it to jpg
    const compressedBuffer = await sharp(file.buffer)
      .jpeg({ quality: 80 }) // Adjust quality as needed
      .toBuffer();

    const fileKey = `uploads/${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, '.jpg')}`; // Ensure file has .jpg extension

    const params = {
      Bucket: 'pinterest-clone-s3-bucket-shreyas', // Replace with your S3 bucket name
      Key: fileKey,
      Body: compressedBuffer,
      ContentType: 'image/jpeg',
    };

    // Upload file to S3
    const data = await s3.upload(params).promise();

    // Respond with the uploaded file's details
    res.status(200).json({
      message: 'File uploaded successfully.',
      fileKey: data.Key,
      fileUrl: data.Location,
      bucket: data.Bucket,
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
