const Film = require('./film');
const User = require('../auth/user')
const fs = require('fs');
const path = require('path');

const createFilm = async (req, res) => { 
    if (
        req.file &&
        req.body.titleRus.length > 2 &&
        req.body.titleEng.length > 2 &&
        req.body.year > 2 &&
        req.body.time > 10 &&
        req.body.country.length > 2 &&
        req.body.genre.length > 2
    ) {
        try {
            if(req.body.video && req.body.video.length > 2 ){
                await new Film({
                    titleRus: req.body.titleRus,
                    titleEng: req.body.titleEng,
                    year: req.body.year,
                    time: req.body.time,
                    country: req.body.country,
                    genre: req.body.genre,
                    video: req.body.video,
                    image: `/images/films/${req.file.filename}`,
                    author: req.user._id,
                }).save();
            }else if(req.body.series && req.body.series.length > 0){
                await new Film({
                    titleRus: req.body.titleRus,
                    titleEng: req.body.titleEng,
                    year: req.body.year,
                    time: req.body.time,
                    country: req.body.country,
                    genre: req.body.genre,
                    series: req.body.series,
                    image: `/images/films/${req.file.filename}`,
                    author: req.user._id,
                }).save();
            }
           
            res.redirect(`/admin/${req.user._id}`);
        } catch (error) {
            console.error('Ошибка при создании фильма:', error);
            res.redirect('/new?error=1');
        }
    } else {
        res.redirect('/new?error=1');
    }
};

const editFilm = async (req, res) => {
    if (
        req.file &&
        req.body.titleRus.length > 2 &&
        req.body.titleEng.length > 2 &&
        req.body.year > 2 &&
        req.body.time > 10 &&
        req.body.country.length > 2 &&
        req.body.genre.length > 2 &&
        req.body.video.length > 2
    ) {
        try {
            const film = await Film.findById(req.body.id);

            if (film && film.image) {
                const oldImagePath = path.join(__dirname, '../../../public' + film.image);
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.error('Ошибка при удалении старого изображения:', err);
                    } else {
                        console.log('Старое изображение удалено:', oldImagePath);
                    }
                });
            }

            await Film.findByIdAndUpdate(req.body.id, {
                titleRus: req.body.titleRus,
                titleEng: req.body.titleEng,
                year: req.body.year,
                time: req.body.time,
                country: req.body.country,
                genre: req.body.genre,
                video: req.body.video,
                image: `/images/films/${req.file.filename}`,
                author: req.user._id,
            });

            res.redirect(`/admin/${req.user._id}`);
        } catch (error) {
            console.error('Ошибка при редактировании фильма:', error);
            res.redirect(`/edit/${req.body.id}?error=1`);
        }
    } else {
        res.redirect(`/edit/${req.body.id}?error=1`);
    }
};

const deleteFilm = async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);
        if (film) {
            const projectRoot = path.join(__dirname, '../../../KINOPOISK');
            const imagePath = path.join(projectRoot, 'public', film.image);

          //  console.log('Путь к изображению:', imagePath);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
               // console.log('Изображение удалено:', imagePath);
            } else {
                console.warn('Файл изображения не найден:', imagePath);
            }

            await Film.deleteOne({ _id: req.params.id });
            res.status(200).send('Фильм успешно удалён');
        } else {
            res.status(404).send('Фильм не найден');
        }
    } catch (error) {
        console.error('Ошибка при удалении фильма:', error);
        res.status(500).send('Ошибка сервера');
    }
};

const saveFilm = async (req, res) => {
    if (req.user && req.body.id) {  // Проверяем, что пользователь авторизован и передан ID фильма
        const user = await User.findById(req.user.id);  // Получаем пользователя по ID
        const findFilm = user.toWatch.filter(item => item.toString() === req.body.id); // Проверяем, есть ли фильм уже в списке

        if (findFilm.length === 0) {
            user.toWatch.push(req.body.id);  // Добавляем фильм в список
            await user.save();  // Сохраняем изменения
            res.send('Фильм успешно сохранен');
        } else {
            res.send('Фильм уже сохранен');
        }
    } else {
        res.status(400).send('Некорректные данные');
    }
};


const deleteFromToWatch = async(req,res) =>{
     if(req.user && req.params.id){
        const user = await User.findById(req.user.id)
        for (let i = 0; i < user.toWatch.length; i++) {
            if(user.toWatch[i] == req.params.id){
                user.toWatch.splice(i,1)
                user.save()
                res.send('Успешно удалено')
            } 
        }
     }
}

module.exports = {
    createFilm,
    editFilm,
    deleteFilm,
    saveFilm,
    deleteFromToWatch
};
