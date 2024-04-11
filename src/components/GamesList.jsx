import "../styles/css/gamesList.css";

import GameCard from "../utils/GameCard";
import MultiRangeSlider from "../utils/MultiRangeSlider";

import { Link } from "react-router-dom";
import { shuffleArray, includesAll, gameIsInWishlist } from "../utils/functions";
import { useEffect, useState } from "react";
import { hideMobileNav } from "./MobileNav";

const emptyCri = { "platforms": [], "genres": [], "price_range": { "min": 0, "max": 1000 }, "wishlisted": false }

const FilterComponent = ({ games, applyHandler }) => {
    const [rangeMin, setRangeMin] = useState(0)
    const [rangeMax, setRangeMax] = useState(1000)
    
    const [criList, criListHandler] = useState(emptyCri)

    const getAvOptions = field => {
        return [...new Set(
            games.flatMap(game =>
                game[field]
            )
        )]
    }

    const handleCheck = (e, field) => {
        const trgt = (e.target.tagName == "IMG" ? e.target.parentNode : e.target)
        trgt.classList.toggle("active")

        let tmp = JSON.parse(JSON.stringify(criList))

        if(field == "wishlisted") {
            tmp["wishlisted"] = !tmp["wishlisted"]
            criListHandler(tmp)

            return
        }
        
        const toAppend = trgt.parentNode.innerText

        if(!tmp[field].includes(toAppend)) tmp[field].push(toAppend)
        else tmp[field] = tmp[field].filter(item => item != toAppend)

        criListHandler(tmp)
    }

    const handleRangeChange = (min, max) => {
        setRangeMin(min)
        setRangeMax(max)

        let tmp = JSON.parse(JSON.stringify(criList))
        tmp["price_range"]["min"] = min
        tmp["price_range"]["max"] = max

        if(JSON.stringify(tmp) !=  JSON.stringify(criList)) criListHandler(tmp)
    }

    return (
        <div className="filter_wrapper mobl_hidden">
            <div id="price_cri" className="cri_wrapper">
                <h1>Price Range:</h1>

                <div id="price_inputs_wrapper">
                    <input value={rangeMin} onChange={e => setRangeMin(e.target.value)} placeholder="From" type="number" min={0} step={10} max={10000} />
                    <input value={rangeMax} onChange={e => setRangeMax(e.target.value)} placeholder="To" type="number" min={10} step={10} max={10000} />
                </div>

                <MultiRangeSlider
                    min={ Math.min(...games.map(game => game.is_discounted ? game.new_price : game.price)) }
                    max={ Math.max(...games.map(game => game.is_discounted ? game.new_price : game.price)) }
                    onChange={({ min, max }) => handleRangeChange(min, max)}
                />

                <button onClick={() => {
                    hideMobileNav()
                    applyHandler(criList)
                }}>Filter</button>
            </div>

            <div className="seperation"><span></span></div>

            <div className="cri_wrapper">
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

            <div className="cri_wrapper">
                <h1>Platform:</h1>

                <div className="checks_wrapper">
                    {
                        getAvOptions("platforms").map((label, idx) =>
                            <span key={`platform-option-${idx}`}>
                                <div onClick={e => handleCheck(e, "platforms")} id="checkbox">
                                    <img src="./icons/check.svg" alt="Check" />
                                </div>

                                <p>{ label }</p>
                            </span>
                        )
                    }
                </div>
            </div>

            <div className="seperation"><span></span></div>

            <div className="cri_wrapper">
                <h1>Genre:</h1>

                <div className="checks_wrapper">
                    {
                        getAvOptions("genres").map((label, idx) =>
                            <span key={`genre-option-${idx}`}>
                                <div onClick={e => handleCheck(e, "genres")} id="checkbox">
                                    <img src="./icons/check.svg" alt="Check" />
                                </div>

                                <p>{ label }</p>
                            </span>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

const GamesList = ({ pageTitle, games, platform }) => {
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
                    !applCriList["wishlisted"] ? true : gameIsInWishlist(game.id)
                )

                const game_price = game.is_discounted ? game.new_price : game.price

                return(
                    initBool &&

                    includesAll(game.platforms, applCriList["platforms"]) &&
                    includesAll(game.genres, applCriList["genres"]) &&
                    
                    applCriList["price_range"].min <= game_price &&
                    game_price <= applCriList["price_range"].max
                )
            })
        )
    }, [ applCriList ])

    return(
        <section id="games_list_body">
            <h1>{ pageTitle }</h1>

            <div id="game_list_body_wrapper">
                <FilterComponent
                    games={games}
                    applyHandler={applCriListHandler}
                />

                <div id="content">
                    <button id="filter_btn" onClick={() => showFilterMenu()}>
                        <p>Filter</p>
                        <img src="./icons/filter.png" alt="Filter" />
                    </button>

                    <div id="res_wrapper">
                        {   !resGameList ? <h1 className="msg">Loading ...</h1> :

                            (resGameList.length == 0 ? <h1 className="msg">No results found ! 🤷🏻‍♂️🙅🏻‍♀️</h1> :
                                resGameList.map((game, idx) =>
                                    <Link
                                        key={Math.random()}
                                        to={`/product/${platform == "" ? "PC" : platform}/${game.id}`}
                                    >
                                        <GameCard
                                            game={game}
                                            idx={idx}
                                        />
                                    </Link>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GamesList;