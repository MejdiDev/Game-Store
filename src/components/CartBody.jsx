import "../styles/css/cartBody.css";
import faved_games from "../data/faved_games.json";

const CartBody = () => {
    return (
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
                        faved_games.map((game, idx) =>
                            <div className="cart_game" key={`cart-game-${idx}`}>
                                <div id="cover" style={{backgroundImage: `url('./game_covers/${game.cover}')`}}></div>
                                
                                <div id="content_wrapper">
                                    <button id="cross">
                                        <img src="./icons/cross.png" alt="Close" />
                                    </button>

                                    <div id="top">
                                        <p>{game.title}</p>

                                        <div className="game_price_wrapper">
                                            {
                                                game.is_discounted ?
                                                    <h3 id="discount_price">€ { game.new_price }</h3>
                                                :
                                                    <h3 id="original_price">€ { game.price }</h3>
                                            }
                                        </div>
                                    </div>

                                    <div id="bottom">
                                        <div id="qte_control_wrapper">
                                            <button>-</button>
                                            <p>2</p>
                                            <button>+</button>
                                        </div>

                                        <div id="total_price_wrapper">
                                            <p>Total: </p>
                                            <p>523$</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div id="checkout_component">
                    <h3>Your order</h3>

                    <div id="promo_input_wrapper">
                        <input placeholder="Promo Code" type="text" />
                        <button className="grad_btn">Apply</button>
                    </div>

                    <div className="price_detail_wrapper">
                        <h3>Subtotal: </h3>
                        <h3>486$</h3>
                    </div>

                    <div className="price_detail_wrapper">
                        <h3>Discount: </h3>
                        <h3>-38$</h3>
                    </div>

                    <div className="seperation"><span></span></div>

                    <div className="price_detail_wrapper" id="cart_total">
                        <h3>Total: </h3>
                        <h3>308$</h3>
                    </div>

                    <div id="payement_method_wrapper">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <button className="grad_btn">Checkout</button>
                </div>
            </div>
        </section>
    );
}

export default CartBody;