import React, {useContext, useEffect, useState} from "react";
import Header from "../components/organism/Header";

function History() {
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const fetchOrders = async () => {
                await fetch('http://localhost:3000/orders')
                    .then(response => response.json())
                    .then(data => {
                        setOrders(data)
                    })
                    .catch((error) =>  {
                        console.error('Erreur lors de la récupération des commandes:', error);
                    });
        };

        fetchOrders();
    }, []);


    return(
        <div>
            <Header/>
            <div className="container mx-auto p-8">
                <h1 className="text-2xl font-bold mb-4">Historique des commandes</h1>
            </div>
        </div>
    )
}

export default History;
