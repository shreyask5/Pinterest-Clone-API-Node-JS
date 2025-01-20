const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const multer = require("multer");
const sharp = require("sharp");
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure AWS SDK
require("dotenv").config();
const s3 = new AWS.S3({
  region: "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Configure Multer for file upload
const upload = multer();

// POST endpoint to upload a file directly to S3
app.post("/upload-to-s3", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "File is required." });
    }

    // Compress the image and convert it to jpg
    const compressedBuffer = await sharp(file.buffer)
      .jpeg({ quality: 80 }) // Adjust quality as needed
      .toBuffer();

    const fileKey = `uploads/${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, ".jpg")}`; // Ensure file has .jpg extension

    const params = {
      Bucket: "pinterest-clone-picture-storage", // Replace with your S3 bucket name
      Key: fileKey,
      Body: compressedBuffer,
      ContentType: "image/jpeg",
    };

    // Upload file to S3
    const data = await s3.upload(params).promise();

    // Respond with the uploaded file's details
    res.status(200).json({
      message: "File uploaded successfully.",
      fileKey: data.Key,
      fileUrl: data.Location,
      bucket: data.Bucket,
    });
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    res.status(500).json({ error: "Failed to upload file to S3." });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});