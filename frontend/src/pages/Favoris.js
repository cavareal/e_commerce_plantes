import Header from "../components/organism/Header";
import React, {useContext, useEffect, useState} from 'react';
import ItemCard from "../components/molecule/ItemCard";
import {PreferencesContext} from "../context/PreferenceProvider";


function Favoris() {
    const [favorites, setFavorites] = useState([]);


    const [basketItems, setBasketItems] = useState([]);


    const {darkMode, setDarkMode } = useContext(PreferencesContext)

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        setDarkMode(savedDarkMode === 'true');
    }, []);



    const addToBasket = (item) => {
        const existingItem = basketItems.find(basketItem => basketItem.item.id === item.id);
        if (existingItem) {
            setBasketItems(basketItems.map(basketItem =>
                basketItem.item.id === item.id
                    ? { ...basketItem, count: basketItem.count + 1 }
                    : basketItem
            ));
        } else {
            setBasketItems([...basketItems, { item, count: 1 }]);
        }
    };


    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
        if (savedFavorites) {
            setFavorites(savedFavorites);
        }
    }, []);

    return (
        <div className={`min-h-screen ${darkMode ? "bg-darkGreen text-white" : "bg-white text-black"}`}>
            <Header/>
            <div className="flex justify-center py-10">
                <div
                    className={`w-3/4  p-6 rounded-lg ${darkMode ? "bg bg-darkGreyGreen shadow-lg" : "border shadow-xl"}"`}>
                    <h2 className="text-2xl font-semibold mb-4 text-center">Mes favoris</h2>
                    <div className="flex">
                        {favorites.length > 0 ? (
                            favorites.map((item, index) => (
                                <ItemCard key={index} item={item} favorites={favorites} setFavorites={setFavorites} addToBasket={addToBasket}/>
                            ))
                        ) : (
                            <div  className={"text-center text-4xl"}>Vous n'avez pas encore de favoris.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Favoris;