const Genres = require('./Genres') 
const data = [
    'Комедии',
    'Мультфильмы',
    'Ужасы',
    'Фантастика',
    'Триллеры',
    'Боевики',
    'Мелодрамы',
    'Детективы',
    'Приключения',
    'Фэнтези',
    'Драмы',
    'Документальные',
    'Исторические',
    'Криминал',
    'Музыкальные',
    'Семейные',
    'Спортивные',
    'Военные',
    'Биографические',
    'Аниме'
];


// async function clearDatabase() {
//     try {
//         await Genres.deleteMany({}); // Удаляет все записи из коллекции Genres
//         console.log('All records in Genres collection have been deleted.');
//     } catch (error) {
//         console.error('Error clearing the database:', error.message);
//     }
// }

// module.exports = clearDatabase;


async function writeDataGenre() {
    try {
        const length = await Genres.countDocuments(); // Use countDocuments() instead of deprecated count()
        if (length === 0) {
            const genrePromises = data.map((item, index) =>
                new Genres({
                    name: item,
                    key: index,
                }).save()
            );
            await Promise.all(genrePromises); // Wait for all promises to resolve
            console.log('Seed data written to database.');
        } else {
            // console.log('Genres already exist in database.');
        }
    } catch (error) {
        console.error('Error seeding genres:', error.message);
    }
}
module.exports = writeDataGenre



 
    // if(length == 0){
    //     data.map((item,index) =>{
    //         new Genres({
    //             name:item,
    //             key:index
    //         }).save()
    //     })
    // }