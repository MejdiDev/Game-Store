

import "../styles/css/gamesList.css";

import GameCard from "../utils/GameCard";
import MultiRangeSlider from "../utils/MultiRangeSlider";

import { Link, useNavigate } from "react-router-dom";
import { includesAll, gameIsInWishlist } from "../utils/functions";
import { useEffect, useState } from "react";
import { hideMobileNav } from "./MobileNav";
import { getCurrentCurrency } from "../data/handle_currency";

const emptyCri = { "platforms": [], "genres": [], "price_range": { "min": 0, "max": 1000 }, "wishlisted": false }

const FilterComponent = ({ games, applyHandler, onGenreClick, selectedGenres, handleMinMaxPrice, minPrice, maxPrice }) => {

    const [criList, criListHandler] = useState(emptyCri);
    const [rangeMin, setRangeMin] = useState(minPrice);
    const [rangeMax, setRangeMax] = useState(maxPrice);
    const [tempError, setTempError] = useState(false)

    const getAvOptions = field => {
        return [
            'Windows'
        ]
    }

    const handleCheck = (e, field) => {
        onGenreClick(field)
    }
    const updatePrice = () => {
        if (rangeMin && rangeMax && rangeMin > rangeMax) {

            setTempError(true)
        } else {
            handleMinMaxPrice(rangeMin, rangeMax);
        }
    }



    return (
        <div className="filter_wrapper mobl_hidden">
            <div id="price_cri" className="cri_wrapper">
                <h1>Price Range:</h1>

                <div id="price_inputs_wrapper">
                    <input value={rangeMin} onChange={e => setRangeMin(e.target.value)} placeholder="From" type="number" min={0} step={10} max={10000} />
                    <input value={rangeMax} onChange={e => setRangeMax(e.target.value)} placeholder="To" type="number" min={10} step={10} max={10000} />

                </div>


                {tempError && <p style={{ color: 'red', padding: '0' }}>please verify</p>}
                <button onClick={() => {
                    hideMobileNav()
                    updatePrice()
                }}>Filter</button>
            </div>

            <div className="seperation"><span></span></div>

            {/*   <div className="cri_wrapper">
                <h1>Wishlisted:</h1>

                <div className="checks_wrapper">
                    <span>
                        <div onClick={e => handleCheck(e, "wishlisted")} id="checkbox">
                            <img src="./icons/check.svg" alt="Check" />
                        </div>

                        <p>Wishlisted</p>
                    </span>
                </div>
            </div>
                 <div className="seperation"><span></span></div>

 */}


            {/*     <div className="cri_wrapper">
                <h1>Platform:</h1>

                <div className="checks_wrapper">
                    {
                        getAvOptions("platforms").map((label, idx) =>
                            <span key={`platform-option-${idx}`}>
                                <div onClick={e => handleCheck(e, "platforms")} id="checkbox">
                                    <img src="./icons/check.svg" alt="Check" />
                                </div>

                                <p>{label}</p>
                            </span>
                        )
                    }
                </div>
            </div>

            <div className="seperation"><span></span></div>*/}


            <div className="cri_wrapper">
                <h1>Genre:</h1>

                <div className="checks_wrapper">
                    {
                        getAvOptions("genres").map((label, idx) =>
                            <span key={`genre-option-${idx}`}>
                                <div onClick={e => handleCheck(e, label)} id="checkbox" className={selectedGenres[label] === true ? "active" : ""}>
                                    <img src="./icons/check.svg" alt="Check" />
                                </div>

                                <p>{label}</p>
                            </span>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

const SoftwaresComponent = ({ pageTitle, games, platform, onGenreClick, selectedGenres, currentPage, onPageChange, totalPages,
    handleMinMaxPrice, minPrice, maxPrice
}) => {
    const maxPageButtons = 10;
    const halfMaxPageButtons = Math.floor(maxPageButtons / 2);

    let startPage = Math.max(currentPage - halfMaxPageButtons, 1);
    let endPage = startPage + maxPageButtons - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, idx) => startPage + idx);
    const [resGameList, setResGameList] = useState(null)
    const [applCriList, applCriListHandler] = useState(emptyCri)

    const showFilterMenu = () => {
        document.getElementById('overlay').style.display = "block";
        document.querySelector('.filter_wrapper').classList.remove("mobl_hidden");

        setTimeout(() => {
            document.querySelector('.filter_wrapper').classList.add("slid_into_view");
            document.getElementById('overlay').style.opacity = "0.7";
        }, 1);

        document.querySelector('body').classList.add('hidden');
    }

    useEffect(() => {

        setResGameList(

            games.filter(game => {
                const initBool = (
                    !applCriList["wishlisted"] ? true : gameIsInWishlist(game._id)
                )

                const game_price = game.sellPrice
                    ? getCurrentCurrency() === "Usd"
                        ? game.usdPrice
                        : getCurrentCurrency() === "Pln"
                            ? game.plnPrice
                            : getCurrentCurrency() === "Gbp"
                                ? game.gbpPrice
                                : game.sellPrice
                    : getCurrentCurrency() === "Usd"
                        ? game.usdPrice
                        : getCurrentCurrency() === "Pln"
                            ? game.plnPrice
                            : getCurrentCurrency() === "Gbp"
                                ? game.gbpPrice
                                : game.price;
                console.log(applCriList["price_range"].min <= game_price &&
                    game_price <= applCriList["price_range"].max);


                return (



                    applCriList["price_range"].min <= game_price &&
                    parseFloat(game_price) <= applCriList["price_range"].max
                )
            })
        )
    }, [applCriList, games, platform])

    return (
        <section id="games_list_body">
            <h1>{pageTitle}</h1>

            <div id="game_list_body_wrapper">
                {games &&
                    <FilterComponent
                        games={games}
                        applyHandler={applCriListHandler}
                        onGenreClick={onGenreClick}
                        selectedGenres={selectedGenres}
                        handleMinMaxPrice={handleMinMaxPrice}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                    />}

                <div id="content">
                    <button id="filter_btn" onClick={() => showFilterMenu()}>
                        <p>Filter</p>
                        <img src="./icons/filter.png" alt="Filter" />
                    </button>

                    <div id="res_wrapper">
                        {!resGameList ? <h1 className="msg">Loading ...</h1> :

                            (resGameList.length == 0 ? <h1 className="msg">No results found ! 🤷🏻‍♂️🙅🏻‍♀️</h1> :
                                resGameList.map((game, idx) =>


                                    <GameCard
                                        game={game}
                                        idx={idx}
                                        key={idx}
                                        plateform={platform}
                                    />
                                )
                            )
                        }
                    </div>
                    {resGameList && resGameList.length > 0 && <div className="index_pags">
                        <button id="prev" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                            <p>Previous</p>
                            <img src="./icons/dropdown.png" alt="Arrow" />
                        </button>

                        {pageNumbers.map((pageNumber) => (
                            <button
                                key={pageNumber}
                                className={`pag ${currentPage === pageNumber ? 'active' : ''}`}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button id="next" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            <p>Next</p>
                            <img src="./icons/dropdown.png" alt="Arrow" />
                        </button>
                    </div>}
                </div>
            </div>
        </section>
    );
}

export default SoftwaresComponent;