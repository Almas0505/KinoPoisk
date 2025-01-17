const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, './public/images/films'); // Указываем путь для сохранения файлов
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // Извлекаем расширение файла
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext; // Генерируем уникальное имя файла

        cb(null, unique); // Устанавливаем имя файла
    }
});

const upload = multer({ storage: storage }); // Настройка multer с использованием diskStorage
module.exports = { upload };
