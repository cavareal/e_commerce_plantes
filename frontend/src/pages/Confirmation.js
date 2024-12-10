import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/organism/Header";

const Confirmation = () => {
    const location = useLocation();
    const { userDetails, basketItems, totalWithDiscount } = location.state || {};

    return (
        <div>
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-2xl font-bold mb-4">Confirmation de votre commande</h1>
                {userDetails && (
                    <div className="mb-6">
                        <h2 className="text-xl font-bold">Détails du client</h2>
                        <p><strong>Nom complet:</strong> {userDetails.fullName}</p>
                        <p><strong>Adresse:</strong> {userDetails.address}</p>
                        <p><strong>Ville:</strong> {userDetails.city}</p>
                        <p><strong>Code postal:</strong> {userDetails.postalCode}</p>
                        <p><strong>Email:</strong> {userDetails.email}</p>
                    </div>
                )}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Récapitulatif de votre commande</h2>
                    {basketItems.length === 0 ? (
                        <p className="text-gray-700">Votre panier est vide</p>
                    ) : (
                        basketItems.map((basketItem, index) => (
                            <div key={index} className="flex justify-between items-center border-b border-gray-200 py-4">
                                <div className="flex items-center">
                                    <img
                                        src={basketItem.item.cover}
                                        alt={basketItem.item.name}
                                        className="w-16 h-16 object-cover rounded mr-4"
                                    />
                                    <div>
                                        <h2 className="font-bold text-lg">{basketItem.item.name}</h2>
                                        <p className="text-gray-700">Quantité: {basketItem.count}</p>
                                    </div>
                                </div>
                                <div className="flex-end">
                                    <p className={basketItem.item.onSale ? "line-through" : "font-bold"}>
                                        {basketItem.item.price}€
                                    </p>
                                    <p className="font-bold">
                                        {basketItem.item.onSale ? (basketItem.item.price * (1 - basketItem.item.discount)).toFixed(2) + "€" : ""}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <h2 className="text-xl font-bold mt-4">Total: {totalWithDiscount}€</h2>
            </div>
        </div>
    );
};

export default Confirmation;
