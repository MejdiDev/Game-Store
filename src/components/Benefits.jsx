import "../styles/css/benefits.css";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules";

import 'swiper/css';

const blog_data = [
    {
        img: "./game_covers/hogwarts_legacy.jpg",
        description: "Welcome to our online game shop, your trusted partner in the world of virtual entertainment. We offer a wide range of PC and console games to satisfy the most sophisticated array of games for all ages."
    },

    {
        img: "./game_covers/hogwarts_legacy.jpg",
        description: "Welcome to our online game shop, your trusted partner in the world of virtual entertainment. We offer a wide range of PC and console games to satisfy the most sophisticated array of games for all ages."
    },

    {
        img: "./game_covers/hogwarts_legacy.jpg",
        description: "Welcome to our online game shop, your trusted partner in the world of virtual entertainment. We offer a wide range of PC and console games to satisfy the most sophisticated array of games for all ages."
    },

    {
        img: "./game_covers/hogwarts_legacy.jpg",
        description: "Welcome to our online game shop, your trusted partner in the world of virtual entertainment. We offer a wide range of PC and console games to satisfy the most sophisticated array of games for all ages."
    },

    {
        img: "./game_covers/hogwarts_legacy.jpg",
        description: "Welcome to our online game shop, your trusted partner in the world of virtual entertainment. We offer a wide range of PC and console games to satisfy the most sophisticated array of games for all ages."
    },

    {
        img: "./game_covers/hogwarts_legacy.jpg",
        description: "Welcome to our online game shop, your trusted partner in the world of virtual entertainment. We offer a wide range of PC and console games to satisfy the most sophisticated array of games for all ages."
    },

    {
        img: "./game_covers/hogwarts_legacy.jpg",
        description: "Welcome to our online game shop, your trusted partner in the world of virtual entertainment. We offer a wide range of PC and console games to satisfy the most sophisticated array of games for all ages."
    }
]

const BlogCard = ({ idx, blog_data }) => {
    return (
        <div className="benefit_card">
            <h1>0{ idx + 1 }</h1>
            
            <div id="background" style={{backgroundImage: `url(${blog_data.img})`}}></div>
            <p>{ blog_data.description }</p>
        </div>
    );
}

const Benefits = () => {
    return (
        <section id="benefits_section">
            <Swiper
                speed={500}
                loop={true}
                grabCursor={true}
                modules={[Autoplay]}
                spaceBetween={40}

                autoplay={{
                    delay: 4000
                }}

                breakpoints= {{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },

                    530: {
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
                }}
            >
                {
                    blog_data.map((data, idx) =>
                        <SwiperSlide key={`blog-slide-${idx}`}><BlogCard idx={idx} blog_data={data} /></SwiperSlide>
                    )
                }
            </Swiper>
        </section>
    );
}

export default Benefits;