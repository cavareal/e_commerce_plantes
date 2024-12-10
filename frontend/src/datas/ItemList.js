import alocasiaAmazonica from '../assets/plant/alocasiaAmazonica.png';
import alocasiaZebrina from '../assets/plant/alocasiaZebrina.png';
import ficusLyrata from '../assets/plant/ficusLyrata.png';
import ficusElastica from '../assets/plant/ficusElastica.png';
import monsteraDeliciosa from '../assets/plant/monsteraDeliciosa.png';
import monsteraAdansonii from '../assets/plant/monsteraAdansonii.png';
import pilea from '../assets/plant/pilea.png';
import pothosManjula from '../assets/plant/pothosManjula.png';
import pothosMarbleQueen from '../assets/plant/pothosMarbleQueen.png';
import calatheaOrbifolia from '../assets/plant/calatheaOrbifolia.png';
import calatheaLancifolia from '../assets/plant/calatheaLancifolia.png';
import pothosNeon from '../assets/plant/pothosNeon.png';
import begoniaMaculata from '../assets/plant/begoniaMaculatapng.png';

export const itemList = [
    {
        name: 'Ficus Lyrata',
        category: 'plante verte',
        id: '1',
        onSale: true,
        size: 'Petite',
        cover: ficusLyrata,
        lightRequirement: 'Moyenne lumière',
        price: 25,
        discount: 0.20 // 20% de réduction
    },
    {
        name: 'Monstera Deliciosa',
        category: 'plante verte',
        id: '2',
        onSale: false,
        size: 'Moyenne',
        cover: monsteraDeliciosa,
        lightRequirement: 'Faible lumière',
        price: 30,
        discount: 0 // Pas de réduction
    },
    {
        name: 'Pilea Peperomioides',
        category: 'plante succulente',
        id: '3',
        onSale: false,
        size: 'Petite',
        cover: pilea,
        lightRequirement: 'Lumière indirecte',
        price: 15,
        discount: 0 // Pas de réduction
    },
    {
        name: 'Pothos Manjula',
        category: 'plante verte',
        id: '4',
        onSale: true,
        size: 'Petite',
        cover: pothosManjula,
        lightRequirement: 'Lumière indirecte',
        price: 20,
        discount: 0.15 // 15% de réduction
    },
    {
        name: 'Pothos Marble Queen',
        category: 'plante verte',
        id: '5',
        onSale: false,
        size: 'Petite',
        cover: pothosMarbleQueen,
        lightRequirement: 'Lumière indirecte',
        price: 20,
        discount: 0 // Pas de réduction
    },
    {
        name: 'Alocasia Amazonica',
        category: 'plante verte',
        id: '6',
        onSale: false,
        size: 'Moyenne',
        cover: alocasiaAmazonica,
        lightRequirement: 'Moyenne lumière',
        price: 30,
        discount: 0 // Pas de réduction
    },
    {
        name: 'Alocasia Zebrina',
        category: 'plante verte',
        id: '7',
        onSale: false,
        size: 'Moyenne',
        cover: alocasiaZebrina,
        lightRequirement: 'Moyenne lumière',
        price: 30,
        discount: 0 // Pas de réduction
    },
    {
        name: 'Ficus Elastica',
        category: 'plante verte',
        id: '8',
        onSale: true,
        size: 'Moyenne',
        cover: ficusElastica,
        lightRequirement: 'Moyenne lumière',
        price: 25,
        discount: 0.10 // 10% de réduction
    },
    {
        name: 'Monstera Adansonii',
        category: 'plante verte',
        id: '9',
        onSale: false,
        size: 'Moyenne',
        cover: monsteraAdansonii,
        lightRequirement: 'Faible lumière',
        price: 30,
        discount: 0 // Pas de réduction
    },
    {
        name: 'Calathea Orbifolia',
        category: 'plante verte',
        id: '10',
        onSale: false,
        size: 'Petite',
        cover: calatheaOrbifolia,
        lightRequirement: 'Lumière indirecte',
        price: 20,
        discount: 0 // Pas de réduction
    },
    {
        name: 'Calathea Lancifolia',
        category: 'plante verte',
        id: '11',
        onSale: false,
        size: 'Petite',
        cover: calatheaLancifolia,
        lightRequirement: 'Lumière indirecte',
        price: 20,
        discount: 0 // Pas de réduction
    },
    {
        name: 'Pothos Neon',
        category: 'plante verte',
        id: '12',
        onSale: false,
        size: 'Petite',
        cover: pothosNeon,
        lightRequirement: 'Lumière indirecte',
        price: 20,
        discount: 0 // Pas de réduction
    },
    {
        name: 'Begonia Maculata',
        category: 'plante verte',
        id: '13',
        onSale: false,
        size: 'Petite',
        cover: begoniaMaculata,
        lightRequirement: 'Moyenne lumière',
        price: 20,
        discount: 0 // Pas de réduction
    }
];
