import React, {useContext, useEffect} from "react";
import Button from '../atom/Button';
import ItemSmallCard from "../molecule/ItemSmallCard";
import {PreferencesContext} from "../../context/PreferenceProvider";


const Basket = ({basketItems, setBasketItems}) => {

    const {darkMode, setDarkMode} = useContext(PreferencesContext)

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        setDarkMode(savedDarkMode === 'true');
    }, []);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('basketItems'));
        if (items) {
            setBasketItems(items);
        } else {
            setBasketItems([]); // Ensure basketItems is at least an empty array
        }
    }, []);


    const total = basketItems.reduce((acc, basketItem) => acc + (basketItem.item.onSale ? basketItem.item.price* (1-basketItem.item.discount) : basketItem.item.price) * basketItem.count, 0);

    const removeFromBasket = (itemToRemove) => {
        const newBasketItems = basketItems.filter(basketItem => basketItem.item.id !== itemToRemove.id);
        setBasketItems(newBasketItems);
        localStorage.setItem('basketItems', JSON.stringify(newBasketItems));
    };


    const goToPaymentPage = () => {
        window.location.href = '/payment';
    };

    return (
        <div className={`p-4 ${darkMode ? "bg-darkSecondary" : "bg-secondary"}`}>
            {basketItems.map((basketItem, index) => (
                <ItemSmallCard item={basketItem.item} count={basketItem.count} key={index}
                               removeFromBasket={removeFromBasket}/>
            ))}
            <div className="my-4 sticky bottom-0 flex justify-center">
                <Button text={`Total: ${total}€`} bgColor={`${darkMode ? "secondary" : "primary"}`} textColor={`${darkMode ? "black" : "white"}`} onClick={goToPaymentPage}/>
            </div>

        </div>
    );
};

export default Basket;