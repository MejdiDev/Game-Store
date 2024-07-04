import { useState } from 'react';
import '../styles/css/productAbout.css';

import faved_games from "../data/faved_games.json";
import { shuffleArray } from '../utils/functions';
import GamesBuySlider from '../utils/GamesBuySlider';

import 'swiper/css';
import '../styles/css/slider.css';

import moment from 'moment';

const FormDate = (dateStr) => {
    const formattedDate = moment(dateStr).format("D MMMM YYYY");
    return formattedDate;
}


const ProductAbout = ({ game }) => {
    const [numFlagsShown, setNumFlagsShown] = useState(3)

    const parseRequirements = (requirementString) => {
        if (game.systemRequirements[0].requirement.length > 1) {
            const keyValuePairs = {};
            game.systemRequirements[0].requirement.forEach(entry => {
                const [key, value] = entry.split(':').map(item => item.trim());
                keyValuePairs[key] = value;
            });
            return keyValuePairs;
        } else {
            const requirementsArray = requirementString.split('\n').filter(Boolean); // Split by new line and remove empty strings
            const requirementsObject = {};

            requirementsArray.forEach((requirement, index) => {
                if (index === 0) {
                    requirementsObject.Minimum = requirement.replace("Minimum:", "").trim();
                } else {
                    const [key, value] = requirement.split(":").map(item => item.trim());
                    requirementsObject[key] = value;
                }
            });

            return requirementsObject;
        }


    };

    const [shownMore, setShownMore] = useState(false);


    const showMore = () => {

        const h = document.querySelector("#more_less_wrapper #content_wrapper").offsetHeight;
        document.getElementById("more_less_wrapper").style.height = String(h + 70) + "px";

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
                                {game.description}
                            </p>

                            <div className="inline_image_wrapper right">

                                <div id="text">
                                    <h1>Lorem ipsum dolor sit amet, consectetur</h1>
                                    <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod distinctio optio laboriosam. Rerum expedita numquam ducimus recusandae, consequatur voluptate alias a cupiditate error sed facere quis harum perferendis dolorum nemo!</p>
                                </div>

                                <div id="img" style={{ backgroundImage: `url('./about_us_bg.png')` }}></div>

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

                                <div id="img" style={{ backgroundImage: `url('./about_us_bg.png')` }}></div>

                            </div>
                        </div>

                        <div id="grad"></div>
                    </div>

                    {!shownMore ?
                        <button onClick={() => showMore()}>Show more</button> : <button onClick={() => showLess()}>Show less</button>
                    }
                </div>
            </div>

            <div className="section_wrapper" id="visuals">
                <h1>Visuals</h1>


                <div id="images_wrapper" onClick={showVisualCarr}>

                    <div className="visuals_card" style={{ backgroundImage: `url(${game.images.cover.url})` }}></div>
                    {game.images?.screenshots[0]?.url && (<div className="visuals_card" style={{ backgroundImage: `url(${game.images?.screenshots[0].url})` }}></div>)}
                    {game.images?.screenshots[1]?.url && (<div className="visuals_card" style={{ backgroundImage: `url(${game.images?.screenshots[1].url})` }}></div>)}
                    {game.images?.screenshots[2]?.url && (<div className="visuals_card" style={{ backgroundImage: `url(${game.images?.screenshots[2].url})` }}></div>)}
                    {game.images?.screenshots[3]?.url && (<div className="visuals_card" style={{ backgroundImage: `url(${game.images?.screenshots[3].url})` }}></div>)}
                    {game.images?.screenshots[4]?.url && (<div className="visuals_card" style={{ backgroundImage: `url(${game.images?.screenshots[4].url})` }}></div>)}

                </div>
            </div>

            <div className="section_wrapper" id="overview">
                <h1>Overview</h1>

                <div className="content_wrapper">
                    <div>
                        <p>Languages</p>


                        <div id="flags_wrapper">
                            {
                                game.languages && [...new Set(game.languages)].map((cnt, idx) => (
                                    (idx <= numFlagsShown) && <span key={`game-lang-flag-text-${idx}`}>{cnt}</span>
                                ))
                            }

                            {    
                                (game.languages && game.languages.length > numFlagsShown) && 
                                    <span id="see_more" onClick={() => setNumFlagsShown(999)}>
                                        + { game.languages.length - numFlagsShown }
                                    </span>
                            }
                        </div>
                    </div>

                    <div className="seperation"><span></span></div>

                    <div>
                        <p>Release Date</p>
                        <p>{FormDate(game.releaseDate)}</p>
                    </div>

                    <div className="seperation"><span></span></div>

                    <div>
                        <p>Developer</p>
                        <p>{game && game.developers && game.developers[0] ? game.developers[0] : 'Unknown'}</p>
                    </div>

                    <div className="seperation"><span></span></div>

                    <div>
                        <p>Publisher</p>
                        <p>{game && game.publishers && game.publishers[0] ? game.publishers[0] : 'Unknown'}</p>

                    </div>

                    <div className="seperation"><span></span></div>

                    <div>
                        <p>Genres</p>

                        {game.genres && game.genres.map((genre, idx) =>
                            <div key={`game-genre-${idx}`}>
                                <img src={
                                    `./categories/${
                                        genre.toLowerCase()
                                        .replaceAll("/", "")
                                        .replaceAll(" ", "-")
                                        .replaceAll("--", "-")
                                        
                                    }.svg`} alt={ genre }
                                />

                                <p>{genre}</p>
                            </div>
                        )
                        }
                    </div>
                </div>
            </div>

            {game && game.systemRequirements && game.systemRequirements[0] && (<div className="section_wrapper" id="requirements">
                <h1>System Requirements</h1>
                <div id="row_wrapper">
                    {game && game.systemRequirements && game.systemRequirements[0] && (
                        <div className="content_wrapper">
                            <h4>Minimum for {game.systemRequirements[0].system}</h4>

                            <div>
                                <p>Os</p>
                                <p>{parseRequirements(game.systemRequirements[0].requirement[0])["OS *"] ? parseRequirements(game.systemRequirements[0].requirement[0])["OS *"] : (parseRequirements(game.systemRequirements[0].requirement[0])["OS"] ? parseRequirements(game.systemRequirements[0].requirement[0])["OS"] : 'Unknown')}</p>
                            </div>

                            <div className="seperation"><span></span></div>

                            <div>
                                <p>Processor</p>
                                <p>{parseRequirements(game.systemRequirements[0].requirement[0])["Processor"] ? parseRequirements(game.systemRequirements[0].requirement[0])["Processor"] : (parseRequirements(game.systemRequirements[0].requirement[0])["CPU"] ? parseRequirements(game.systemRequirements[0].requirement[0])["CPU"] : 'Unknown')}</p>
                            </div>

                            <div className="seperation"><span></span></div>

                            <div>
                                <p>Memory</p>
                                <p>{parseRequirements(game.systemRequirements[0].requirement[0])["Memory"]}</p>
                            </div>

                            <div className="seperation"><span></span></div>

                            <div>
                                <p>Graphics</p>
                                <p>{parseRequirements(game.systemRequirements[0].requirement[0])["Graphics"] ? parseRequirements(game.systemRequirements[0].requirement[0])["Graphics"] : (parseRequirements(game.systemRequirements[0].requirement[0])["Video Card"] ? parseRequirements(game.systemRequirements[0].requirement[0])["Video Card"] : 'Uknown')}</p>
                            </div>

                            <div className="seperation"><span></span></div>

                            <div>
                                <p>Storage</p>
                                <p>{parseRequirements(game.systemRequirements[0].requirement[0])["Storage"] ? parseRequirements(game.systemRequirements[0].requirement[0])["Storage"] : (parseRequirements(game.systemRequirements[0].requirement[0])["HDD Space"] ? parseRequirements(game.systemRequirements[0].requirement[0])["HDD Space"] : 'Unknown')}</p>
                            </div>
                        </div>)}
                    {game && game.systemRequirements && game.systemRequirements[1] && (
                        <div className="content_wrapper">
                            <h4>Minimum for {game.systemRequirements[1].system}</h4>

                            <div>
                                <p>Os</p>
                                <p>{parseRequirements(game.systemRequirements[1].requirement[0])["OS *"] ? parseRequirements(game.systemRequirements[1].requirement[0])["OS *"] : (parseRequirements(game.systemRequirements[1].requirement[0])["OS"] ? parseRequirements(game.systemRequirements[1].requirement[0])["OS"] : 'Unkown')}</p>
                            </div>

                            <div className="seperation"><span></span></div>

                            <div>
                                <p>Processor</p>
                                <p>{parseRequirements(game.systemRequirements[1].requirement[0])["Processor"]}</p>
                            </div>

                            <div className="seperation"><span></span></div>

                            <div>
                                <p>Memory</p>
                                <p>{parseRequirements(game.systemRequirements[1].requirement[0])["Memory"]}</p>
                            </div>

                            <div className="seperation"><span></span></div>

                            <div>
                                <p>Graphics</p>
                                <p>{parseRequirements(game.systemRequirements[1].requirement[0])["Graphics"]}</p>
                            </div>

                            <div className="seperation"><span></span></div>

                            <div>
                                <p>Storage</p>
                                <p>{parseRequirements(game.systemRequirements[1].requirement[0])["Storage"]}</p>
                            </div>
                        </div>)}
                </div>



                <GamesBuySlider
                    id="similar_products_section"
                    title="Similar Products"
                    platform={"PC"}
                    games={shuffleArray(faved_games)}
                    delay={3000}

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

            </div>)}

        </section>
    );
}

export default ProductAbout;