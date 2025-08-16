const multer = require("multer");

exports.uploadAvatar = multer({
    fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
        
    
    },
    limits: {
        fileSize: 1 * 1024 * 1024  // 2 MB
    }
})



exports.uploadPostImage = multer({
    fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
        
    
    },
    limits: {
        fileSize: 1 * 1024 * 1024 * 1024  // 3 MB
    }
})