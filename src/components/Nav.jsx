import { useEffect, useState } from "react";
import "../styles/css/nav.css";
import { Link, useNavigate } from "react-router-dom";
import { checkIsLoggedIn } from "../utils/cookie";

import { getCartInfo, updateCartPrices } from "../data/handle_cart";


import SgtGame from "../utils/SgtGame";
import faved_games from "../data/faved_games.json"




document.addEventListener("scroll", () => {
    let top = window.pageYOffset;

    if (top > 210) {
        document.querySelector("body").style.paddingTop = "100px";


        if (document.querySelector("nav"))
            document.querySelector("nav").classList.add("fixed");
    }

    else {
        document.querySelector("body").style.paddingTop = "0";



        if (document.querySelector("nav"))
            document.querySelector("nav").classList.remove("fixed");
    }
});

const Nav = () => {
    const [query, setQuery] = useState("")
    const navigate = useNavigate();
    const [cartLength, setCartLength] = useState(
        getCartInfo() ? getCartInfo().length : 0
    )

    window.addEventListener('storage', () => {
        setCartLength(getCartInfo() ? getCartInfo().length : 0);

    })
    const connected = checkIsLoggedIn()

    const showMobileNav = () => {
        document.getElementById('overlay').style.display = "block";
        document.getElementById('mobileNavbar').style.display = "flex";

        setTimeout(() => {
            document.getElementById('overlay').style.opacity = "0.7";
            document.getElementById('mobileNavbar').classList.add('active');
        }, 1);
        document.querySelector('body').classList.add('hidden');
    }

    const handleSubmit = e => {
        e.preventDefault()

        navigate("/search/" + encodeURIComponent(query))
    }
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

    const handleSgtShow = () => {
        document.querySelectorAll("nav .sgt_wrapper").forEach(el => {
            el.classList.add("shown")
        })
    }

    const handleSgtHide = () => {
        document.querySelectorAll("nav .sgt_wrapper").forEach(el => {
            el.classList.remove("shown")
        })
    }

    const getRelevantParent = e => {
        let el = e.target;
        while(el.tagName != "BUTTON" && el.tagName != "DIV") {
            el = el.parentNode
        }

        return el
    }

    const handleAccountRedirect = e => {
        const el = getRelevantParent(e)

        if(
            (el.tagName == "BUTTON" && el.classList.contains("nav_btn")) ||
            (el.tagName == "DIV" && e.target.id == "login_menu_wrapper")
        ) navigate("/account/info")
    }

    return (
        <nav>
            <Link to='/home'>
                <img className="logo comp" src="./logo_2.png" alt="Logo" />
            </Link>

            <div className="search_sgt_wrapper comp">
                <form onSubmit={handleSubmit} className="text_input_wrapper">
                    <input onBlur={handleSgtHide} onFocus={handleSgtShow} value={query} onChange={e => setQuery(e.target.value)} type="text" placeholder="Search" />

                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="256" height="256"><g data-name="Layer 2" fill="#000000" className="color000 svgShape"><path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" data-name="search" fill="#fff" className="color000 svgShape"></path></g></svg>
                    </button>
                </form>

                <div className="sgt_wrapper">
                    <p>Popular Searches :</p>

                    <div id="games_wrapper">
                        {
                            faved_games.slice(0, 3).map((game, idx) =>
                                <SgtGame game={game} hideSep={idx === (faved_games.slice(0, 3).length - 1)} />
                            )
                        }
                    </div>
                </div>
            </div>

            <span id="inputs">
                {currency && <div className="select_wrapper">
                    <select onChange={handleChange} value={currency}>
                        <option value="Eur">€ EUR</option>
                        <option value="Usd">$ USD</option>
                        <option value="Pln">zł PLN</option>
                        <option value="Gbp">£ GBP</option>
                    </select>

                    <img src="./icons/dropdown.png" alt="Arrow" />
                </div>}

                <button className="nav_btn" id="menu" onClick={showMobileNav}>
                    <img src="./icons/menu.png" alt="Menu" />
                </button>

                <div id="account_btn_wrapper" onClick={handleAccountRedirect}>
                    <Link
                        to='/account/info'
                        onClick={e => e.preventDefault()}
                    >
                        <button className="nav_btn">
                            <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 32 32" width="256" height="256"><path d="M29.051 29.999 29 30H3a1 1 0 0 1-1-1v-2a9 9 0 0 1 9-9h10a9 9 0 0 1 9 9v2l-.001.051-.004.051-.007.05-.008.049-.012.049-.013.047-.016.047-.018.045-.02.044-.022.043-.024.042-.026.041-.028.039-.029.038-.032.036-.033.035-.035.033-.036.032-.038.029-.039.028-.041.026-.042.024-.043.022-.044.02-.045.018-.047.016-.047.013-.049.012-.049.008-.05.007-.051.004zM28 28v-1a7 7 0 0 0-7-7H11a7 7 0 0 0-7 7v1h24zM16 2c-3.863 0-7 3.137-7 7s3.137 7 7 7 7-3.137 7-7-3.137-7-7-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5z" fill="#fff" className="color000 svgShape"></path></svg>
                        </button>
                    </Link>

                    <div id="login_menu_wrapper">
                        <div id="login_menu_content">
                            <p>Welcome !</p>

                            <button>
                                <p>Connect with</p>
                                <img src="./icons/google.png" alt="Google" />
                            </button>

                            <button>
                                <p>Connect with</p>
                                <img src="./icons/fb.png" alt="Facebook" />
                            </button>

                            <button>
                                <p>Connect with</p>
                                <img src="./icons/steam.svg" alt="Steam" />
                            </button>

                            <button>
                                Connect
                            </button>

                            <p>
                                don't have an account ?
                                <Link to='/auth/signup'>
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="logo mobl wrapper">
                    <Link to='/home'>
                        <img src="./logo_2.png" alt="Logo" />
                    </Link>
                </div>

                <Link to='/account/favs'>
                    <button className="nav_btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="256" height="256"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" fill="#fff" className="color000 svgShape"></path></svg>
                    </button>
                </Link>

                <Link to='/my-cart'>
                    <button className="nav_btn badged active">
                        <div id="badge">
                            <p>{cartLength}</p>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width="256" height="256"><path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z" fill="#fff" className="color000 svgShape"></path></svg>
                    </button>
                </Link>
            </span>

            <div className="search_sgt_wrapper mobl">
                <form onSubmit={handleSubmit} className="text_input_wrapper">
                    <input onBlur={handleSgtHide} onFocus={handleSgtShow} value={query} onChange={e => setQuery(e.target.value)} type="text" placeholder="Search" />

                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="256" height="256"><g data-name="Layer 2" fill="#000000" className="color000 svgShape"><path d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" data-name="search" fill="#fff" className="color000 svgShape"></path></g></svg>
                    </button>
                </form>

                <div className="sgt_wrapper">
                    <p>Popular Searches :</p>

                    <div id="games_wrapper">
                        {
                            faved_games.slice(0, 3).map((game, idx) =>
                                <SgtGame game={game} hideSep={idx === (faved_games.slice(0, 3).length - 1)} />
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;