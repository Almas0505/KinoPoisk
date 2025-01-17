const Country = require('./Country');

// const data = [
//     'Россия',
//     'СССР',
//     'США',
//     'Франция',
//     'Южная Корея',
//     'Великобритания',
//     'Япония',
//     'Италия',
//     'Испания',
//     'Германия',
//     'Турция',
//     'Швеция',
//     'Дания',
//     'Норвегия',
//     'Гонконг',
// ];

const data = [
    'Россия',
    'СССР',
    'США',
    'Франция',
    'Южная Корея',
    'Великобритания',
    'Япония',
    'Италия',
    'Испания',
    'Германия',
    'Турция',
    'Швеция',
    'Дания',
    'Норвегия',
    'Гонконг',
    'Канада',
    'Австралия',
    'Китай',
    'Индия',
    'Мексика',
    'Бразилия',
    'Аргентина',
    'Южноафриканская Республика',
    'Новая Зеландия',
    'Нидерланды',
    'Бельгия',
    'Польша',
    'Швейцария',
    'Тайвань',
];

// async function clearDatabase() {
//     try {
//         await Country.deleteMany({}); // Удаляет все записи из коллекции Genres
//         console.log('All records in Genres collection have been deleted.');
//     } catch (error) {
//         console.error('Error clearing the database:', error.message);
//     }
// }

// module.exports = clearDatabase;

async function writeDataCountry() {
    try {
        const length = await Country.countDocuments(); // Corrected "Coutry" to "Country"

        if (length === 0) {
            const countryPromises = data.map((item, index) => {
                return new Country({
                    name: item,
                    key: index,
                }).save();
            });
            await Promise.all(countryPromises); // Wait for all save operations to complete
            console.log('Seed data written to database.');
        } else {
          //  console.log('Countries already exist in database.');
        }
    } catch (error) {
        console.error('Error seeding countries:', error.message); // Corrected error message
    }
}

module.exports = writeDataCountry;



