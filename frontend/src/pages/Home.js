import Header from '../components/organism/Header'
import Basket from '../components/organism/Basket'
import ShoppingList from '../components/organism/ShoppingList'
import {useContext, useEffect, useState} from "react";
import {PreferencesContext} from "../context/PreferenceProvider";

function Home() {

    const [basketItems, setBasketItems] = useState([]);

    const {darkMode, setDarkMode} = useContext(PreferencesContext)

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
        localStorage.setItem('basketItems', JSON.stringify(basketItems));
    };

    return (
        <div>
            <Header className="w-full"/>
            <div className="flex">
                <div className={`fixed shadow-lg h-full w-1/4 ${darkMode ? "bg-darkSecondary" : "bg-secondary"} overflow-auto`}>
                    <Basket basketItems={basketItems} setBasketItems={setBasketItems}/>
                </div>
                <div className={`w-3/4 ml-auto ${darkMode ? "bg-darkGreen" : "bg-white"} overflow-auto`}>
                    <ShoppingList addToBasket={addToBasket}/>
                </div>
            </div>
        </div>
    )
        ;
}

export default Home;
