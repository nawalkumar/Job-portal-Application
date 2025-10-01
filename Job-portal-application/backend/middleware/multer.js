// import multer from "multer";

// const storage = multer.memoryStorage();
// export const singleUpload = multer({ storage }).single("file");
import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({
    storage,
    limits: { fileSize: 200 * 1024 }, // 200 KB = 200 * 1024 bytes
}).single("file");