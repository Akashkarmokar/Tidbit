/**
 * External Imports
 */
const multer = require('multer');
const createError = require('http-errors');
const path = require('path');

/**
 *
 * @param {String} subFolderPath Sub folder path where file save
 * @param {Array} fileTypes Allowed File Types
 * @param {Number} maxFileSize Maximum File Size
 * @param {String} errorMessage Error Message
 */
function uploader(subFolderPath, fileTypes, maxFileSize, errorMessage) {
    /**
     * File upload Path
     */
    const UploadFolder = `${__dirname}/../public/uploads/${subFolderPath}`;

    /**
     * Define The storage Configurations
     */
    const storageConfig = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, UploadFolder);
        },
        filename: (req, file, cb) => {
            const fileExt = path.extname(file.originalname);
            const fileName = `${file.originalname
                .replace(fileExt, '')
                .toLowerCase()
                .split(' ')
                .join('-')}-${Date.now()}`;
            cb(null, fileName + fileExt);
        },
    });

    /**
     * Multer Objeect
     */
    const upload = multer({
        storage: storageConfig,
        limits: {
            fileSize: maxFileSize,
        },
        fileFilter: (req, file, cb) => {
            if (fileTypes.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(errorMessage));
            }
        },
    });

    /**
     * Return Multer Object
     */
    return upload;
}
/**
 * Export Module
 */
module.exports = uploader;
