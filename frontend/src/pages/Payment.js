import React, { useEffect, useState } from "react";
import Button from "../components/atom/Button";
import Header from "../components/organism/Header";
import { useHistory } from 'react-router-dom';

const Payment = () => {
    const [basketItems, setBasketItems] = useState([]);

    const [paymentMethod, setPaymentMethod] = useState('card');

    const [discountCode, setDiscountCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const [userDetails, setUserDetails] = useState({
        fullName: '',
        address: '',
        email: '',
        city: '',
        postalCode: ''
    });

    const [errors, setErrors] = useState({
        fullName: '',
        address: '',
        email: '',
        city: '',
        postalCode: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value
        });
        setErrors({ ...errors, [name]: '' }); // Clear error message on change
    };

    const history = useHistory();
    const handlePayment = async (e) => {
        e.preventDefault();

        // Validation
        let newErrors = {};
        if (!userDetails.fullName) newErrors.fullName = "Veuillez entrer votre nom complet.";
        if (!userDetails.address) newErrors.address = "Veuillez entrer votre adresse.";
        if (!userDetails.city) newErrors.city = "Veuillez entrer votre ville.";
        if (!userDetails.postalCode) newErrors.postalCode = "Veuillez entrer votre code postal.";
        if (!userDetails.email) {
            newErrors.email = "Veuillez entrer votre email.";
        } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
            newErrors.email = "L'email est invalide.";
        }

        // Set errors and stop submission if any
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Construct order data
        const orderData = {
            customerName: "inconnu",
            orderDate: new Date().toISOString(),
            totalPrice: totalWithDiscount,
            orderItems: basketItems.map(basketItem => ({
                plantId: basketItem.item.id,
                quantity: basketItem.count,
                price: basketItem.item.onSale ? basketItem.item.price * (1 - basketItem.item.discount) : basketItem.item.price
            }))
        };


        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                // Clear the basket after successful payment
                setBasketItems([]);
                localStorage.setItem('basketItems', JSON.stringify([])); // Clear local storage

                // If no errors, redirect to confirmation page
                history.push({
                    pathname: '/confirmation',
                    state: {
                        userDetails,
                        basketItems,
                        totalWithDiscount
                    }
                });
            } else {
                console.error('Failed to create order');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('basketItems'));
        if (items) {
            setBasketItems(items);
        } else {
            setBasketItems([]); // Ensure basketItems is at least an empty array
        }
    }, []);

    const applyDiscountCode = () => {
        if (discountCode === 'CODE10') {
            setDiscount(0.1);
        } else {
            alert('Invalid discount code');
            setDiscount(0);
        }
    };

    const total = basketItems.reduce((acc, basketItem) => acc + (basketItem.item.onSale ? basketItem.item.price * (1 - basketItem.item.discount) : basketItem.item.price) * basketItem.count, 0);

    const totalWithDiscount = total * (1 - discount);

    return (
        <div>
            <Header />
            <div className="container mx-auto p-8">
                <h1 className="text-2xl font-bold mb-4">Récapitulatif de votre commande</h1>

                {/* Liste des articles dans le panier */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-4">
                    {basketItems.length === 0 ? (
                        <p className="text-gray-700">Votre panier est vide</p>
                    ) : (
                        basketItems.map((basketItem, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center border-b border-gray-200 py-4"
                            >
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

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold">Total: {totalWithDiscount.toFixed(2)}€</h2>
                    <div>
                        <input
                            type="text"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            placeholder="Discount code"
                        />
                        <button onClick={applyDiscountCode}>Apply</button>
                    </div>
                </div>

                {/* Formulaire de détails de l'utilisateur */}
                <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold mb-4">Informations de livraison</h2>
                    <form onSubmit={handlePayment}>
                        {/* Nom complet */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Nom complet</label>
                            <input
                                type="text"
                                name="fullName"
                                value={userDetails.fullName}
                                onChange={handleInputChange}
                                className={`w-full p-2 border ${errors.fullName ? 'border-red' : 'border-gray-300'} rounded-lg`}
                                placeholder="Votre nom complet"
                                required
                            />
                            {errors.fullName && <p className="text-red">{errors.fullName}</p>}
                        </div>

                        {/* Adresse */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Adresse</label>
                            <input
                                type="text"
                                name="address"
                                value={userDetails.address}
                                onChange={handleInputChange}
                                className={`w-full p-2 border ${errors.address ? 'border-red' : 'border-gray-300'} rounded-lg`}
                                placeholder="Votre adresse"
                                required
                            />
                            {errors.address && <p className="text-red">{errors.address}</p>}
                        </div>

                        {/* Ville et Code postal */}
                        <div className="flex justify-between mb-4">
                            <div className="w-1/2 mr-2">
                                <label className="block text-gray-700 mb-2">Ville</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={userDetails.city}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 border ${errors.city ? 'border-red' : 'border-gray-300'} rounded-lg`}
                                    placeholder="Ville"
                                    required
                                />
                                {errors.city && <p className="text-red">{errors.city}</p>}
                            </div>
                            <div className="w-1/2 ml-2">
                                <label className="block text-gray-700 mb-2">Code postal</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={userDetails.postalCode}
                                    onChange={handleInputChange}
                                    className={`w-full p-2 border ${errors.postalCode ? 'border-red' : 'border-gray-300'} rounded-lg`}
                                    placeholder="Code postal"
                                    required
                                />
                                {errors.postalCode && <p className="text-red">{errors.postalCode}</p>}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userDetails.email}
                                onChange={handleInputChange}
                                className={`w-full p-2 border ${errors.email ? 'border-red' : 'border-gray-300'} rounded-lg`}
                                placeholder="Votre email"
                                required
                            />
                            {errors.email && <p className="text-red">{errors.email}</p>}
                        </div>

                        <div>
                            <input type="radio" id="card" name="paymentMethod" value="card"
                                   checked={paymentMethod === 'card'}
                                   onChange={(e) => setPaymentMethod(e.target.value)}/>
                            <label htmlFor="card">Carte</label><br/>
                            <input type="radio" id="paypal" name="paymentMethod" value="paypal"
                                   checked={paymentMethod === 'paypal'}
                                   onChange={(e) => setPaymentMethod(e.target.value)}/>
                            <label htmlFor="paypal">PayPal</label><br/>
                        </div>

                        {/* Formulaire de paiement */}
                        {paymentMethod === 'card' ? (
                            <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold mb-4">Informations de paiement</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Nom sur la carte</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        placeholder="Nom complet"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Numéro de carte</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                        placeholder="1234 5678 9101 1121"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between mb-4">
                                    <div className="w-1/2 mr-2">
                                        <label className="block text-gray-700 mb-2">Date d'expiration</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                            placeholder="MM/AA"
                                            required
                                        />
                                    </div>
                                    <div className="w-1/2 ml-2">
                                        <label className="block text-gray-700 mb-2">CVV</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                            placeholder="123"
                                            required
                                        />
                                    </div>
                                </div>
                                <Button text="Confirmer le paiement" bgColor="primary" textColor="white"
                                        onClick={handlePayment}/>
                            </div>
                        ) : ("")}

                        {paymentMethod === "paypal" ? (
                            <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
                                <h2 className="text-xl font-bold mb-4">Informations de paiement PayPal</h2>
                                <Button text="Payer avec PayPal" bgColor="primary" textColor="white"
                                        onClick={handlePayment}/>
                            </div>
                        ) : ("")}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;
