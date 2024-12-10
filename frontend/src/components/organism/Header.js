import logo from "../../assets/logo/Logo-removebg.png";
import brandNameLight from "../../assets/logo/LogoName-removebg.png";
import brandNameDark from "../../assets/logo/LogoNameWhite.png";
import Button from "../atom/Button";
import { PreferencesContext } from '../../context/PreferenceProvider';
import { useContext, useEffect } from 'react';

const Navbar = () => {

    const {darkMode, setDarkMode} = useContext(PreferencesContext)

    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        setDarkMode(savedDarkMode === 'true');
    }, []);

    return (
        <header className={`"w-full ${darkMode ? "bg-darkGreyGreen text-white" : "bg-lightGrey"} sticky top-0 z-50 shadow-lg"`}>
            {/*<div className="">*/}
                <div className="relative -mx-4 flex w-full items-center justify-between">
                    <div className="w-50 max-w-full px-4">
                        <a href="/" className="w-full py-5 px-5 flex items-center">
                            <img
                                src={logo}
                                alt="logo"
                                className="h-20 w-20"
                            />
                            <img
                                src={darkMode ? brandNameDark : brandNameLight}
                                alt="brandName"
                                className="object-cover h-14 w-150"
                            />
                        </a>
                    </div>
                    <div className="flex w-full items-center justify-end px-10">
                        <nav>
                            <ul className="block lg:flex">
                                <ListItem NavLink="/">Home</ListItem>
                                <ListItem NavLink="/about">About</ListItem>
                                <ListItem NavLink="/preferences">Préférences</ListItem>
                                <ListItem NavLink="/history">Historique</ListItem>
                                <ListItem NavLink="/favoris">Favoris</ListItem>
                            </ul>
                        </nav>
                    </div>
                </div>
            {/*</div>*/}
        </header>
    );
};

export default Navbar;

const ListItem = ({ children, NavLink }) => {
    const {darkMode, setDarkMode } = useContext(PreferencesContext)
    return (
        <>
            <li>
                <a
                    href={NavLink}
                    className={`"flex py-2 text-base font-medium ${darkMode ? "text-white hover:text-white/75" : "text-primary hover:text-primary/60"}  lg:ml-12 lg:inline-flex"`}
                >
                    {children}
                </a>
            </li>
        </>
    );
};
