🧩 Multer — Easy Language README (Your Version)
🚀 What is Multer?

👉 Multer is a tool (middleware) in Node.js that helps your backend receive files from users.

💡 In one line:

Multer takes file uploads from frontend and makes them usable in your backend.

🧠 Why do we need Multer?

When a user uploads a file (image, PDF, etc.):

It comes in a special format → multipart/form-data
Express cannot understand this format by default

👉 So we use Multer to read and extract files

🔄 What Multer does internally
User uploads file
        ↓
Request comes in multipart/form-data
        ↓
Multer reads it
        ↓
Gives you:
   req.file (file info)
   req.body (text data)
⚙️ Basic Setup
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
🧠 Meaning:
Multer will store uploaded files in uploads/ folder (temporary)
🧪 Using it in route
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  console.log(req.body);
});
🧠 Important Concepts
1️⃣ req.file vs req.body
Thing	Meaning
req.file	uploaded file
req.body	normal text fields
2️⃣ Different upload types
🔹 Single file
upload.single('image')

👉 One file → req.file

🔹 Multiple files (same name)
upload.array('photos', 5)

👉 Many files → req.files

🔹 Multiple fields
upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 5 }
])

👉 Different file inputs

🔹 Only text (no file)
upload.none()
📁 Where files are stored?
Option 1: Disk (default)
multer({ dest: 'uploads/' })

👉 Files saved in your system

Option 2: Memory
multer({ storage: multer.memoryStorage() })

👉 Files stored in RAM (no folder)

⚠️ Important difference
Disk Storage	Memory Storage
Saves file in folder	Keeps in RAM
Needs cleanup (fs)	No cleanup
Slower	Faster
Safer for large files	Risky for large uploads
🧠 File info you get

Example req.file:

{
  originalname: 'photo.jpg',
  mimetype: 'image/jpeg',
  size: 12345,
  path: 'uploads/abc123.jpg'
}

👉 Most used:

path → for uploading to Cloudinary
mimetype → check file type
size → limit file size
🔐 Security (VERY IMPORTANT)
1️⃣ File size limit
multer({
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
})
2️⃣ File type filter
fileFilter: (req, file, cb) => {
  if (file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}
⚠️ Warning (very important)

👉 Never do this:

app.use(upload.any());

❌ Because:

Anyone can upload anything anywhere
Security risk
🔥 Real Project Flow (IMPORTANT)
Frontend uploads file
        ↓
Multer handles it
        ↓
File saved temporarily
        ↓
Upload to Cloudinary
        ↓
Get URL
        ↓
Store URL in SQL
        ↓
Delete temp file (fs)
🧠 Golden Rules (remember this)

👉 Multer is only for:

Receiving files
Not storing permanently

👉 SQL database:

Store only file URL
NOT actual file
💥 Real-life analogy
Multer = receptionist 📥
uploads folder = waiting room
Cloudinary = storage warehouse ☁️
SQL = record book 📒