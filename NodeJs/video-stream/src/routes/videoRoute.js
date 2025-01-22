const express = require('express')
const app = express();
const router = express.Router();
// const multer = require('multer');
const { playVideo, getVideoList, uploadFile, addLikeDislike, searchVideo } = require("../controller/videoController");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// });

// const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
router.get("/videos", getVideoList);

router.get("/video/:filename", playVideo);
router.post("/upload-file", uploadFile);
router.post("/add-like-dislike",addLikeDislike);
router.get("/search-video",searchVideo);

module.exports = router;