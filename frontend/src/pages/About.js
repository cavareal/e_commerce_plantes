import React from 'react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/organism/Header';
import brandName from "../assets/logo/LogoLeafName-removebg.png";

function About() {

    useEffect(() => {
        AOS.init({
            duration: 1200, // Durée de l'animation en millisecondes
        });
    }, []);

    return (
        <div>
            <Header/>
            <div className="bg-white text-gray-800 p-8">
                <div className={"my-6"}  data-aos="fade-down">
                    <img src={brandName} alt="brandName" className="mx-auto w-[500px] h-auto"/>
                </div>
                <div className={"ml-[400px]"}>
                        {/* Section Histoire */}
                        <section className="mb-16">
                            <div className="flex flex-col lg:flex-row items-center">
                                <div className="lg:w-3/4" data-aos="fade-right">
                                    <h2 className="text-3xl font-bold text-green-500 mb-4">Notre Histoire</h2>
                                    <p className="text-lg leading-relaxed text-gray-700">
                                        Fondée en 2024, Monstera Deliciosa est née de la passion pour les plantes
                                        d'intérieur et la décoration.
                                        Nous croyons que les plantes ne sont pas seulement des éléments décoratifs,
                                        mais elles apportent également une touche de nature dans nos vies modernes.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Section Mission */}
                        <section className="mb-16">
                            <div className="flex flex-col-reverse lg:flex-row items-center">
                                <div className="lg:w-3/4" data-aos="fade-left">
                                    <h2 className="text-3xl font-bold text-green-500 mb-4">Notre Mission</h2>
                                    <p className="text-lg leading-relaxed text-gray-700">
                                        Nous nous efforçons d'offrir une large gamme de plantes d'intérieur de qualité,
                                        soigneusement sélectionnées pour s'adapter à tous les types d'intérieurs.
                                        Notre mission est de rendre la nature accessible à tous et d'encourager les gens
                                        à intégrer plus de verdure dans leur quotidien.
                                    </p>
                                </div>
                            </div>
                        </section>
                </div>

                {/* Section Équipe */}
                <section>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-green-500 mb-4" data-aos="fade-up">Rencontrez notre
                            Équipe</h2>
                        <p className="text-lg text-gray-700" data-aos="fade-up">
                            Une équipe de passionnés de plantes, dédiée à vous offrir les meilleures expériences
                            végétales.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" data-aos="fade-up">
                        {/* Ajoutez ici les images et descriptions des membres de l'équipe */}
                        <div className="text-center" data-aos="zoom-in">
                            {/*<img*/}
                            {/*    src="path_to_image/team_member1.jpg"*/}
                            {/*    alt="Membre équipe"*/}
                            {/*    className="rounded-full w-40 h-40 mx-auto shadow-lg"*/}
                            {/*/>*/}
                            <h3 className="text-xl font-semibold mt-4">Alice</h3>
                            <p className="text-gray-600">Designer végétal</p>
                        </div>
                        {/* Ajoutez d'autres membres ici */}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default About;
