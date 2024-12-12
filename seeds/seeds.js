const mongoose = require('mongoose');
const Lighthouse = require('../model/Lighthouse');


const lighthouses =  [
    {
        id: 1,
        name: "Ostrvce Mamula",
        latitude: 42.39543,
        longitude: 18.55787,
        isSelected: false,
        characteristics: "Fl 2 3s"
    },
    {
        id: 2,
        name: "Dobreč",
        latitude: 42.42190,
        longitude: 18.54665,
        isSelected: false,
        characteristics: "Fl G 5s"
    },
    {
        id: 3,
        name: "Rose, W strana pristana",
        latitude: 42.42818,
        longitude: 18.55632,
        isSelected: false,
        characteristics: "F G"
    },
    {
        id: 4,
        name: "HERCEG NOVI, glava lukobrana",
        latitude: 42.44962,
        longitude: 18.53238,
        isSelected: false,
        characteristics: "Fl (2)G 5s"
    },
    {
        id: 5,
        name: "Meljine",
        latitude: 42.45250,
        longitude: 18.56050,
        isSelected: false,
        characteristics: "Fl (2)R 6s"
    },
    {
        id: 6,
        name: "Lazure, sjeverni ulaz",
        latitude: 42.45370,
        longitude: 18.56178,
        isSelected: false,
        characteristics: "F G"
    },
    {
        id: 7,
        name: "Lazure, južni ulaz",
        latitude: 42.45343,
        longitude: 18.56195,
        isSelected: false,
        characteristics: "F R"
    },
    {
        id: 8,
        name: "Lazure, Kardinalna plutača južnog kvadranta",
        latitude: 42.45343,
        longitude: 18.56195,
        isSelected: false,
        characteristics: "VQ(6) + LFl 10s"
    },
    {
        id: 9,
        name: "Zelenika,NW ugao pristana",
        latitude: 42.44968,
        longitude: 18.57132,
        isSelected: false,
        characteristics: "Fl R 3s"
    },
    {
        id: 10,
        name: "Baošići, glava koljenastog gata",
        latitude: 42.43712,
        longitude: 18.62932,
        isSelected: false,
        characteristics: "Fl R 5s"
    },
    {
        id: 11,
        name: "Pristan, glava gata",
        latitude: 42.42602,
        longitude: 18.60180,
        isSelected: false,
        characteristics: "Fl G 3s"
    },
    {
        id: 12,
        name: "Porto Novi",
        latitude: 42.433426,
        longitude: 18.59753,
        isSelected: false,
        characteristics: "Fl R"
    },
    {
        id: 13,
        name: "Porto Novi, južni lukobran",
        latitude: 42.432176,
        longitude: 18.60535,
        isSelected: false,
        characteristics: "Fl G 3s"
    },
    {
        id: 14,
        name: "Porto Novi, glava sjevernog lukobrana",
        latitude: 42.433156,
        longitude: 18.60533,
        isSelected: false,
        characteristics: "F G"
    },
    {
        id: 15,
        name: "Porto Novi, glava južnog lukobrana",
        latitude: 42.432606,
        longitude: 18.60503,
        isSelected: false,
        characteristics: "F R"
    },
    {
        id: 16,
        name: "Porto Novi, sjeverni kraj plutajućeg valobrana",
        latitude: 42.43318,
        longitude: 18.60672,
        isSelected: false,
        characteristics: "Fl(2) W 5s"
    },
    {
        id: 17,
        name: "Porto Novi, južni kraj plutajućeg valobrana",
        latitude: 42.431906,
        longitude: 18.60607,
        isSelected: false,
        characteristics: "Fl(2) W 5s"
    },
    {
        id: 18,
        name: "Porto Novi, kardinalna plutača istočnog kvadranta",
        latitude: 42.432476,
        longitude: 18.60667,
        isSelected: false,
        characteristics: "Q(3) 10s"
    },
    {
        id: 19,
        name: "Krašići, glava gata",
        latitude: 42.40927,
        longitude: 18.65335,
        isSelected: false,
        characteristics: "F G"
    },
    {
        id: 20,
        name: "Bjelila (Oko), NW ugao pristana",
        latitude: 42.40617,
        longitude: 18.66610,
        isSelected: false,
        characteristics: "Fl G 2s"
    },
    {
        id: 21,
        name: "Žukavac, koljenasti gat",
        latitude: 42.40404,
        longitude: 18.68606,
        isSelected: false,
        characteristics: "Fl G 3s"
    },
    {
        id: 22,
        name: "Plićina Tunja",
        latitude: 42.41591045284294,
        longitude: 18.680426794570497,
        isSelected: false,
        characteristics: "Fl(2) WR"
    },
    {
        id: 23,
        name: "Kalimanj",
        latitude: 42.42673,
        longitude: 18.69958,
        isSelected: false,
        characteristics: "F R"
    },
    {
        id: 24,
        name: "Plićina Kalimanj",
        latitude: 42.42565057502816,
        longitude: 18.699151789153444,
        isSelected: false,
        characteristics: "Fl R 4s"
    },
    {
        id: 25,
        name: "Porto Montenegro, S strana pontona",
        latitude: 42.42999,
        longitude: 18.69119,
        isSelected: false,
        characteristics: "Fl R 4s"
    },
    {
        id: 26,
        name: "Porto Montenegro, N strana pontona",
        latitude: 42.43413,
        longitude: 18.68997,
        isSelected: false,
        characteristics: "Fl G 4s"
    },
    {
        id: 27,
        name: "Porto Montenegro, gat 1",
        latitude: 42.43153,
        longitude: 18.69060,
        isSelected: false,
        characteristics: "Fl W 3s"
    },
    {
        id: 28,
        name: "Porto Montenegro, gat 4",
        latitude: 42.43372,
        longitude: 18.69083,
        isSelected: false,
        characteristics: "Fl R 4s"
    },
    {
        id: 29,
        name: "Pristan Staničić, NW ugao gata",
        latitude: 42.43025,
        longitude: 18.69510,
        isSelected: false,
        characteristics: "Fl R(2) 6s"
    },
    {
        id: 30,
        name: "Rt Seljanovo",
        latitude: 42.439153997139435,
        longitude: 18.684438548431622,
        isSelected: false,
        characteristics: "Fl R 3s"
    },
    {
        id: 31,
        name: "Rt Sv. Neđelja",
        latitude: 42.46015126097649,
        longitude: 18.675817066343665,
        isSelected: false,
        characteristics: "Fl R 2s"
    },
    {
        id: 32,
        name: "Rt Opatovo",
        latitude: 42.45942,
        longitude: 18.68148,
        isSelected: false,
        characteristics: "Fl G 2s"
    },
    {
        id: 33,
        name: "Turski rt",
        latitude: 42.47808,
        longitude: 18.68672,
        isSelected: false,
        characteristics: "Fl W(2) 5s"
    },
    {
        id: 34,
        name: "Rt  Verige (Gospa od Anđela)",
        latitude: 42.47742500848345,
        longitude: 18.690245160951605,
        isSelected: false,
        characteristics: "Fl G 3s"
    },
    {
        id: 35,
        name: "Kostanjica, sredina gata",
        latitude: 42.48660,
        longitude: 18.66592,
        isSelected: false,
        characteristics: "F R"
    },
    {
        id: 36,
        name: "Morinj,NE ugao pristana",
        latitude: 42.49032,
        longitude: 18.65032,
        isSelected: false,
        characteristics: "F G"
    },
    {
        id: 37,
        name: "RISAN, glava gata",
        latitude: 42.51344,
        longitude: 18.69432,
        isSelected: false,
        characteristics: "Fl G(3) 6s"
    },
    {
        id: 38,
        name: "Gospa od Škrpjela, ostrvce",
        latitude: 42.487290731072704,
        longitude: 18.68821472872734,
        isSelected: false,
        characteristics: "Fl R(2) 6s"
    },
    {
        id: 39,
        name: "PERAST, sredina pristana",
        latitude: 42.48625,
        longitude: 18.69843,
        isSelected: false,
        characteristics: "Fl R(3) 7s"
    },
    {
        id: 40,
        name: "Stoliv, glava gata",
        latitude: 42.47253,
        longitude: 18.71195,
        isSelected: false,
        characteristics: "F G"
    },
    {
        id: 41,
        name: "Prčanj, Markov rt",
        latitude: 42.46563,
        longitude: 18.73415,
        isSelected: false,
        characteristics: "Fl G(2) 6s"
    },
    {
        id: 42,
        name: "Prčanj, N dio pristana",
        latitude: 42.45368,
        longitude: 18.74895,
        isSelected: false,
        characteristics: "Fl G 3s"
    },
    {
        id: 43,
        name: "Rđakovo, N gat",
        latitude: 42.44835,
        longitude: 18.75415,
        isSelected: false,
        characteristics: "Fl G 5s"
    },
    {
        id: 44,
        name: "Rt Plagente",
        latitude: 42.43608,
        longitude: 18.76370,
        isSelected: false,
        characteristics: "Fl R(2) 5s"
    },
    {
        id: 45,
        name: "Muo, glava pristana",
        latitude: 42.43350,
        longitude: 18.75730,
        isSelected: false,
        characteristics: "Fl G(2) 5s"
    },
    {
        id: 46,
        name: "KOTOR, NW strana obale",
        latitude: 42.42612,
        longitude: 18.76672,
        isSelected: false,
        characteristics: "Fl R 3s"
    }
];


const populateDB = async () => {
    try {
        // Insert data
        await Lighthouse.insertMany(lighthouses);
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error populating database:', error);
    }
};


module.exports = {populateDB};
