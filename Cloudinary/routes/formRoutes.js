const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const cloudinary = require('../config/cloudinary.config');
const db = require('../config/db');
const streamifier = require('streamifier');

const fileFields = [
  { name: 'image', maxCount: 1 },
  { name: 'pdf', maxCount: 1 },
  { name: 'doc', maxCount: 1 },
  { name: 'audio', maxCount: 1 },
  { name: 'video', maxCount: 1 },
];

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

router.post('/submit', upload.fields(fileFields), async (req, res) => {
  try {
    const { title, description } = req.body;

    const urls = {
      image: null,
      pdf: null,
      doc: null,
      audio: null,
      video: null,
    };

    for (const field of Object.keys(urls)) {
      const file = req.files?.[field]?.[0];
      if (!file) continue;

      const result = await uploadToCloudinary(file.buffer);

      urls[field] = result.secure_url;
    }

    const [result] = await db.execute(
      `INSERT INTO submissions
       (title, description, image_url, pdf_url, doc_url, audio_url, video_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        title || null,
        description || null,
        urls.image,
        urls.pdf,
        urls.doc,
        urls.audio,
        urls.video,
      ]
    );

    res.json({
      message: 'Form submitted successfully',
      id: result.insertId,
      data: urls,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

module.exports = router;