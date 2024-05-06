import { useState, useRef, useCallback } from 'react';

import GameCard from "./GameCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import '../styles/css/gameBuySlider.css';

window.addEventListener("resize", (event) => {
    document.querySelectorAll(".games_buy_slider #placeholder").forEach(el => {
        el.style.height = document.querySelector(".game_card #cover").style.height
    })
})

const GamesBuySlider = ({ title, id, className, games, platform, delay }) => {
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const handleRedirect = (e, platform, id) => {
        let trgt = e.target
        while(trgt.tagName != "DIV") {
            trgt = trgt.parentNode
        }

        if(trgt.getAttribute("favable") !== "true")
            (className == "gift_card") ? alert(id) : navigate(`/product/${platform}/${id}`)
    }

    return (
        <section id={id} className={`games_buy_slider ${className ? className : ""}`}>
            <div id="top">
                <h1>{ title }</h1>

                <button className="more_btn">
                    <p>See more</p>
                    <img src="./icons/see_more_arrow.png" alt="Arrow" />
                </button>
            </div>

            <div id="swiper_wrapper">
                <Swiper
                    ref={sliderRef}
                    slidesPerView={5}
                    speed={500}
                    loop={true}
                    grabCursor={true}
                    modules={[Autoplay]}

                    autoplay={{ delay }}

                    breakpoints= { (className == "gift_card") ?
                        {
                            0: {
                                slidesPerView: 1,
                                spaceBetween: 10
                            },

                            500: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
    
                            820: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            },
    
                            1100: {
                                slidesPerView: 4,
                                spaceBetween: 30
                            }
                        }

                        :

                        {
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
    
                            820: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            },
    
                            1100: {
                                slidesPerView: 4,
                                spaceBetween: 30
                            },
    
                            1390: {
                                slidesPerView: 5,
                                spaceBetween: 30
                            }
                        }
                    }

                    onSlideChangeTransitionStart={(slide) => {
                        document.querySelectorAll("#" + id + " .pags_wrapper div").forEach(el => {
                            if(el.id.replace(id + '-pag-','') === String(slide.realIndex)) el.classList.add("active")
                            else el.classList.remove("active")
                    })
                    }}
                >
                    {
                        games.map((game, index) =>
                            <SwiperSlide
                                key={`game-buy-slider-child-${index}`}
                                onClick={e => handleRedirect(e, platform, game.id)}
                            >
                                <GameCard game={ game } />
                            </SwiperSlide>
                        )
                    }
                </Swiper>
            </div>

            <div className="nav_wrapper">
                <div className="arrow" id="prev-arrow" onClick={handlePrev}>
                    <img src="./arrow_prev.png" alt="Prev" />
                </div>

                <div className="arrow" id="next-arrow" onClick={handleNext}>
                    <img src="./arrow_prev.png" alt="Next" />
                </div>
            </div>

            <div className="pags_wrapper">
                {Array.from({ length: games.length }, (_, i) => <div className={i == 0 ? "active" : ""} id={id + "-pag-" + i} key={i}></div>)}
            </div>

            <button className="more_btn mobl">
                <p>See more</p>
                <img src="./icons/see_more_arrow.png" alt="Arrow" />
            </button>
        </section>
    );
}

export default GamesBuySlider;