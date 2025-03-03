const mongoose = require('mongoose');
const Lighthouse = require('../model/Lighthouse');
const FishFarm = require('../model/FishFarm');


const lighthouses = [
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



const fishFarms = [{isSelected: false, centralCoordinate: {lat: 42.4852513, lng: 18.7452291}, coordinates: [{lat: 42.4841536, lng: 18.7433808}, {lat: 42.4843782, lng: 18.7454414}, {lat: 42.4853283, lng: 18.7471263}, {lat: 42.4862185, lng: 18.746812}, {lat: 42.4860019, lng: 18.7450309}, {lat: 42.4849093, lng: 18.7430526}], id: 1}, {isSelected: false, centralCoordinate: {lat: 42.484327, lng: 18.7636054}, coordinates: [{lat: 42.4840985, lng: 18.7631483}, {lat: 42.4838632, lng: 18.7638456}, {lat: 42.4845202, lng: 18.7638959}, {lat: 42.4847204, lng: 18.7634407}], id: 2}, {isSelected: false, centralCoordinate: {lat: 42.4870937, lng: 18.7642748}, coordinates: [{lat: 42.4865123, lng: 18.7639069}, {lat: 42.4867615, lng: 18.7649592}, {lat: 42.4875555, lng: 18.764717}, {lat: 42.487321, lng: 18.7634273}], id: 3}, {isSelected: false, centralCoordinate: {lat: 42.4882508, lng: 18.7638991}, coordinates: [{lat: 42.4875783, lng: 18.7639047}, {lat: 42.4880918, lng: 18.7646972}, {lat: 42.4882508, lng: 18.7638991}, {lat: 42.4884076, lng: 18.7630974}], id: 4}, {isSelected: false, centralCoordinate: {lat: 42.4843429, lng: 18.7407873}, coordinates: [{lat: 42.4839141, lng: 18.7403718}, {lat: 42.4840952, lng: 18.7413514}, {lat: 42.4847325, lng: 18.7412456}, {lat: 42.4845358, lng: 18.7401517}], id: 5}, {isSelected: false, centralCoordinate: {lat: 42.4835411, lng: 18.7366348}, coordinates: [{lat: 42.483051, lng: 18.7363468}, {lat: 42.483153, lng: 18.7371181}, {lat: 42.4839671, lng: 18.7368678}, {lat: 42.483899, lng: 18.7360936}], id: 6}, {isSelected: false, centralCoordinate: {lat: 42.4835486, lng: 18.7269402}, coordinates: [{lat: 42.4828924, lng: 18.7259042}, {lat: 42.483254, lng: 18.7278906}, {lat: 42.4840907, lng: 18.7278373}, {lat: 42.4837952, lng: 18.7259511}], id: 7}, {isSelected: false, centralCoordinate: {lat: 42.4837083, lng: 18.7288272}, coordinates: [{lat: 42.4829529, lng: 18.7282327}, {lat: 42.4830308, lng: 18.7288885}, {lat: 42.483481, lng: 18.7293292}, {lat: 42.4842538, lng: 18.7294089}, {lat: 42.4842896, lng: 18.7284842}, {lat: 42.4839472, lng: 18.7282661}], id: 8}, {isSelected: false, centralCoordinate: {lat: 42.483174, lng: 18.7197225}, coordinates: [{lat: 42.4827221, lng: 18.7194194}, {lat: 42.4827757, lng: 18.7199957}, {lat: 42.4836121, lng: 18.719994}, {lat: 42.4836076, lng: 18.7194041}], id: 9}, {isSelected: false, centralCoordinate: {lat: 42.4942808, lng: 18.690379}, coordinates: [{lat: 42.4942354, lng: 18.6899493}, {lat: 42.4942216, lng: 18.69077}, {lat: 42.4943124, lng: 18.6907638}, {lat: 42.4943652, lng: 18.6899424}], id: 10}, {isSelected: false, centralCoordinate: {lat: 42.4972443, lng: 18.6905105}, coordinates: [{lat: 42.4969496, lng: 18.6899374}, {lat: 42.4967435, lng: 18.6906495}, {lat: 42.4974897, lng: 18.6911717}, {lat: 42.497699, lng: 18.6903095}], id: 11}, {isSelected: false, centralCoordinate: {lat: 42.5000898, lng: 18.6912361}, coordinates: [{lat: 42.499399, lng: 18.6904858}, {lat: 42.4993554, lng: 18.6916468}, {lat: 42.5007388, lng: 18.6919331}, {lat: 42.5008706, lng: 18.6907831}], id: 12}, {isSelected: false, centralCoordinate: {lat: 42.5148811, lng: 18.6841915}, coordinates: [{lat: 42.5149129, lng: 18.684028}, {lat: 42.5147559, lng: 18.6843413}, {lat: 42.514814, lng: 18.6843709}, {lat: 42.5150003, lng: 18.6840372}], id: 13}, {isSelected: false, centralCoordinate: {lat: 42.4743562, lng: 18.7634622}, coordinates: [{lat: 42.4741536, lng: 18.7628186}, {lat: 42.4741559, lng: 18.7639539}, {lat: 42.4745138, lng: 18.7641344}, {lat: 42.4744667, lng: 18.7628551}], id: 14}, {isSelected: false, centralCoordinate: {lat: 42.5058751, lng: 18.677763}, coordinates: [{lat: 42.5053528, lng: 18.6771254}, {lat: 42.5050544, lng: 18.6781559}, {lat: 42.5062993, lng: 18.6784382}, {lat: 42.506396, lng: 18.6773506}], id: 16}, {isSelected: false, centralCoordinate: {lat: 42.5045615, lng: 18.6715443}, coordinates: [{lat: 42.5046021, lng: 18.6712911}, {lat: 42.5043755, lng: 18.6713984}, {lat: 42.5044829, lng: 18.6717913}, {lat: 42.5046865, lng: 18.6716518}], id: 17}, {isSelected: false, centralCoordinate: {lat: 42.5024201, lng: 18.6662594}, coordinates: [{lat: 42.5025183, lng: 18.6658024}, {lat: 42.5019931, lng: 18.666201}, {lat: 42.5022043, lng: 18.666737}, {lat: 42.5027678, lng: 18.66638}], id: 18}, {isSelected: false, centralCoordinate: {lat: 42.4980036, lng: 18.6608216}, coordinates: [{lat: 42.4981861, lng: 18.6602379}, {lat: 42.4975133, lng: 18.6610319}, {lat: 42.4977066, lng: 18.6614391}, {lat: 42.4984136, lng: 18.660574}], id: 19}, {isSelected: false, centralCoordinate: {lat: 42.4929924, lng: 18.6521077}, coordinates: [{lat: 42.4928881, lng: 18.6517194}, {lat: 42.4926848, lng: 18.6521399}, {lat: 42.4930693, lng: 18.6524907}, {lat: 42.4932384, lng: 18.6520908}], id: 20}, {isSelected: false, centralCoordinate: {lat: 42.4816608, lng: 18.6818341}, coordinates: [{lat: 42.4821645, lng: 18.6804093}, {lat: 42.4809576, lng: 18.6832005}, {lat: 42.4811353, lng: 18.6833141}, {lat: 42.4823675, lng: 18.6805138}], id: 21}, {isSelected: false, centralCoordinate: {lat: 42.4584913, lng: 18.6726619}, coordinates: [{lat: 42.4587926, lng: 18.6718214}, {lat: 42.4579434, lng: 18.6721282}, {lat: 42.4580568, lng: 18.6735583}, {lat: 42.4588599, lng: 18.6730866}], id: 22}, {isSelected: false, centralCoordinate: {lat: 42.4575689, lng: 18.6698898}, coordinates: [{lat: 42.4570808, lng: 18.6688604}, {lat: 42.4567682, lng: 18.6691389}, {lat: 42.4578892, lng: 18.6706695}, {lat: 42.4581068, lng: 18.6703465}], id: 23}, {isSelected: false, centralCoordinate: {lat: 42.4771489, lng: 18.6944477}, coordinates: [{lat: 42.4770791, lng: 18.6919413}, {lat: 42.4779825, lng: 18.6924452}, {lat: 42.4781184, lng: 18.6931185}, {lat: 42.4773145, lng: 18.6968207}, {lat: 42.4760015, lng: 18.6961914}], id: 24}];
    

module.exports = fishFarms;


const populateDB = async () => {
    try {
        // Insert data
        await Lighthouse.insertMany(lighthouses);
        console.log('Database seeded successfully!');
        
        // Insert fish farm data
        await FishFarm.insertMany(fishFarms);
        console.log('Fish farms seeded successfully!');
    } catch (error) {
        console.error('Error populating database:', error);
    }
};


module.exports = { populateDB };
