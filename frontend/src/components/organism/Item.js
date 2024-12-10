import React, {useContext, useEffect, useState} from "react";
import {PreferencesContext} from "../../context/PreferenceProvider";

function Item ({ item }) {

    const {darkMode, setDarkMode} = useContext(PreferencesContext)

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        setDarkMode(savedDarkMode === 'true');
    }, []);

    const price = item.onSale ? item.price * (1-item.discount) : item.price;

    return (
      <div
          className={`flex flex-col lg:flex-row items-center lg:items-start p-8 ${darkMode ? "bg-darkGrey text-white" : "bg-gray-50"} rounded-lg shadow-md max-w-4xl mx-auto mt-8`}>
          <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <img
                  src={item.cover}
                  alt={item.name}
                  className="w-full h-auto rounded-lg transform transition-transform duration-300 hover:scale-105"
              />
          </div>

          <div className="w-full lg:w-1/2 lg:pl-8 text-left">
              <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
              <div className={"flex text-xl flex-row flex-start gap-4 mb-4"}>
                  <p className="font-bold">{item.onSale ?  "€" + price.toFixed(2) : ""}</p>
                  <p className={item.onSale ? "line-through" : "font-bold"}>€{item.price}</p>
              </div>
              <p className={`text-xl font-semibold ${darkMode ? "text-white/80" : "text-gray-700"} mb-4`}>Taille: {item.size}</p>
              <p className={`text-xl font-semibold ${darkMode ? "text-white/80" : "text-gray-700"} mb-4`}>Type: {item.lightRequirement}</p>
              <h3 className={`text-xl font-semibold ${darkMode ? "text-white/80" : "text-gray-700"} mb-4`}>Description</h3>
              <p className={`${darkMode ? "text-white/80" : "text-gray-700"} mb-4`}>{item.description}</p>

          </div>
      </div>
    )
}

export default Item;