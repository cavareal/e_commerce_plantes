import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Button from "../atom/Button";
import {InputDefault} from "../atom/InputDefault";
import {PreferencesContext} from "../../context/PreferenceProvider";

function UpdateItem (){

    const {darkMode, setDarkMode} = useContext(PreferencesContext)

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        setDarkMode(savedDarkMode === 'true');
    }, []);

    let {idArticle} = useParams();

    const [itemDetail, setItemDetail] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3000/${idArticle}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setItemDetail(data)
            })
            .catch((error) => {
                console.error('Erreur récupération du détail de la plante:', error);
            })
    }, [idArticle])

    useEffect(() => {
        fetch(`http://localhost:3000/${idArticle}`)
            .then((response) => response.json())
            .then((data) => {
                setItemDetail(data)
                setUpdatedItem(data);
            })
            .catch((error) => {
                console.error('Erreur récupération du détail de la plante:', error);
            })
    }, [idArticle])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedItem((prevItem) => ({
            ...prevItem, [name]: value
        }));
    };

    const handleUpdatePlant = () => {
        fetch(`http://localhost:3000/${idArticle}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(updatedItem)
        })
            .then(response => response.json())
            .then(data => {
                setItemDetail(data); // MAJ l'état avec les nouvelles données
                setIsEditing(false);
                window.location.reload();
            })
            .catch(error => console.error('Erreur lors de la requête PUT :', error)); };

    const [isEditing, setIsEditing] = useState(false);
    const [updatedItem, setUpdatedItem] = useState({
        name: '',
        cover: '',
        price: 0,
        comfort: 0,
        size: ''
    });

    return (
        <div className={`flex flex-col lg:flex-row items-center lg:items-start p-8 ${darkMode ? "bg-darkGrey text-white" : "bg-gray-50"} rounded-lg shadow-md max-w-4xl mx-auto mt-8`}>
            {!isEditing ? (
                <div className="justify-center">
                    <Button onClick={() => setIsEditing(true)} bgColor={`${darkMode ? "secondary" : "primary"}`} textColor={`${darkMode ? "black" : "white"}`} text={"Modifier le produit"}/>
                </div>
            ) : (
                <div>
                    <InputDefault
                        text="Nom"
                        name="name"
                        type="text"
                        value={updatedItem.name}
                        method={handleInputChange}
                    />
                    <InputDefault
                        text="Prix"
                        name="price"
                        type="number"
                        value={updatedItem.price}
                        method={handleInputChange}
                    />
                    <Button onClick={handleUpdatePlant} bgColor={`${darkMode ? "secondary" : "primary"}`} textColor={`${darkMode ? "black" : "white"}`} text={"Enregistrer"}/>
                    <Button onClick={() => setIsEditing(false)} bgColor={`${darkMode ? "white/60" : "lightGrey"}`} textColor={`${darkMode ? "white" : "black"}`}
                            text={"Annuler"}/>
                </div>
            )}
        </div>
    )

}

export default UpdateItem;