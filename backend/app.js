const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reactapp',
});

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

connection.connect(err => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err);
    } else {
        console.log('Connexion à MySQL réussie !');
    }
});

app.get('/', (req, res, next) => {
    connection.query('SELECT * FROM plants', (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête SELECT :', error);
            res.status(500).json({ error: 'Erreur serveur requête SELECT.' }); }
        else {
            res.status(200).json(results);}
    });
});


app.get('/orders', (req, res) => {
    const query = `
        SELECT 
            o.order_id AS orderId, 
            o.customer_name AS customerName, 
            o.order_date AS orderDate, 
            o.total_price AS totalPrice,
            od.plant_id AS plantId, 
            od.quantity, 
            od.price, 
            p.name AS plantName, 
            p.cover AS plantCover
        FROM orders o
        JOIN order_details od ON o.order_id = od.order_id
        JOIN plants p ON od.plant_id = p.id
        ORDER BY o.order_date DESC
    `;

    connection.query(query, (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to fetch orders' });
        }

        // Group orders by orderId
        const orders = results.reduce((acc, curr) => {
            const orderIndex = acc.findIndex(order => order.orderId === curr.orderId);
            const plant = {
                plantId: curr.plantId,
                plantName: curr.plantName,
                plantCover: curr.plantCover,
                quantity: curr.quantity,
                price: curr.price
            };

            if (orderIndex > -1) {
                acc[orderIndex].plants.push(plant);
            } else {
                acc.push({
                    orderId: curr.orderId,
                    customerName: curr.customerName,
                    orderDate: curr.orderDate,
                    totalPrice: curr.totalPrice,
                    plants: [plant]
                });
            }

            return acc;
        }, []);

        res.status(200).json(orders);
    });
});

app.get('/:id', (req, res, next) => {
    const itemId = req.params.id;
    connection.query('SELECT * FROM plants WHERE id = ?', [itemId],
        (error, results) => {
            if (error) {
                console.error('Erreur lors de la requête SELECT :', error);
                res.status(500).json({ error: 'Erreur serveur lors de la requête SELECT.' });
                } else {
                    if (results.length > 0) {
                    // Si des résultats sont trouvés, renvoyer le 1er élément (le vêtement trouvé)
                        res.status(200).json(results[0]);
                    } else {
                    // Si aucun résultat trouvé, renvoyer une réponse 404
                        res.status(404).json({ error: 'Aucune plante trouvé avec cet ID. /:id' });
                        }
                    } });});

            app.use((req, res, next) => {
    console.log('Requête reçue !');
    next();
});

app.put('/:id', (req, res, next) => {
    const itemId = req.params.id;
    const updatedItemData = req.body;
    connection.query('UPDATE plants SET ? WHERE id = ?',
        [updatedItemData, itemId], (error, results) => {
            if (error) {
                console.error('Erreur lors de la requête UPDATE :', error);
                res.status(500).json({ error: 'Erreur serveur lors de la requête UPDATE.' });
                } else {
                    if (results.affectedRows > 0) {
                        // Renvoie les données mises à jour
                        res.status(200).json(updatedItemData);
                    } else {
                        res.status(404).json({ error: 'Aucune plante trouvé avec cet ID.' });
                        }
                    }
}); });

app.post('/', (req, res, next) => {
    const newItemData = req.body;
    connection.query('INSERT INTO plants SET ?', [newItemData], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête INSERT :', error);
            res.status(500).json({error: 'Erreur serveur lors de la requête INSERT.'});
        } else {
            connection.query('SELECT * FROM plants WHERE id = ?', [results.insertId], (error, records) => {
                if (error) {
                    console.error('Erreur lors de la requête SELECT :', error);
                    res.status(500).json({error: 'Erreur serveur lors de la requête SELECT.'});
                } else {
                    res.status(201).json(records[0]);
                }
            });
        }
    })
});

app.post('/orders', (req, res) => {
    const { customerName, orderDate, totalPrice, orderItems } = req.body;

    connection.query(
        'INSERT INTO orders (customer_name, order_date, total_price) VALUES (?, ?, ?)',
        [customerName, orderDate, totalPrice],
        (error, results) => {
            if (error) {
                return res.status(500).json({ error: 'Failed to create order' });
            }

            const orderId = results.insertId;

            const orderDetails = orderItems.map(item => [orderId, item.plantId, item.quantity, item.price]);

            connection.query(
                'INSERT INTO order_details (order_id, plant_id, quantity, price) VALUES ?',
                [orderDetails],
                (error) => {
                    if (error) {
                        return res.status(500).json({ error: 'Failed to add order details' });
                    }

                    res.status(200).json({ message: 'Order created successfully' });
                }
            );
        }
    );
});



app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !'
    });
});

module.exports = app;
