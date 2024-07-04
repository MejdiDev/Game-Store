import { useEffect, useState } from 'react';
import '../styles/css/mobileNav.css';

import { updateCartPrices } from "../data/handle_cart";

import { Link, useLocation, useNavigate } from 'react-router-dom';


const hideMobileNav = () => {
    const filterMenu = document.querySelector('.filter_wrapper');

    document.getElementById('mobileNavbar').classList.remove('active');
    document.getElementById('overlay').style.opacity = "0";
    if (filterMenu) filterMenu.classList.remove("slid_into_view");

    setTimeout(() => {
        if (document.getElementById('mobileNavbar'))
            document.getElementById('mobileNavbar').style.display = "none";

        if (filterMenu) filterMenu.classList.add("mobl_hidden");
        if (document.getElementById('overlay'))
            document.getElementById('overlay').style.display = "none";
    }, 400);
    document.querySelector('body').classList.remove('hidden');
}

const MobileNav = () => {

    const [currency, setCurrency] = useState(null);
    useEffect(() => {
        const localStorageCurrency = localStorage.getItem('currency');
        if (localStorageCurrency != "Eur" && localStorageCurrency != "Usd" && localStorageCurrency != "Pln" && localStorageCurrency != "Gbp") {
            localStorage.setItem("currency", "Eur");

        }
        setCurrency(localStorage.getItem('currency'));

    }, []);
    const handleChange = (e) => {
        localStorage.setItem("currency", e.target.value);
        setCurrency(e.target.value);
        window.dispatchEvent(new Event('storage'));
        updateCartPrices();
        window.location.reload();
    }

    const navigate = useNavigate()
    const location = useLocation()

    const RedirectOnClick = (e, plt) => {
        if (!(location.pathname.includes('/game-list/'))) return

        e.preventDefault()
        navigate('/game-list/' + plt)
        navigate(0)
    }


    return (
        <div id="mobileNavbar">
            <div id="top">
                <div className="select_wrapper">
                    <select onChange={handleChange} value={currency}>
                        <option value="Eur">€ EUR</option>
                        <option value="Usd">$ USD</option>
                        <option value="Pln">zł PLN</option>
                        <option value="Gbp">£ GBP</option>
                    </select>
                    <img src="./icons/dropdown.png" alt="Arrow" />
                </div>

                <div onClick={hideMobileNav} id="cross">
                    <img src="./icons/cross.svg" alt="Close" />
                </div>
            </div>

            <ul>
                <li>
                    <Link
                        to='/game-list/Steam'
                        onClick={e => RedirectOnClick(e, 'Steam')}
                    >
                        <img src="./icons/PC.png" alt="PC" />
                        <p>STEAM</p>
                        <img src="./arrow_prev.png" alt="Arrow" />
                    </Link>
                </li>

                <li className="seperation"><span></span></li>

                <li className="active">
                    <Link
                        to='/game-list/PlayStation'
                        onClick={e => RedirectOnClick(e, 'PlayStation')}
                    >
                        <img src="./icons/playstation.png" alt="Playstation" />
                        <p>PLAYSTATION</p>
                        <img src="./arrow_prev.png" alt="Arrow" />
                    </Link>
                </li>

                <li className="seperation"><span></span></li>

                <li>
                    <Link
                        to='/game-list/Xbox'
                        onClick={e => RedirectOnClick(e, 'Xbox')}
                    >
                        <img src="./icons/xbox.png" alt="Xbox" />
                        <p>XBOX</p>
                        <img src="./arrow_prev.png" alt="Arrow" />
                    </Link>
                </li>

                <li className="seperation"><span></span></li>

                <li>
                    <Link
                        to='/game-list/Nintendo'
                        onClick={e => RedirectOnClick(e, 'Nintendo')}
                    >
                        <img src="./icons/switch.png" alt="Nintendo" />
                        <p>NINTENDO</p>
                        <img src="./arrow_prev.png" alt="Arrow" />
                    </Link>
                </li>

                <li className="seperation"><span></span></li>

                <li>
                    <img src="./icons/gift_card.png" alt="Gift Cards" />
                    <p>GIFT CARDS</p>
                    <img src="./arrow_prev.png" alt="Arrow" />
                </li>

                <li className="seperation"><span></span></li>

                <li>
                    <Link to='/softwares'>
                        <img src="./icons/software.png" alt="Software" />
                        <p>SOFTWARE</p>
                        <img src="./arrow_prev.png" alt="Arrow" />
                    </Link>
                </li>

                <li className="seperation"><span></span></li>

                <li>
                    <img src="./icons/support.png" alt="Support" />
                    <p>SUPPORT</p>
                    <img src="./arrow_prev.png" alt="Arrow" />
                </li>
            </ul>

            <div id="nav_link">
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
            </div>

        </div>
    );
}

export { MobileNav, hideMobileNav };