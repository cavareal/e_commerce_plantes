import Header from '../components/organism/Header'
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import Item from "../components/organism/Item";
import UpdateItem from "../components/molecule/UpdateItem";
import {PreferencesContext} from "../context/PreferenceProvider";


function Detail() {

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

    return (
        <div>
            <div className={`${darkMode ? "bg-darkGreen" : "bg-white"}`}>
                <Header className="w-full"/>
                <Item item={itemDetail}/>
                <UpdateItem/>
            </div>
        </div>
    )
}

export default Detail;