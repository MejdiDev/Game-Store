import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

import 'swiper/css';

import '../styles/css/slider.css';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Slider = ({ games, platform }) => {
    const [selGame, setSelGame] = useState(games[0])
    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (sliderRef.current) sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (sliderRef.current) sliderRef.current.swiper.slideNext();
    }, []);

    useEffect(() => {
        setInterval(() => {
            if(!document.getElementById("slider_section")) return;

            try {
                let idx = sliderRef.current.swiper.realIndex

                if(!document.getElementById("main-pag-" + idx).classList.contains('active')) {
                    setSelGame(games[idx])

                    document.querySelectorAll("#slider_section .pags_wrapper div").forEach(el => {
                        if(el.id.replace('main-pag-','') === String(idx)) el.classList.add("active")
                        else el.classList.remove("active")
                    })
                }
            }

            catch {
                console.log("error !")
            }
        }, 10)
    }, [])

  return (
    <section id="slider_section">
    <div id="swiper_wrapper">
        <Swiper
            ref={sliderRef}
            centeredSlides={true}
            speed={500}
            loop={true}
            grabCursor={true}
            modules={[Autoplay]}

            autoplay={{
                delay: 4000
            }}

            breakpoints= {{
                0: {
                    slidesPerView: 1
                },

                500: {
                    slidesPerView: 3
                },

                970: {
                    slidesPerView: 5
                }
            }}
        >
            {
                games.map((game, index) =>
                    <SwiperSlide key={`main-game-slider-child-${index}`}>
                        <Link to={`/product/${platform}/${game.id}`}>
                            <div style={{backgroundImage: `url(./game_covers/${game.cover})`}} className="slider_child">
                                {game.is_discounted && <div id="disc_perc">-{ game.discount_perc }%</div>}
                            </div>
                        </Link>
                    </SwiperSlide>
                )
            }
        </Swiper>

        <div className="nav_wrapper">
            <div className="arrow" id="prev-arrow" onClick={handlePrev}>
                <img src="./arrow_prev.png" alt="Prev" />
            </div>

            <div className="arrow" id="next-arrow" onClick={handleNext}>
                <img src="./arrow_prev.png" alt="Next" />
            </div>
        </div>
      </div>

      <div className="pags_wrapper">
        {Array.from({ length: games.length }, (_, i) => <div className={i === 0 ? "active" : ""} id={"main-pag-" + i} key={i}></div>)}
      </div>

      <h1 id="title">{ selGame.title }</h1>
      <div id="platforms_wrapper">
        <h3>Platforms: </h3>
        <span id="platforms">
            {
                selGame.platforms.map((plt, idx) => 
                    <p key={`game-main-platform-${idx}`}>{plt}</p>
                )
            }
        </span>
      </div>
    </section>
  );
}

export default Slider;