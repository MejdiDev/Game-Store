import { useEffect, useState } from "react";
import { addToCart, isItemInCart, removeFromCart } from "../data/handle_cart";
import "../styles/css/productDetails.css";

import moment from 'moment';
import { addToWishlist, getWishlist, isInWishlist, removeFromWishlist } from "../data/handle_wishList";
import { getCurrencyLogo, getCurrentCurrency } from "../data/handle_currency";

const PsData = {
    "color": "#002e83",
    "img_path": "./icons/playstation.png"
}

const XboxData = {
    "color": "#0f7b0c",
    "img_path": "./icons/Xbox.png"
}

const platform_data = {
    "PC": {
        "color": "#a327f0",
        "img_path": "./icons/pc.png"
    },

    "STEAM": {
        "color": "#3d3b3c",
        "img_path": "./icons/steam.svg"
    },

    "UBISOFT": {
        "color": "#6a79b8",
        "img_path": "./icons/ubisoft.svg"
    },

    "EPIC GAMES": {
        "color": "#363435",
        "img_path": "./icons/epic.svg"
    },

    "NINTENDO": {
        "color": "#e60012",
        "img_path": "./icons/switch.png"
    },

    "PLAYSTATION": PsData,
    "XBOX": XboxData
}
const languages = [
    { French: 'FR' },
    { English: 'GB' },
    { Italian: 'IT' },
    { Spanish: 'ES' },
    { Russian: 'RU' },
    { Japanese: 'JP' },
    { German: 'DE' },
    { Korean: 'KR' },
    { Chinese: 'CN' },
    { Portuguese: 'PT' }


];
const getCountryCode = (languageName) => {
    const languageObject = languages.find(lang => lang.hasOwnProperty(languageName));
    return languageObject ? languageObject[languageName] : null;
};
const FormDate = (dateStr) => {
    const formattedDate = moment(dateStr).format("D MMMM YYYY");
    return formattedDate;
}

const ProductDetails = ({ game, platform }) => {

    console.log("ggg", game)

    const [existOnCart, setExistOnCart] = useState(false);
    const [wishlist, setWishList] = useState(getWishlist());
    const [currency, setCurrency] = useState(getCurrencyLogo());
    window.addEventListener('storage', () => {
        setCurrency(getCurrencyLogo());

    });

    const handleWishList = (item) => {
        if (!isInWishlist(item.kinguinId ? item.kinguinId : item._id)) {
            addToWishlist(item)

        } else {
            removeFromWishlist(item.kinguinId ? item.kinguinId : item._id);
        }
        setWishList(getWishlist());

    }
    useEffect(() => {
        console.log(game)
        setExistOnCart(isItemInCart(game.kinguinId ? game.kinguinId : game._id));
    }, [game])

    const showGuideWindow = () => {
        document.querySelector('nav').classList.add('blur');
        document.getElementById('drop_menu_wrapper').style.zIndex = '997';

        document.getElementById('overlay_dropdown').style.display = "block";
        document.getElementById('guide_body_wrapper').style.display = "flex";

        setTimeout(() => {
            document.getElementById('overlay_dropdown').style.opacity = "0.7";
            document.getElementById('guide_body_wrapper').classList.add('active');
        }, 1);

        document.querySelector('body').style.overflowY = 'hidden';
    }

    const handleAddToCart = (item) => {
        let id = game.kinguinId ? game.kinguinId : game._id

        if (isItemInCart(id) === false) {
            game.kinguinId ? addToCart(item, 'game') : addToCart(item, 'software');
            setExistOnCart(true);

        } else {
            game.kinguinId ? removeFromCart(game.kinguinId) : removeFromCart(game._id)
            setExistOnCart(false);
        }
    }

    const getConsole = plt => {
        if (plt.toUpperCase().includes("PLAYSTATION")) return platform_data["PLAYSTATION"]
        if (plt.toUpperCase().includes("XBOX")) return platform_data["XBOX"]
        if (plt.toUpperCase().includes("NINTENDO")) return platform_data["NINTENDO"]

        return platform_data[plt.toUpperCase()]
    }

    return (
        <section id="product_details_section">

            <div id="details_wrapper">
                {game.mainImage && (<div id="cover" style={{ backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}/${game.mainImage.replace('\\', '/')}` }}></div>)}

                {game.coverImageOriginal && (
                    <div style={{ backgroundImage: `url('${game.coverImageOriginal}')` }} id="cover"></div>)}
                {!game.coverImageOriginal && game.images?.cover?.url &&
                    (<div style={{ backgroundImage: `url('${game.images?.cover?.url}')` }} id="cover"></div>)}

                <div id="data">
                    {game.is_discounted && <div id="disc_perc">-{game.discount_perc}%</div>}

                    <h1 id="title">{game.name ? game.name : game.productName}</h1>

                    <div id="game_info">
                        <div className="info_wrapper">
                            <div style={{ background: getConsole(platform)["color"] }} id="icon">
                                <img src={getConsole(platform)["img_path"]} alt="Xbox" />
                            </div>
                            <div id="text">
                                <p>Platform</p>
                                <h4>{platform}</h4>
                            </div>
                        </div>

                        <div className="info_wrapper">
                            <div id="icon">
                                <img src="./icons/cloud_download.png" alt="Download" />
                            </div>

                            <div id="text">
                                <p>Delivery</p>
                                <h4>Fast Digital Delivery</h4>
                            </div>
                        </div>

                        <div className="info_wrapper">
                            <div id="icon">
                                <img src="./icons/calendar.png" alt="Calendar" />
                            </div>

                            <div id="text">
                                <p>Release Date</p>
                                <h4>{FormDate(game.releaseDate)}</h4>
                            </div>
                        </div>

                        <div className="info_wrapper">

                            <div id="icon">
                                <img src="./icons/planet.png" alt="Planet" />
                            </div>

                            <div id="text">
                                <p>Region</p>
                                <h4>Worldwide</h4>
                            </div>
                        </div>
                    </div>

                    <div className="seperation"><span></span></div>

                    <p id="flags_label">Languages:</p>
                    <div id="flags_wrapper">

                        {
                            game.languages && [...new Set(game.languages)].map((cnt, idx) =>
                                (idx <= 3) && <div key={`game-lang-flag-top-${idx}`} className="flag" style={{ backgroundImage: `url('https://flagsapi.com/${getCountryCode(cnt)}/flat/64.png')` }}></div>
                            )
                        }

                        {
                            (game.languages && game.languages.length > 3) &&
                            <div id="see_more">
                                + {game.languages.length - 3}
                            </div>
                        }
                    </div>
                </div>

                <div id="placeholder"></div>
            </div>

            <div id="buy_component">
                <div id="top">
                    <span>
                        <img src="./icons/lightning.png" alt="Lightning" />
                        <p>Fast Delivery</p>
                    </span>

                    <div></div>

                    <span>
                        <img src="./icons/key.svg" alt="Key" />
                        <p>Digital Key</p>
                    </span>
                </div>

                <div className="seperation"><span></span></div>

                <div className="game_price_wrapper">
                    {game.is_discounted && <h3 id="discount_price">€ {game.new_price}</h3>}
                    {game.sellPrice ? (
                        <h3 id="original_price">  {currency} {getCurrentCurrency() === "Usd" ? game.usdPrice : (
                            getCurrentCurrency() === "Pln" ? game.plnPrice : (
                                getCurrentCurrency() === "Gbp" ? game.gbpPrice : game.sellPrice
                            )
                        )}</h3>
                    ) :
                        <h3 id="original_price"> € {game.price}</h3>}
                </div>
                {existOnCart === false ?
                    (<button onClick={() => { handleAddToCart(game) }}>Add to Cart</button>) :
                    (<button onClick={() => { handleAddToCart(game) }}>Delete from Cart</button>)}


                {wishlist && isInWishlist(game?.kinguinId ? game?.kinguinId : game?._id) ?
                    <div id="fav" onClick={() => handleWishList(game)}>
                        <img src="./heart.active.svg" alt="Favourite" />
                        <p>Remove From Wishlist</p>
                    </div>

                    :
                    <div id="fav" onClick={() => handleWishList(game)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="256" height="256"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" fill="#fff" className="color000 svgShape"></path></svg>
                        <p>Add To Wishlist</p>
                    </div>


                }

                <div id="benefits">
                    <div>
                        <img src="./icons/circle_check.svg" alt="Check" />
                        <p>Friendly Return Policy</p>
                    </div>

                    <div>
                        <img src="./icons/circle_check.svg" alt="Check" />
                        <p>Fast Checkout Process</p>
                    </div>

                    <div>
                        <img src="./icons/circle_check.svg" alt="Check" />
                        <p>Convenient Payement Options</p>
                    </div>
                </div>


                {platform === "Steam" && (<p onClick={showGuideWindow}>Don't know how to activate ?</p>)}

            </div>
        </section>
    );
}

export default ProductDetails;