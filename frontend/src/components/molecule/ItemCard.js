import React, {useContext, useEffect, useState} from "react";
import Button from "../atom/Button";
import { Heart } from 'lucide-react';
import ButtonIcon from "../atom/ButtonIcon";
import {PreferencesContext} from "../../context/PreferenceProvider";


function ItemCard({ item, addToBasket, favorites, setFavorites }) {

    const {darkMode, setDarkMode} = useContext(PreferencesContext)

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        setDarkMode(savedDarkMode === 'true');
    }, []);



    const handleFavoriteClick = () => {
        let newFavorites;
        if (favorites.find(favoriteItem => favoriteItem.id === item.id)) {
            // Si l'élément est déjà dans les favoris, supprimez-le
            newFavorites = favorites.filter(favoriteItem => favoriteItem.id !== item.id);
        } else {
            // Sinon, ajoutez-le aux favoris
            newFavorites = [...favorites, item];
        }
        // Mettez à jour l'état et le localStorage
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    };

    const price = item.onSale ? item.price * (1-item.discount) : item.price;

    return (
        <div className={`m-4 ${darkMode ? "bg-darkGrey text-white" : "bg-white"} shadow-lg rounded-lg overflow-hidden max-w-xs relative transform hover:scale-105
        transition-transform duration-200`}>
            <div className={`text-xs font-bold uppercase ${item.onSale ? 'bg-red text-white' : darkMode ? "bg-darkGrey text-darkGreen" : "bg-white text-white"}`}>                    {item.onSale ? 'Promo !' : '-'}
            </div>

            <div className="p-4">
                <div className="flex justify-between gap-2">
                    <h2 className="font-bold text-lg mb-2 flex items-center mt-1">{item.name}</h2>
                    <ButtonIcon icon={<Heart strokeWidth={3} color={`${favorites.find(favoriteItem => favoriteItem.id === item.id) ? "#910100" : "grey"}`}/>}
                                bgColor={`${darkMode ? "black" : "lightGrey"}`}
                                onClick={handleFavoriteClick}/>
                </div>
                <a href={`/detail/${item.id}`}>
                    <div className="overflow-hidden">
                        <img src={item.cover} alt={item.name}
                             className="h-48 w-full object-cover mt-2"/>
                    </div>
                </a>
            <p className={`${darkMode ? "text-white/80" : "text-gray-700 "}`}>{item.size}</p>
                <div className={"flex flex-row gap-4"}>
                    <p className="font-bold">{item.onSale ? price.toFixed(2) + "€" : ""}</p>
                    <p className={item.onSale ? "line-through" : "font-bold"}>{item.price}€</p>
                </div>
            </div>
            <div className=" flex justify-center pb-2">
                <Button text="Ajouter au panier" bgColor={`${darkMode ? "secondary" : "primary"}`}
                        textColor={`${darkMode ? "black" : "white"}`}
                        onClick={() => addToBasket(item)}/>
            </div>
        </div>
    );
}

export default ItemCard;