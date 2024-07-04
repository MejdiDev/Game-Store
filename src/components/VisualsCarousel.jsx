import "../styles/css/visualsCarousel.css";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/effect-fade';

const images = [
    ""
]

const VisualsCarousel = () => {
    const hideGuideWindow = () => {
        document.getElementById('drop_menu_wrapper').style.zIndex = '999';

        document.getElementById('visual_carr_wrapper').classList.remove('active');
        document.getElementById('overlay_dropdown').style.opacity = "0";
    
        setTimeout(() => {
            document.getElementById('visual_carr_wrapper').style.display = "none";
            document.getElementById('overlay_dropdown').style.display = "none";
        }, 300);
        
        document.querySelector('body').style.overflowY = 'auto';
    }

    return (
        <section id="visual_carr_wrapper">
            <div id="visual_carr">
                <div onClick={hideGuideWindow} id="cross">
                    <img src="./icons/cross.svg" alt="Close" />
                </div>
                
                <div id="swiper_wrapper">

                    <Swiper
                        speed={500}
                        loop={true}
                        modules={[Autoplay]}
                        effect={"fade"}
                        spaceBetween={0}
                        grabCursor={true}
                        
                        centeredSlides={true}
                        slidesPerView={3}

                        autoplay={{
                            delay: 4000
                        }}
                    >
                        <SwiperSlide><div style={{backgroundImage: `url('./visuals_example/6.jpg')`}}></div></SwiperSlide>
                        <SwiperSlide><div style={{backgroundImage: `url('./visuals_example/7.jpg')`}}></div></SwiperSlide>
                        <SwiperSlide><div style={{backgroundImage: `url('./visuals_example/8.jpg')`}}></div></SwiperSlide>
                        <SwiperSlide><div style={{backgroundImage: `url('./visuals_example/9.jpg')`}}></div></SwiperSlide>
                        <SwiperSlide><div style={{backgroundImage: `url('./visuals_example/10.jpg')`}}></div></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default VisualsCarousel;