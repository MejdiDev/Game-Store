import "../styles/css/dropdownMenu.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const menuTabs = [
    {
        label: "Steam",
        img: "PC.png"
    },

    {
        label: "Epic Games",
        img: "epic.svg"
    },

    {
        label: "Ubisoft",
        img: "ubisoft.svg"
    },

    {
        label: "PlayStation",
        img: "playstation.png"
    },

    {
        label: "Xbox",
        img: "xbox.png"
    },

    {
        label: "Nintendo",
        img: "switch.png"
    },

    {
        label: "softwares",
        img: "software.png"
    }
]

const DropdownMenu = ({ platform }) => {
    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (sliderRef.current) sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (sliderRef.current) sliderRef.current.swiper.slideNext();
    }, []);

    const showTab = () => {
        document.querySelector("body").style.overflowX = "hidden";
        document.getElementById('overlay_dropdown').style.display = "block";
        document.getElementById('overlay_dropdown').style.opacity = "0.8";
    }

    const hideTab = () => {
        document.querySelector("body").style.overflowX = "visible";
        document.getElementById('overlay_dropdown').style.opacity = "0";
        document.getElementById('overlay_dropdown').style.display = "none";
    }

    const navigate = useNavigate()
    const location = useLocation()

    const RedirectOnClick = (e, plt) => {
        if (!(location.pathname.includes('/game-list/'))) return

        e.preventDefault()

        document.querySelector("main").style.display = "none"
        navigate('/game-list/' + plt)
        navigate(0)
    }

    return (
        <div id="drop_menu_wrapper">
            <div id="drop_menu">
                    <div className="arrow" id="prev-arrow" onClick={handlePrev}>
                        <img src="./arrow_prev.png" alt="Prev" />
                    </div>

                   <Swiper
                    ref={sliderRef}
                    spaceBetween={40}
                    breakpoints={{
                        0: {
                            slidesPerView: 6
                        },

                        1300: {
                            slidesPerView: 5
                        },

                        1650: {
                            slidesPerView: 6
                        }
                    }}
                >
                    {
                        menuTabs.map((tab, idx) =>
                            <SwiperSlide key={`menu-tab-${idx}`}>
                                <div className={(platform && platform.toUpperCase() == tab.label.toUpperCase()) ? "active" : undefined} >
                                    <Link
                                        to={`/game-list/${tab.label}`}
                                        onClick={e => RedirectOnClick(e, tab.label)}
                                    >
                                        <img src={`./icons/${tab.img}`} />
                                        <p>{ tab.label.toUpperCase() }</p>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        )
                    }
                </Swiper>

                <div className="arrow" id="next-arrow" onClick={handleNext}>
                    <img src="./arrow_prev.png" alt="Next" />
                </div>
            </div>
        </div>
    )
}

export default DropdownMenu;