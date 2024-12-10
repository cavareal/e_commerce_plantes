import {useState, useEffect, useContext} from 'react'
// import {itemList} from "../../datas/ItemList";
import ItemCard from "../molecule/ItemCard";
import Search from "../molecule/Search";
import SearchBar from "../molecule/Search";
import { Plus } from 'lucide-react';
import Modal from 'react-modal';
import Button from "../atom/Button";
import {PreferencesContext} from "../../context/PreferenceProvider";
import ButtonIcon from "../atom/ButtonIcon";

function ShoppingList({ addToBasket }) {

    const {darkMode, setDarkMode} = useContext(PreferencesContext)

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        setDarkMode(savedDarkMode === 'true');
    }, []);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [itemList, setItemsList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/`)
            .then((response) => response.json())
            .then((data) => {
                setItemsList(data)
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des plantes:', error);
            })
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: event.target.name.value,
                category: event.target.category.value,
                size: event.target.size.value,
                lightRequirement: event.target.lightRequirement.value,
                price: event.target.price.value,
                onSale: event.target.onSale.value,
                discount: event.target.discount.value,
                cover: event.target.cover.value,
                description: event.target.description.value
            })
        })  .then(response => response.json())
            .then(() => setModalIsOpen(false))
            .then(data => {
                window.location.reload();
            })
            .catch(error => console.error('Erreur lors de la requête PUT :', error));
    }

    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
        if (savedFavorites) {
            setFavorites(savedFavorites);
        }
    }, []);

    return (
        <div>
            <SearchBar itemList={itemList} setItemsList={setItemsList} />
            <div className="flex flex-wrap justify-center">
                {itemList.length > 0 ? (
                    itemList.map((item) => (
                        <ItemCard item={item} key={item.id} addToBasket={addToBasket} favorites={favorites} setFavorites={setFavorites}/>
                    ))
                ) : (
                    <div className={"text-center text-4xl"}>Il n'y a pas d'articles.</div>
                )}
            </div>
            <div className="flex justify-end m-6">
                {/*<Button*/}
                {/*    text={"+"}*/}
                {/*    onClick={() => setModalIsOpen(true)}*/}
                {/*    bgColor={`${darkMode ? "secondary" : "primary"}`}*/}
                {/*    textColor={`${darkMode ? "black" : "white"}`}/>*/}
                <ButtonIcon
                    icon={<Plus/>}
                    bgColor={`${darkMode ? "secondary" : "secondary"}`}
                    onClick={() => setModalIsOpen(true)}/>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                className="w-3/4 h-3/4 bg-white rounded-lg p-4 shadow-lg"
                style={{
                    content: {
                        position: 'absolute',
                        top: '50%',       // Maintien à 50% du haut de la fenêtre
                        left: '50%',
                        transform: 'translate(-50%, -40%)', // Ajuste légèrement pour corriger la hauteur
                        margin: '0',
                        padding: '0',
                        border: 'none',
                        outline: 'none',
                    }
                }}
            >
                <h2 className="text-2xl font-bold m-4">Ajouter une plante</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4 ">

                        {/* Nom de la plante */}
                        <div className="col-span-1">
                            <label className="block text-lg font-medium mb-2">Nom</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Begonia Maculata"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                                required
                            />
                        </div>

                        {/* Catégorie */}
                        <div className="col-span-1">
                            <label className="block text-lg font-medium mb-2">Catégorie</label>
                            <select
                                name="category"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                                required
                            >
                                <option value="plante verte">Plante verte</option>
                                <option value="fleur">Fleur</option>
                                <option value="succulente">Succulente</option>
                            </select>
                        </div>

                        {/* Taille */}
                        <div className="col-span-1">
                            <label className="block text-lg font-medium mb-2">Taille</label>
                            <select
                                name="size"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                                required
                            >
                                <option value="Petite">Petite</option>
                                <option value="Moyenne">Moyenne</option>
                                <option value="Grande">Grande</option>
                            </select>
                        </div>

                        {/* Lumière requise */}
                        <div className="col-span-1">
                            <label className="block text-lg font-medium mb-2">Lumière requise</label>
                            <select
                                name="lightRequirement"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                                required
                            >
                                <option value="Faible lumière">Faible lumière</option>
                                <option value="Moyenne lumière">Moyenne lumière</option>
                                <option value="Forte lumière">Forte lumière</option>
                            </select>
                        </div>

                        {/* Prix */}
                        <div className="col-span-1">
                            <label className="block text-lg font-medium mb-2">Prix (€)</label>
                            <input
                                type="number"
                                name="price"
                                placeholder="20"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                                required
                            />
                        </div>

                        {/* En soldes */}
                        <div className="col-span-1">
                            <label className="block text-lg font-medium mb-2">En solde</label>
                            <select
                                name="onSale"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                                required
                            >
                                <option value={0}>Non</option>
                                <option value={1}>Oui</option>
                            </select>
                        </div>

                        {/* Pourcentage de réduction (si en solde) */}
                        <div className="col-span-1">
                            <label className="block text-lg font-medium mb-2">Réduction (%)</label>
                            <input
                                type="number"
                                name="discount"
                                placeholder="0"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                            />
                        </div>

                        {/* Image de couverture */}
                        <div className="col-span-1">
                            <label className="block text-lg font-medium mb-2">Image de couverture</label>
                            <input
                                type="file"
                                name="cover"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                                accept="image/*"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="col-span-1">
                            <label className="block text-lg font-medium mb-2">Description</label>
                            <input
                                type="text"
                                name="description"
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-green-300 focus:border-green-300"
                                required
                            />
                        </div>

                    </div>
                    <div className={"flex justify-center"}>
                        <Button
                            text={"Ajouter"}
                            bgColor={`${darkMode ? "secondary" : "primary"}`}
                            textColor={`${darkMode ? "black" : "white"}`}/>
                    </div>
                </form>

            </Modal>

        </div>
    );
}

export default ShoppingList;