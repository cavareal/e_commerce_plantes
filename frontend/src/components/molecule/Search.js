import React, { useContext, useEffect, useState } from 'react';
import Button from "../atom/Button";
import { PreferencesContext } from "../../context/PreferenceProvider";

// Sample plant data
const plants = [
    {
        name: 'Ficus Lyrata',
        category: 'plante verte',
        id: '1',
        onSale: true,
        size: 'Petite',
        cover: 'ficusLyrata.jpg', // Sample cover image
        lightRequirement: 'Moyenne lumière',
        price: 25,
        discount: 0.20
    },
    // Add more plant objects here
];

const SearchBar = ({ itemList, setItemsList }) => {

    const { darkMode, setDarkMode } = useContext(PreferencesContext);

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        setDarkMode(savedDarkMode === 'true');
    }, []);

    const [itemList0, setItemsList0] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/`)
            .then((response) => response.json())
            .then((data) => {
                setItemsList0(data)
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des plantes:', error);
            })
    }, [])


    const [isSortedByPrice, setIsSortedByPrice] = useState(false);
    const sortItemsByPrice = () => {
        let sortedItems;
        if (isSortedByPrice) {
            // Si la liste est déjà triée par prix, inversez le tri
            sortedItems = [...itemList].sort((a, b) => a.name.localeCompare(b.name));
        } else {
            // Sinon, triez la liste par prix croissant
            sortedItems = [...itemList].sort((a, b) => a.price - b.price);
        }
        // Mettez à jour l'état de la liste et de isSortedByPrice
        setItemsList(sortedItems);
        setIsSortedByPrice(!isSortedByPrice);
    };

    const [searchResults, setSearchResults] = useState(plants);
    // const sortItemsByPrice = () => {
    //     //     const sortedItems = [...itemList].sort((a, b) => a.price - b.price);
    //     //     setItemsList(sortedItems);
    //     // };

    const [filters, setFilters] = useState({
        category: '',
        size: '',
        lightRequirement: '',
        onSale: ''
    });

    const resetFilters = () => {
        setFilters({
            category: '',
            size: '',
            lightRequirement: '',
            onSale: ''
        });
        setKeyword('');
        setItemsList(itemList0);
    };

    const [tags, setTags] = useState([]);
    const [keyword, setKeyword] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });

        if (value && !tags.some(tag => tag.name === name)) {
            const newTag = { name, value };
            setTags([...tags, newTag]);
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag.name !== tagToRemove.name));
        setFilters({
            ...filters,
            [tagToRemove.name]: ''
        });
    };

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearch = () => {
        let filteredPlants = itemList0;

        // Apply filters
        if (filters.category) {
            filteredPlants = filteredPlants.filter(plant => plant.category === filters.category);
        }
        if (filters.size) {
            filteredPlants = filteredPlants.filter(plant => plant.size === filters.size);
        }
        if (filters.lightRequirement) {
            filteredPlants = filteredPlants.filter(plant => plant.lightRequirement === filters.lightRequirement);
        }
        if (filters.onSale === 'yes') {
            filteredPlants = filteredPlants.filter(plant => plant.onSale);
        } else if (filters.onSale === 'no') {
            filteredPlants = filteredPlants.filter(plant => !plant.onSale);
        }

        // Filter by keyword
        if (keyword) {
            const lowerKeyword = keyword.toLowerCase();
            filteredPlants = filteredPlants.filter(plant =>
                plant.name.toLowerCase().includes(lowerKeyword) ||
                plant.category.toLowerCase().includes(lowerKeyword) ||
                plant.lightRequirement.toLowerCase().includes(lowerKeyword)
            );
        }

        setItemsList(filteredPlants);
    };

    return (
        <div className={`m-4 p-5 ${darkMode ? "bg-darkGrey text-white" : "bg-white"} shadow-lg rounded-lg`}>

            {/* Keyword Search Bar */}
            <div className="mb-4 flex flex-row gap-2">
                <label className="block text-lg font-medium mt-3 items-center">Recherche</label>
                <input
                    type="text"
                    value={keyword}
                    onChange={handleKeywordChange}
                    placeholder="Tapez des mots clés (ex. Ficus, lumière)"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                />
                <Button onClick={sortItemsByPrice}
                        bgColor={`${darkMode ? "primary" : "lightGrey"}`}
                        textColor={`${darkMode ?"white" : "black"}`}
                        text={"trier"}/>
                <Button
                    text="Réinitialiser"
                    bgColor={`${darkMode ? "primary" : "lightGrey"}`}
                    textColor={`${darkMode ?"white" : "black"}`}
                    onClick={resetFilters}/>
            </div>

            {/*/!* Tags Display *!/*/}
            {/*<div className="flex flex-wrap mb-4">*/}
            {/*    {tags.map(tag => (*/}
            {/*        <span*/}
            {/*            key={tag.name}*/}
            {/*            className="bg-light-green-300 text-light-green-900 px-3 py-1 mr-2 mb-2 rounded-full flex items-center"*/}
            {/*        >*/}
            {/*            {`${tag.name}: ${tag.value}`}*/}
            {/*            <button*/}
            {/*                onClick={() => removeTag(tag)}*/}
            {/*                className="ml-2 text-red-500 hover:text-red-700"*/}
            {/*            >*/}
            {/*                ✕*/}
            {/*            </button>*/}
            {/*        </span>*/}
            {/*    ))}*/}
            {/*</div>*/}

            {/* Filters in a single row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Category Filter */}
                <div>
                    <label className="block text-lg font-medium mb-2">Catégorie</label>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                    >
                        <option value="">Toutes les catégories</option>
                        <option value="plante verte">Plante verte</option>
                        <option value="fleur">Fleur</option>
                    </select>
                </div>

                {/* Size Filter */}
                <div>
                    <label className="block text-lg font-medium mb-2">Taille</label>
                    <select
                        name="size"
                        value={filters.size}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                    >
                        <option value="">Toutes les tailles</option>
                        <option value="Petite">Petite</option>
                        <option value="Moyenne">Moyenne</option>
                        <option value="Grande">Grande</option>
                    </select>
                </div>

                {/* Light Requirement Filter */}
                <div>
                    <label className="block text-lg font-medium mb-2">Besoin en lumière</label>
                    <select
                        name="lightRequirement"
                        value={filters.lightRequirement}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                    >
                        <option value="">Tous les besoins</option>
                        <option value="Faible lumière">Faible lumière</option>
                        <option value="Moyenne lumière">Moyenne lumière</option>
                        <option value="Haute lumière">Haute lumière</option>
                    </select>
                </div>

                {/* On Sale Filter */}
                <div>
                    <label className="block text-lg font-medium mb-2">En solde</label>
                    <select
                        name="onSale"
                        value={filters.onSale}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                    >
                        <option value="">Toutes</option>
                        <option value="yes">Oui</option>
                        <option value="no">Non</option>
                    </select>
                </div>
            </div>
            <div className={"flex justify-center"}>
                <Button
                    text="Rechercher"
                    bgColor={`${darkMode ? "secondary" : "primary"}`}
                    textColor={`${darkMode ? "black" : "white"}`}
                    onClick={handleSearch}
                />
            </div>

            {/*<div className="mt-8">*/}
            {/*    <h2 className="text-xl font-bold">Résultats de recherche</h2>*/}
            {/*    {searchResults.length > 0 ? (*/}
            {/*        <ul className="mt-4">*/}
            {/*            {searchResults.map(plant => (*/}
            {/*                <li key={plant.id} className="mb-2">*/}
            {/*                    {plant.name} - {plant.price}€*/}
            {/*                    {plant.onSale && <span className="text-red-500"> (En solde!)</span>}*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    ) : (*/}
            {/*        <p>Aucun résultat trouvé</p>*/}
            {/*    )}*/}
            {/*</div>*/}
        </div>
    );
};

export default SearchBar;
