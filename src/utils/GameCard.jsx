import "../styles/css/gameCard.css";
import img_paths from "../data/img_paths.json";
import { addToWishlist, getWishlist, isInWishlist, removeFromWishlist } from "../data/handle_wishList";
import { addToCart, getCartInfo, isItemInCart, removeFromCart } from "../data/handle_cart";

import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getCurrencyLogo, getCurrentCurrency } from "../data/handle_currency"

const GameCard = ({ game, idx, plateform, isWishList }) => {
    const navigate = useNavigate();
    const [wishList, setWishList] = useState(getWishlist());
    const [cartInfo, setCartInfo] = useState(getCartInfo());

    const [currency, setCurrency] = useState(getCurrencyLogo());
    window.addEventListener('storage', () => {
        setCurrency(getCurrencyLogo());

    });
    const handleAddToCart = (item) => {
        let id = game.kinguinId ? game.kinguinId : game._id

        if (isItemInCart(id) === false) {
            game.kinguinId ? addToCart(item, 'game') : addToCart(item, 'software');

        } else {
            game.kinguinId ? removeFromCart(game.kinguinId) : removeFromCart(game._id)
        }

        setCartInfo(getCartInfo());
    }

    const handleWishList = (item) => {
        if (!isInWishlist(item.kinguinId ? item.kinguinId : item._id)) {
            addToWishlist(item)

        } else {
            removeFromWishlist(item.kinguinId ? item.kinguinId : item._id);
        }
        setWishList(getWishlist());
    }

    const getProductUrl = () => {
        let res = "";

        if(isWishList) {
            if(game?.mainImage && game.type === "software") res = `/software/${game.name}-${game._id}`
            if(game?.mainImage && game.type === "game") res = `/product/${game.name.replace(/\s+/g, '-').replace(/\//g, '')}-${game._id}`
        }

        else {
            if (game?.coverImageOriginal) res = (`/product/${game.name.replace(/\s+/g, '-').replace(/\//g, '-')}-${game.kinguinId}`)
            if (game?.images?.cover?.url) res = (`/product/${game.name.replace(/\s+/g, '-').replace(/\//g, '-')}-${game.kinguinId}`)
            if (game?.mainImage) res = (`/software/${game.productName}-${game._id}`)
        }

        return res
    }

    const handleRedirect = e => {
        let trgt = e.target
        while (trgt.tagName != "DIV" && trgt.tagName != "BUTTON") {
            trgt = trgt.parentNode
        }

        if (trgt.getAttribute("favable") !== "true" && trgt.getAttribute("cart") !== "true") navigate(getProductUrl())
    }

    const getProductImg = () => {
        let res = "";

        if(isWishList) {
            if(game?.mainImage && game.type === "software") res = `${process.env.REACT_APP_BACKEND_URL}/${game.mainImage.replace('\\', '/')}`
            if(game?.mainImage && game.type === "game") res = game.mainImage
        }

        else {
            if (game?.coverImageOriginal) res = game.coverImageOriginal
            if (game?.images?.cover?.url) res = game.images.cover.url
            if (game?.mainImage) res = `${process.env.REACT_APP_BACKEND_URL}/${game.mainImage.replace('\\', '/')}`
        }

        return res
    }

    useEffect(() => {
        let preloaderImg = document.createElement("img");
        preloaderImg.src = getProductImg();

        preloaderImg.addEventListener('load', (event) => {
            const elSelector = `div#${getProductUrl().replace(/[^a-zA-Z ]/g, "") + idx}`

            if(document.querySelector(elSelector)) document.querySelector(elSelector).parentNode.style.backgroundImage = `url('${ getProductImg() }')`;
            if(document.querySelector(elSelector)) document.querySelector(elSelector).parentNode.classList.remove('loading')
            
            preloaderImg = null;
        });
    }, [])

    return (

        <Link
            to={getProductUrl()}
            onClick={e => {
                e.preventDefault()
                handleRedirect(e)
            }}
        >
            <article className="game_card" style={{ animationDelay: String(50 * idx) + "ms" }}>
                <div favable="true" id="fav_btn">
                    {
                        wishList && !isInWishlist(game?.kinguinId ? game?.kinguinId : game?._id) ?

                            <svg onClick={() => handleWishList(game)} className="notFaved" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="256" height="256"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" fill="#fff" className="color000 svgShape"></path></svg>

                            :

                            <img onClick={() => handleWishList(game)} className="faved" src="./heart.active.svg" alt="Favourite" />
                    }

                </div>
                {game?.is_discounted && <div id="discount_perc">-{game?.discount_perc}%</div>}

                <div className="loading" id="cover"><div id={getProductUrl().replace(/[^a-zA-Z ]/g, "") + idx}></div></div>

                <p>{game?.productName ? game?.productName : game?.name}</p>


                <div id="bottom">
                    <div className="game_price_wrapper">
                        {game?.is_discounted && <h3 id="discount_price">{currency} {getCurrentCurrency() === "Usd" ? game.usdNewPrice : (
                            getCurrentCurrency() === "Pln" ? game.plnNewPrice : (
                                getCurrentCurrency() === "Gbp" ? game.gbpNewPrice : game.new_price
                            )
                        )}</h3>}

                        {game.sellPrice ? (
                            <h3 id="original_price">  {currency} {getCurrentCurrency() === "Usd" ? game.usdPrice : (
                                getCurrentCurrency() === "Pln" ? game.plnPrice : (
                                    getCurrentCurrency() === "Gbp" ? game.gbpPrice : game.sellPrice
                                )
                            )}</h3>
                        ) :
                            <h3 id="original_price">  {currency} {getCurrentCurrency() === "Usd" ? game.usdPrice : (
                                getCurrentCurrency() === "Pln" ? game.plnPrice : (
                                    getCurrentCurrency() === "Gbp" ? game.gbpPrice : game.price
                                )
                            )}</h3>}



                    </div>

                    <button cart="true" className="active" onClick={() => { handleAddToCart(game) }} >
                        {
                            cartInfo ? 
                            
                            (
                                !isItemInCart(game?.kinguinId ? game?.kinguinId : game?._id) ?

                                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width="256" height="256"><path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z" fill="#fff" className="color000 svgShape"></path></svg>
                                :
                                <img src="./icons/remove.svg" alt="Remove from cart" />
                            )

                            :

                            <img src="./icons/remove.svg" alt="Remove from cart" />
                        }
                    </button>
                </div>


                <div id="platforms_wrapper">
                    <div id="platforms">
                        <div className="platform_entry">
                            <img src="./icons/instant_delivery.svg" alt="Instant Delivery" />

                            <div id="arrow"></div>
                            <div id="index">
                                Instant Delivery
                            </div>
                        </div>

                        <div className="platform_entry">
                            <img src="./icons/key.svg" alt="Digital Key" />

                            <div id="arrow"></div>
                            <div id="index">
                                Digital Key
                            </div>
                        </div>

                        {plateform && plateform == "software" ? (
                            <div className="platform_entry">
                                <img key={`game-buy-plt-${idx}`} src={img_paths['PC']} alt={'PC '} />

                                <div id="arrow"></div>
                                <div id="index">
                                    PC
                                </div>
                            </div>

                        ) : (

                            <div className="platform_entry">
                                <img key={`game-buy-plt-${idx}`} src={img_paths[game?.platform]} alt={game?.platform} />

                                <div id="arrow"></div>
                                <div id="index">
                                    {game?.platform}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );

}

export default GameCard;
