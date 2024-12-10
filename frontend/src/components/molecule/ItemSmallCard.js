import React, {useContext, useEffect} from "react";
import {Trash2} from "lucide-react";
import ButtonIcon from '../atom/ButtonIcon';
import {PreferencesContext} from "../../context/PreferenceProvider";

function ItemSmallCard({ item, count, removeFromBasket }) {

    const {darkMode, setDarkMode} = useContext(PreferencesContext)

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        setDarkMode(savedDarkMode === 'true');
    }, []);

    const price = item.onSale ? item.price * (1-item.discount) : item.price;

    return (
        <div className={`mb-4 ${darkMode ? "bg-darkGrey text-white" : "bg-white"} shadow-lg p-4 rounded-lg flex items-center justify-between transform hover:scale-105 transition-transform duration-200`}>
            <div className="flex items-center">
                <img src={item.cover} alt={item.name} className="w-16 h-16 mr-4 rounded-lg "/>
                <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <div className={"flex flex-row gap-4"}>
                        <p>Prix :</p>
                        <p className="font-bold">{item.onSale ? price.toFixed(2) + "€" : ""}</p>
                        <p className={item.onSale ? "line-through" : "font-bold"}>{item.price}€</p>
                    </div>
                    <p>Quantité: {count}</p>
                </div>
            </div>
            <div className="">
                <ButtonIcon icon={<Trash2 color={`${darkMode ? "#FFFFFF" : "#4d4d4d"}`}/>} bgColor={`${darkMode ? "darkGrey" : "lightGrey"}`} onClick={() => removeFromBasket(item)}/>
            </div>
        </div>
    );
}

export default ItemSmallCard;