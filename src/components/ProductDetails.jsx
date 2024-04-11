import "../styles/css/productDetails.css";
import { gameIsInWishlist } from "../utils/functions";

const platform_data = {
    "PC": {
        "color": "#a327f0",
        "img_path": "./icons/pc.png"
    },

    "PLAYSTATION": {
        "color": "#002e83",
        "img_path": "./icons/playstation.png"
    },

    "XBOX": {
        "color": "#0f7b0c",
        "img_path": "./icons/Xbox.png"
    }
}

const ProductDetails = ({ game, platform }) => {
    return (
        <section id="product_details_section">
            <div id="cover" style={{backgroundImage: `url('./game_covers/${game.cover}')`}}></div>

            <div id="data">
                {game.is_discounted && <div id="disc_perc">-{ game.discount_perc }%</div>}

                <h1 id="title">{ game.title }</h1>

                <div id="game_info">
                    <div className="info_wrapper">
                        <div style={{background: platform_data[platform.toUpperCase()]["color"]}} id="icon">
                            <img src={platform_data[platform.toUpperCase()]["img_path"]} alt="Xbox" />
                        </div>

                        <div id="text">
                            <p>Platform</p>
                            <h4>{ platform }</h4>
                        </div>
                    </div>

                    <div className="info_wrapper">
                        <div id="icon">
                            <img src="./icons/cloud_download.png" alt="Download" />
                        </div>

                        <div id="text">
                            <p>Delivery</p>
                            <h4>Instant Digital Delivery</h4>
                        </div>
                    </div>

                    <div className="info_wrapper">
                        <div id="icon">
                            <img src="./icons/calendar.png" alt="Calendar" />
                        </div>

                        <div id="text">
                            <p>Release Date</p>
                            <h4>19 Mar 2023</h4>
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

                <p>Languages:</p>
            </div>

            <div id="buy_component">
                <div id="top">
                    <span>
                        <img src="./icons/lightning.png" alt="Lightning" />
                        <p>Instant Delivery</p>
                    </span>

                    <div></div>

                    <span>
                        <img src="./icons/key.svg" alt="Key" />
                        <p>Digital Key</p>
                    </span>
                </div>

                <div className="seperation"><span></span></div>

                <div className="game_price_wrapper">
                    {game.is_discounted && <h3 id="discount_price">€ { game.new_price }</h3>}
                    <h3 id="original_price">€ { game.price }</h3>
                </div>

                <button>Buy Now</button>

                {   gameIsInWishlist(game.id) ?

                    <div id="fav">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="256" height="256"><path d="M20.16,5A6.29,6.29,0,0,0,12,4.36a6.27,6.27,0,0,0-8.16,9.48l6.21,6.22a2.78,2.78,0,0,0,3.9,0l6.21-6.22A6.27,6.27,0,0,0,20.16,5Zm-1.41,7.46-6.21,6.21a.76.76,0,0,1-1.08,0L5.25,12.43a4.29,4.29,0,0,1,0-6,4.27,4.27,0,0,1,6,0,1,1,0,0,0,1.42,0,4.27,4.27,0,0,1,6,0A4.29,4.29,0,0,1,18.75,12.43Z" fill="#fff" className="color000 svgShape"></path></svg>
                        <p>Add To Wishlist</p>
                    </div> 

                    :

                    <div id="fav">
                        <img src="./heart.active.svg" alt="Favourite" />
                        <p>Remove From Wishlist</p>
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
            </div>
        </section>
    );
}

export default ProductDetails;