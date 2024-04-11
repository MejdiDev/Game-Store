import "../styles/css/aboutUsSection.css";
import InfoSection from "../utils/InfoSection"

const AboutUsSection = () => {
    return (
        <section id="about_us_section">
            <h1>About us</h1>

            <div id="img" style={{backgroundImage: "url('./about_us_bg.png')"}}></div>

            <InfoSection
                title="Key4GG: Your Gateway to Epic Gaming Adventures !"
                body={
                    <p>
                        Welcome to our online game shop, your trusted partner in the world of virtual entertainment. We offer a wide range of PC and console games to satisfy the most sophisticated array of games for all ages.
                        <br /><br />
                        Why us?
                        <br /><br />
                        A huge selection of games. We have the best games on the market for PC and consoles. Whether you're a fan of action, adventure, strategy or sports simulation, we offer a wide selection to satisfy your thirst for gaming entertainment.
                        <br /><br />
                        Bargain prices. We pride ourselves on offering our customers competitive prices. We have regular promotions and discounts, making your gaming fun even more affordable.
                        <br /><br />
                        A huge selection of games. We have the best games on the market for PC and consoles. Whether you're a fan of action, adventure, strategy or sports simulation, we offer a wide selection to satisfy your thirst for gaming entertainment.
                        <br /><br />
                        Bargain prices. We pride ourselves on offering our customers competitive prices. We have regular promotions and discounts, making your gaming fun even more affordable.
                    </p>
                }
            />
        </section>
    );
}

export default AboutUsSection;