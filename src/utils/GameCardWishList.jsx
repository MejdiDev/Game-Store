import "../styles/css/gameCard.css";
import img_paths from "../data/img_paths.json";
import { addToWishlist, getWishlist, isInWishlist, removeFromWishlist } from "../data/handle_wishList";
import { addToCart, getCartInfo, isItemInCart, removeFromCart } from "../data/handle_cart";

import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const GameCardWishList = ({ game, idx, plateform }) => {

    const navigate = useNavigate();
    const [wishList, setWishList] = useState(getWishlist());
    const [cartInfo, setCartInfo] = useState(getCartInfo());

    const handleAddToCart = (item) => {
        let id = game.kinguinId ? game.kinguinId : game._id


        if (isItemInCart(id) === false) {
            game.kinguinId ? addToCart(item, 'game') : addToCart(item, 'software');

        } else {
            game.kinguinId ? removeFromCart(game.kinguinId) : removeFromCart(game._id)
        }

        setCartInfo(getCartInfo());
    }


    const redirectToLink = (link) => {
        navigate(link);
    };

    const handleWishList = (item) => {
        if (!isInWishlist(item.kinguinId ? item.kinguinId : item._id)) {
            addToWishlist(item)

        } else {
            removeFromWishlist(item.kinguinId ? item.kinguinId : item._id);
        }
        setWishList(getWishlist());

    }

    return (
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

            {game?.mainImage && game.type === "software" && (
                <div onClick={() => { redirectToLink(`/software/${game.name}-${game._id}`); }} id="cover" style={{ backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}/${game.mainImage.replace('\\', '/')}")` }}></div>
            )}

            {game?.mainImage && game.type === "game" && (
                <div onClick={() => { redirectToLink(`/product/${game.name.replace(/\s+/g, '-').replace(/\//g, '')}-${game._id}`); }} style={{ backgroundImage: `url('${game.mainImage}')` }} id="cover"></div>
            )}


            <div id="placeholder"></div>

            <p>{game?.productName ? game?.productName : game?.name}</p>

            <div id="bottom">
                <div className="game_price_wrapper">
                    {game?.is_discounted && <h3 id="discount_price">€ {game?.new_price}</h3>}
                    <h3 id="original_price">€ {game?.price}</h3>
                </div>

                <button cart="true" className="active" onClick={() => { handleAddToCart(game) }} >
                    {
                        cartInfo && !isItemInCart(game?.kinguinId ? game?.kinguinId : game?._id) ?

                        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" width="256" height="256"><path d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z" fill="#fff" className="color000 svgShape"></path></svg>
                        :
                        <img src="./icons/remove.png" alt="Remove from cart" />
                    }
                </button>
            </div>

            <div id="platforms_wrapper">
                <p>Platforms: </p>

                <div id="platforms">

                    <div id="platform_entry_wrapper">
                        {plateform && plateform == "software" ? (

                            <img key={`game-buy-plt-${idx}`} src={img_paths['PC']} alt={'PC '} />


                        ) : (
                            <img key={`game-buy-plt-${idx}`} src={img_paths[game?.platform]} alt={game?.platform} />
                        )}
                    </div>


                </div>
            </div>
        </article>
    );
}

export default GameCardWishList;