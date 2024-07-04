import "../styles/css/cartBody.css";
import { useEffect, useState } from "react";
import { calculateItemTotalPrice, calculateTotalPrice, decrementQuantity, findMaxQte, getCartInfo, incrementQuantity, removeFromCart, updateQantity } from "../data/handle_cart";
import { Payment_checkout, getKinguinProduct } from "../data/api";
import { loadStripe } from '@stripe/stripe-js';
import { getCurrencyLogo, getCurrentCurrency } from "../data/handle_currency";
import { Link, Navigate, useNavigate } from "react-router-dom";

const CartBody = () => {
    const [cartInfo, setCartInfo] = useState(null);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate()

    useEffect(() => {

        setTimeout(() => setCartInfo(getCartInfo() ? getCartInfo() : []), 500)
    }, []);
    useEffect(() => {
        if (cartInfo && cartInfo.length > 0) setTotal(calculateTotalPrice());

    }, [cartInfo]);
    window.addEventListener('storage', () => {
        setCartInfo(getCartInfo() ? getCartInfo() : []);

    })

    const handleQuantity = (opt, id, current) => {
        if (current => 1) opt === '+' ? incrementQuantity(id) : decrementQuantity(id);
        setTimeout(() => setCartInfo(getCartInfo() ? getCartInfo() : []), 500)
    };
    const removeItem = (item) => {

        removeFromCart(item);
        setTimeout(() => setCartInfo(getCartInfo() ? getCartInfo() : []), 500)
    }

    const verifyProductsExist = async () => {
        const cart = getCartInfo();
        cart.forEach(async (cartItem) => {
            if (cartItem.item.type === "game") {

                const item = cartItem.item;
                const data = await getKinguinProduct(item._id);
                if (data.message === "404") {
                    removeFromCart(item._id);
                    //Alert
                    return 0;
                }
                if (data.message === "success") {
                    if (item.quantity > item.qty) {
                        updateQantity(item._id, item.quantity);
                        //Alert
                        return 0;

                    }
                }
            }

        })
    }

    const fetchCheckoutSession = async () => {
        const result = await verifyProductsExist();
        if (result === 0) return;

        try {
            const stripe = await loadStripe('pk_test_51JikCbEjmkP0V77T1XoatO1xllDcWhYutDNquR4DBE4QbO1fjU5OEASESvRBn7OJnMsFEZ11EWO3qojpHIg4tC5v00qFotCWrB');

            const sessionId = await Payment_checkout({ cart: getCartInfo(), currency: getCurrentCurrency() });
            const { error } = await stripe.redirectToCheckout({ sessionId: sessionId.id });

            if (error) {
                console.error('Error redirecting to Stripe Checkout:', error);
            }
        } catch (error) {
            console.error('Error fetching checkout session:', error);
        }
    };


    const getProductUrl = game => {
        let res = (`/product/${game?.name.replace(/\s+/g, '-').replace(/\//g, '-')}-${game?._id}`)
        return res
    }

    const handleRedirect = (e, game) => {
        if(e.target.tagName == "BUTTON" || e.target.tagName == "IMG") return
        navigate(getProductUrl(game?.item))
    }

    return (
        !cartInfo ?

            <div id="loader_wrapper"><div className="loader"></div></div>

            :
            (cartInfo.length === 0 ?


                <h1 id="cart_body" className="msg">You Cart Is Empty ! 🤷🏻‍♂️🙅🏻‍♀️</h1>

                :

                <section id="cart_body">
                    <div className="mobl" id="promo_input_wrapper">
                        <input placeholder="Promo Code" type="text" />
                        <button className="grad_btn">Apply</button>
                    </div>

                    <div className="mobl" id="payement_method_wrapper">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <div id="row_wrapper">
                        <div id="games_list">
                            <h3>Your cart</h3>

                            {
                                cartInfo.map((game, idx) =>
                                    <Link
                                        to={ getProductUrl(game?.item) }
                                        onClick={e => {
                                            e.preventDefault()
                                            handleRedirect(e, game)
                                        }}
                                    >
                                        <div className="cart_game" key={`cart-game-${idx}`}>

                                            {game.item.mainImage && game.item.type === "software" && (
                                                <div id="cover" style={{ backgroundImage: `url("${process.env.REACT_APP_BACKEND_URL}/${game.item.mainImage.replace('\\', '/')}")` }}></div>
                                            )}
                                            {game.item.mainImage && game.item.type !== "software" && (
                                                <div id="cover" style={{ backgroundImage: `url("${game.item.mainImage}")` }}></div>
                                            )}



                                            <div id="content_wrapper">
                                                <button id="cross" onClick={() => removeItem(game.item._id)}>
                                                    <img src="./icons/cross.svg" alt="Close" />
                                                </button>

                                                <div id="top">
                                                    <p>{game?.item.name}</p>

                                                    <div className="game_price_wrapper">
                                                        {
                                                            game.item.is_discounted ?
                                                                <h3 id="discount_price">{getCurrencyLogo()} {game.item.new_price}</h3>
                                                                :
                                                                <h3 id="original_price">{getCurrencyLogo()} {game.item.price}</h3>
                                                        }
                                                    </div>
                                                </div>

                                                <div id="bottom">
                                                    <div id="qte_control_wrapper">
                                                        <button onClick={() => {
                                                            handleQuantity('-', game.item._id, game.quantity);
                                                        }} disabled={game.quantity == 1}>-</button>
                                                        <p>{game.quantity}</p>
                                                        <button onClick={() => {
                                                            handleQuantity('+', game.item._id, game.quantity);
                                                        }} disabled={game.item.mqte === game.quantity}>+</button>
                                                    </div>

                                                    <div id="total_price_wrapper">
                                                        <p>Total: </p>
                                                        <p>{calculateItemTotalPrice(game)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        </div>

                        <div id="checkout_component">
                            <h3>Your order</h3>

                            <div id="promo_input_wrapper">
                                <input placeholder="Promo Code" type="text" />
                                <button className="grad_btn">Apply</button>
                            </div>

                            <div className="seperation"><span></span></div>

                            <div className="price_detail_wrapper" id="cart_total">
                                <h3>Total: </h3>

                                <h3>${total}</h3>

                            </div>

                            <div id="payement_method_wrapper">
                                <img src="./icons/stripe_3.png" alt="Powered By Stripe" />
                            </div>


                            <button className="grad_btn" onClick={() => { fetchCheckoutSession() }}>Checkout</button>

                        </div>
                    </div>
                </section>
            )
    );
}

export default CartBody;