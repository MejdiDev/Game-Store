import { useEffect, useState } from 'react';
import '../styles/css/productAbout.css';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import 'swiper/css';
import '../styles/css/slider.css';
import { EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import moment from 'moment';

const FormDate = (dateStr) => {
    const formattedDate = moment(dateStr).format("D MMMM YYYY");
    return formattedDate;
}
const parseRequirements = (requirementString) => {
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
};

const SoftwareAbout = ({ game }) => {
    const [shownMore, setShownMore] = useState(false);
    useEffect(() => {
        if (game && game.systemRequirements && game.systemRequirements[0].requirement[0])
            parseRequirements(game.systemRequirements[0].requirement[0]);




    }, [game])

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

    return (
        <section id="about_product">
            {game && game.descriptions && game.descriptions.length > 0 && (
                <div className="section_wrapper" id="description">
                    <h1>Description</h1>

                    <div className="content_wrapper">
                        <div id="more_less_wrapper">
                            <div id="content_wrapper">
                                {game && game.descriptions && game.descriptions.length > 0 && game.descriptions.map((ctn, index) => {
                                    if (ctn.typeDesc === "Paragraph") {
                                        return (
                                            <div className="inline_image_wrapper right" key={index}>
                                                <div id="text">
                                                    <h1>{ctn.shortTitle}</h1>
                                                    <p>{ctn.shortDesc}</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                    if (ctn.typeDesc === "Image and Paragraph") {
                                        if (ctn.postionImage === "Left") {
                                            return (
                                                <div className="inline_image_wrapper left" key={index}>
                                                    <div id="text">
                                                        <h1>{ctn.shortTitle}</h1>
                                                        <p>{ctn.shortDesc}</p>
                                                    </div>
                                                    <div id="img" style={{ backgroundImage: `url('${ctn.image}')` }}></div>
                                                </div>
                                            );
                                        }
                                        if (ctn.postionImage === "Right") {
                                            return (
                                                <div className="inline_image_wrapper right" key={index}>
                                                    <div id="text">
                                                        <h1>{ctn.shortTitle}</h1>
                                                        <p>{ctn.shortDesc}</p>
                                                    </div>
                                                    <div id="img" style={{ backgroundImage: `url('${ctn.image}')` }}></div>
                                                </div>
                                            );
                                        }
                                    }
                                    return '';
                                })}


                            </div>

                            <div id="grad"></div>
                        </div>


                    </div>
                </div>
            )}


            {1 === 2 && (<div className="section_wrapper" id="visuals">
                <h1>Visuals</h1>

                <div id="images_wrapper">

                    {game.images?.screenshots && (
                        <div className="visuals_card">
                            <Swiper
                                speed={500}
                                loop={true}
                                modules={[Autoplay, EffectFade]}
                                effect={"fade"}
                                spaceBetween={20}
                                autoplay={{
                                    delay: 4000
                                }}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1
                                    }
                                }}
                            >
                                {/* Use a return statement within map to return the SwiperSlide component */}
                                {game.images?.screenshots.map((img, index) => (
                                    <SwiperSlide key={`swiperVsImAge${index}`}>
                                        <div style={{ backgroundImage: `url(${img.url})` }}></div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                        </div>
                    )}

                    {game.images?.screenshots[1]?.url && (<div className="visuals_card" style={{ backgroundImage: `url(${game.images?.screenshots[1].url})` }}></div>)}
                    {game.images?.screenshots[2]?.url && (<div className="visuals_card" style={{ backgroundImage: `url(${game.images?.screenshots[2].url})` }}></div>)}
                    {game.images?.screenshots[3]?.url && (<div className="visuals_card" style={{ backgroundImage: `url(${game.images?.screenshots[3].url})` }}></div>)}
                    {game.images?.screenshots[4]?.url && (<div className="visuals_card" style={{ backgroundImage: `url(${game.images?.screenshots[4].url})` }}></div>)}




                </div>
            </div>)}

            <div className="section_wrapper" id="overview">
                <h1>Overview</h1>

                <div className="content_wrapper">
                    {/*
                       <div>
                        <p>Languages</p>

                        <div id="flags_wrapper">
                            {
                                game.languages && [...new Set(game.languages)].map((cnt, idx) => (
                                    <span key={idx}>{cnt}</span>
                                ))
                            }
                        </div>
                             <div className="seperation"><span></span></div>
                    </div> */}




                    <div>
                        <p>Release Date</p>
                        <p>{FormDate(game.releaseDate)}</p>
                    </div>

                    <div className="seperation"><span></span></div>

                    <div>
                        <p>Developer</p>
                        <p>{game && game.developers && game.developers[0] ? game.developers[0] : (
                            game.developer ? game.developer : 'Unknown'
                        )}</p>
                    </div>

                    <div className="seperation"><span></span></div>

                    <div>
                        <p>Publisher</p>
                        <p>{game && game.publishers && game.publishers[0] ? game.publishers[0] : (
                            game.publisher ? game.publisher : 'Unknown'
                        )}</p>

                    </div>



                    {/*<div>
                       <div className="seperation"><span></span></div>
                        <p>Genres</p>

                        {game.genres && game.genres.map((genre, idx) =>
                            <div key={`game-genre-${idx}`}>
                                <img src={`./categories/${genre}.svg`} alt={genre} />
                                <p>{genre}</p>
                            </div>
                        )
                        }
                    </div> */}
                </div>
            </div>

        </section>
    );
}

export default SoftwareAbout;