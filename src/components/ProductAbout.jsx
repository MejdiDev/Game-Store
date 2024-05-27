import { useState } from 'react';
import '../styles/css/productAbout.css';

import faved_games from "../data/faved_games.json";
import { shuffleArray } from '../utils/functions';
import GamesBuySlider from '../utils/GamesBuySlider';

const ProductAbout = ({ game }) => {
    const [shownMore, setShownMore] = useState(false);

    const showMore = () => {
        const h = document.querySelector("#more_less_wrapper #content_wrapper").offsetHeight;
        document.getElementById("more_less_wrapper").style.height = String(h + 10) + "px";

        document.querySelector("#more_less_wrapper #grad").style.display = "none";

        setShownMore(true)
    }

    const showLess = () => {
        document.querySelector("#more_less_wrapper #grad").style.display = "block";
        document.getElementById("more_less_wrapper").style.height = "200px";

        setShownMore(false)
    }

    const showVisualCarr = () => {
        document.getElementById('drop_menu_wrapper').style.zIndex = '997';

        document.getElementById('overlay_dropdown').style.display = "block";
        document.getElementById('visual_carr_wrapper').style.display = "flex";
        
        setTimeout(() => {
            document.getElementById('overlay_dropdown').style.opacity = "0.7";
            document.getElementById('visual_carr_wrapper').classList.add('active');
        }, 1);

        document.querySelector('body').style.overflowY = 'hidden';
    }

    return (
        <section id="about_product">
            <div className="section_wrapper" id="description">
                <h1>Product description</h1>

                <div className="content_wrapper">
                    <div id="more_less_wrapper">
                        <div id="content_wrapper">
                            <p>
                                Battlefield™ 2042 is a first-person shooter that marks the return to the iconic all-out warfare of the franchise. With the help of a cutting-edge arsenal, you can engage in intense, immersive multiplayer battles.
                                <br /><br />
                                It’s all or nothing in Battlefield™ 2042 – Season 7: Turning Point<br /><br />
                                Do whatever it takes in Season 7: Turning Point, which brings the battle for Earth’s most valuable resource to the Atacama Desert in Chile. There’s no holding back for your squad as you engage in lawless, suburban combat on the new map Haven and revisit a returning fan-favorite front: Stadium. Use destruction as your ally and give the enemy everything you’ve got with new gear like the SCZ-3 SMG, the Predator SRAW gadget, and the XFAD-4 Draugr aerial bomber*. Unlock 100 new tiers of Battle Pass content in a battle for ultimate power.
                            </p>

                            <div className="inline_image_wrapper right">
                                <div id="text">
                                    <h1>Lorem ipsum dolor sit amet, consectetur</h1>
                                    <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod distinctio optio laboriosam. Rerum expedita numquam ducimus recusandae, consequatur voluptate alias a cupiditate error sed facere quis harum perferendis dolorum nemo!</p>
                                </div>
                                
                                <div id="img" style={{backgroundImage: `url('./about_us_bg.png')`}}></div>
                            </div>

                            <p>
                                <br /><br />
                                Lead your team to victory in both large, all-out warfare and close-quarters combat on maps from the world of 2042 and classic Battlefield titles. Find your playstyle in class-based gameplay and take on several experiences, including elevated versions of Conquest and Breakthrough. Explore Battlefield Portal, a platform where players can discover, create, and share unexpected battles from Battlefield's past and present.
                            </p>

                            <div className="inline_image_wrapper left">
                                <div id="text">
                                    <h1>Lorem ipsum dolor sit amet, consectetur</h1>
                                    <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod distinctio optio laboriosam. Rerum expedita numquam ducimus recusandae, consequatur voluptate alias a cupiditate error sed facere quis harum perferendis dolorum nemo!</p>
                                </div>
                                 
                                <div id="img" style={{backgroundImage: `url('./about_us_bg.png')`}}></div>
                            </div>
                        </div>

                        <div id="grad"></div>
                    </div>

                    { !shownMore ?
                        <button onClick={() => showMore()}>Show more</button> : <button onClick={() => showLess()}>Show less</button>
                    }
                </div>
            </div>

            <div className="section_wrapper" id="visuals">
                <h1>Visuals</h1>

                <div id="images_wrapper" onClick={showVisualCarr}>
                    <div className="visuals_card" style={{backgroundImage: `url('./visuals_example/6.jpg')`}}></div>
                    <div className="visuals_card" style={{backgroundImage: `url('./visuals_example/1.jpg')`}}></div>
                    <div className="visuals_card" style={{backgroundImage: `url('./visuals_example/2.jpg')`}}></div>
                    <div className="visuals_card" style={{backgroundImage: `url('./visuals_example/3.jpg')`}}></div>
                    <div className="visuals_card" style={{backgroundImage: `url('./visuals_example/4.jpg')`}}></div>
                </div>
            </div>

            <div className="section_wrapper" id="overview">
                <h1>Overview</h1>

                <div className="content_wrapper">
                    <div>
                        <p>Languages</p>
                        
                        <div id="flags_wrapper">
                            {
                                game.langs && game.langs.map((cnt, idx) =>
                                    <div key={`game-lang-flag-${idx}`} className="flag" style={{backgroundImage: `url('https://flagsapi.com/${cnt}/flat/64.png')`}}></div>
                                )
                            }
                        </div>
                    </div>

                    <div className="seperation"><span></span></div>

                    <div>
                        <p>Release Date</p>
                        <p>08.02.2024</p>
                    </div>

                    <div className="seperation"><span></span></div>

                    <div>
                        <p>Developer</p>
                        <p>Arrowhead Game Studios AB</p>
                    </div>

                    <div className="seperation"><span></span></div>

                    <div>
                        <p>Publisher</p>
                        <p>PlayStation PC LLC</p>
                    </div>

                    <div className="seperation"><span></span></div>

                    <div>
                        <p>Genres</p>
                        
                        {   game.genres && game.genres.map((genre, idx) => 
                                <div key={`game-genre-${idx}`}>
                                    <img src={`./categories/${genre}.svg`} alt={genre} />
                                    <p>{ genre }</p>
                                </div>    
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="section_wrapper" id="requirements">
                <h1>System Requirements</h1>

                <div id="row_wrapper">
                    <div className="content_wrapper">
                        <h4>Minimum</h4>

                        <div>
                            <p>Os</p>
                            <p>Windows 10</p>
                        </div>

                        <div className="seperation"><span></span></div>

                        <div>
                            <p>Processor</p>
                            <p>Intel Core i7-4790K or AMD Ryzen 5 1500X</p>
                        </div>

                        <div className="seperation"><span></span></div>

                        <div>
                            <p>Memory</p>
                            <p>8 GB RAM</p>
                        </div>

                        <div className="seperation"><span></span></div>

                        <div>
                            <p>Graphics</p>
                            <p>NVIDIA GeForce GTX 1050 Ti or AMD Radeon RX 470</p>
                        </div>

                        <div className="seperation"><span></span></div>

                        <div>
                            <p>Storage</p>
                            <p>100 GB available space</p>
                        </div>
                    </div>

                    <div className="content_wrapper">
                        <h4>Recommended</h4>
                        
                        <div>
                            <p>Os</p>
                            <p>Windows 10</p>
                        </div>

                        <div className="seperation"><span></span></div>

                        <div>
                            <p>Processor</p>
                            <p>Intel Core i7-9700K or AMD Ryzen 7 3700X</p>
                        </div>

                        <div className="seperation"><span></span></div>

                        <div>
                            <p>Memory</p>
                            <p>16 GB RAM</p>
                        </div>

                        <div className="seperation"><span></span></div>

                        <div>
                            <p>Graphics</p>
                            <p>NVIDIA GeForce RTX 2060 or AMD Radeon RX 6600XT</p>
                        </div>

                        <div className="seperation"><span></span></div>

                        <div>
                            <p>Storage</p>
                            <p>100 GB available space</p>
                        </div>
                    </div>
                </div>
            </div>

            <GamesBuySlider
                id="similar_products_section"
                title="Similar Products"
                platform={ "" }
                games={ shuffleArray(faved_games) }
                delay={ 3000 }

                custombreak={
                    {
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },

                        850: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }
                }
            />
        </section>
    );
}

export default ProductAbout;