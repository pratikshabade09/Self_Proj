const multer = require('multer');

const storage =multer.memoryStorage();

const upload = multer({
  // dest: 'uploads/', // temp localstorage
  
  storage: storage, //buffer(ram)storage

  limits: {
    fileSize: 25 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    const allowed = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
      'application/docx',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'audio/mpeg',
      'audio/x-m4a',
      'video/mp4',
      'video/quicktime',
    ];

    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

module.exports = upload;