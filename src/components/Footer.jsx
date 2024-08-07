import "../styles/css/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <ul>
                <li>
                    <img className="logo" id="comp" src="./logo_2.png" alt="Logo" />

                    <div className="link_wrapper">
                        <img src="./icons/mail.png" alt="PC" />
                        <p>SOFTKey24@gmail.com</p>
                    </div>
                </li>

                <li className="li_seprt"></li>

                <li>
                    <h3>CATALOGUE</h3>
                    <div className="links">
                        <div className="link_wrapper">
                            <img src="./icons/PC.png" alt="PC" />
                            <p>PC</p>
                        </div>

                        <div className="link_wrapper">
                            <img src="./icons/playstation.png" alt="Playstation" />
                            <p>Playstation</p>
                        </div>

                        <div className="link_wrapper">
                            <img src="./icons/xbox.png" alt="Xbox" />
                            <p>Xbox</p>
                        </div>

                        <div className="link_wrapper">
                            <img src="./icons/switch.png" alt="Nintendo" />
                            <p>Nintendo</p>
                        </div>

                        <div className="link_wrapper">
                            <img src="./icons/gift_card.png" alt="Gift Cards" />
                            <p>Gift Cards</p>
                        </div>

                        <div className="link_wrapper">
                            <img src="./icons/software.png" alt="Software" />
                            <p>Software</p>
                        </div>

                        <div className="link_wrapper">
                            <img src="./icons/support.png" alt="Support" />
                            <p>Support</p>
                        </div>
                    </div>
                </li>

                <li className="li_seprt"></li>

                <li>
                    <h3>RESOURCES</h3>

                    <div className="links">
                        <Link to='/about'>
                            <p>About us</p>
                        </Link>
                        
                        <Link to='/blog'>
                            <p>Blog</p>
                        </Link>
                        
                        <Link to='/contact'>
                            <p>Contact us</p>
                        </Link>
                    </div>
                </li>

                <li className="li_seprt"></li>

                <li>
                    <h3>Payment Network</h3>
                    <div id="payement_method_wrapper">
                        <img src="./icons/stripe_3.png" alt="Powered By Stripe" />
                    </div>
                </li>
            </ul>
        </footer>
    );
}

export default Footer;