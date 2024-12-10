import Header from "../components/organism/Header";
import {useEffect, useContext } from 'react';
import {PreferencesContext} from "../context/PreferenceProvider";


function Preferences() {
    const {darkMode, setDarkMode } = useContext(PreferencesContext)

    const handleToggle = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode);
    };
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        setDarkMode(savedDarkMode === 'true');
    }, []);

    return (
        <div className={`min-h-screen ${darkMode ? "bg-darkGreen text-white" : "bg-white text-black"}`}>
            <Header className="w-full" />
            <div className="flex justify-center py-10">
                <div className={`w-full max-w-md p-6 rounded-lg ${darkMode ?"bg bg-darkGreyGreen shadow-lg" : "border shadow-xl"}"`}>
                    <h2 className="text-2xl font-semibold mb-4 text-center">Preferences</h2>

                    <div className={`flex items-center justify-between py-3 "`}>
                        <span className="text-lg">Dark Mode</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={darkMode}
                                    onChange={handleToggle}
                                />
                                <div
                                    className="w-11 h-6 bg-secondary peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-lightGrey
                                    rounded-full peer-checked:after:translate-x-5 peer-checked:after:border-secondary after:content-['']
                                    after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-lightGrey after:border
                                    after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-darkGreen"></div>
                            </label>

                        </label>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Preferences;
