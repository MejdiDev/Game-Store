

import { useEffect, useState } from "react";
import SoftwareListPage from "./utils/SoftwareListPage";
import { useLocation, useParams } from "react-router-dom";
import { getAllGames, getAllKinguinGames } from "../data/api";
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import "../styles/css/loader.css";
import { getCurrentCurrency } from "../data/handle_currency";

const Plateforms = [
    'Android', 'Battle.net',
    'Epic Games', 'GOG.com',
    'MS Store (PC)', 'Meta Quest',
    'Meta Quest 2', 'Nintendo',
    'Nintendo Switch', 'Official website',
    'Origin / EA app', 'Other',
    'PC', 'PlayStation',
    'PlayStation 4', 'PlayStation 5',

    'Steam', 'Ubisoft',
    'Xbox One', 'Xbox Series X|S', 'Xbox'
]
const genresArray = [
    'Action', 'Adult Games',
    'Adventure', 'Anime',
    'Casual', 'Co-op',
    'Dating Simulator', 'FPS',
    'Fighting', 'Hack and Slash',
    'Hidden Object', 'Horror',
    'Indie', 'Life Simulation',
    'MMO', 'Music / Soundtrack',
    'Online Courses', 'Open World',
    'PSN Card', 'Platformer',
    'Point & click', 'Puzzle',
    'RPG', 'Racing',
    'Simulation', 'Software',
    'Sport', 'Story rich',
    'Strategy', 'Subscription',
    'Survival', 'Third-Person Shooter',
    'VR Games', 'Visual Novel'
];
const initializeGenres = (genres, selectedGenresFromParams) => {
    const initialGenresState = {};
    genres.forEach(genre => {
        initialGenresState[genre] = selectedGenresFromParams.includes(genre);
    });
    return initialGenresState;
};

const CriGameList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const parsedQuery = queryString.parse(location.search);
    const selectedGenresFromParams = parsedQuery.genres ? parsedQuery.genres.split(',') : [];
    const initialPage = parseInt(parsedQuery.page) || 1;
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [softwares, setSoftwares] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedGenres, setSelectedGenres] = useState(initializeGenres(genresArray, selectedGenresFromParams));
    const [minPrice, setMinPrice] = useState(parseFloat(parsedQuery.minPrice) || undefined);
    const [maxPrice, setMaxPrice] = useState(parseFloat(parsedQuery.maxPrice) || undefined);
    // Math.min(...games.map(game =>
    //     game.sellPrice
    //         ? getCurrentCurrency() === "Usd" ? game.usdPrice : (
    //             getCurrentCurrency() === "Pln" ? game.plnPrice : (
    //                 getCurrentCurrency() === "Gbp" ? game.gbpPrice : game.sellPrice
    //             )
    //         )
    //         : getCurrentCurrency() === "Usd" ? game.usdPrice : (
    //             getCurrentCurrency() === "Pln" ? game.plnPrice : (
    //                 getCurrentCurrency() === "Gbp" ? game.gbpPrice : game.price
    //             )
    //         )
    // ))
    const getGames = async () => {
        try {
            const selectedGenreNames = Object.keys(selectedGenres).filter(genre => selectedGenres[genre]);
            const response = await getAllGames(selectedGenreNames, currentPage, minPrice, maxPrice);
            setSoftwares(response.games);
            setTotalPages(response.totalPages);
        } catch (e) {
            console.log(`error ::: ${e}`);
        }
    };

    const handleGenreClick = (genre) => {
        const updatedGenres = { ...selectedGenres };
        updatedGenres[genre] = !updatedGenres[genre];
        setSelectedGenres(updatedGenres);

        const selectedGenreNames = Object.keys(updatedGenres).filter(genre => updatedGenres[genre]);
        const queryParams = queryString.stringify({ genres: selectedGenreNames.join(','), page: 1 });
        setCurrentPage(1);

        navigate(`${location.pathname}?${queryParams}`);
    };

    const handlePages = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            const queryParams = queryString.stringify({
                genres: Object.keys(selectedGenres).filter(genre => selectedGenres[genre]).join(','),
                page: page
            });
            navigate(`${location.pathname}?${queryParams}`);
        }
    };
    const handleMinMaxPrice = (min, max) => {
        setMinPrice(min);
        setMaxPrice(max)
        const queryParams = queryString.stringify({
            genres: Object.keys(selectedGenres).filter(genre => selectedGenres[genre]).join(','),
            page: 1,
            minPrice: min,
            maxPrice: max
        });
        navigate(`${location.pathname}?${queryParams}`);

    }

    useEffect(() => {

        getGames();
    }
        , [selectedGenres, currentPage, minPrice, maxPrice]);

    useEffect(() => {
        // Scroll to the top of the page whenever the parameters change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.search]); // Trigger when location.search changes

    return (
        <SoftwareListPage
            platform={''}
            pageTitle={"Best Softwares :"}
            games={softwares}
            onGenreClick={handleGenreClick}
            selectedGenres={selectedGenres}
            currentPage={currentPage}
            onPageChange={handlePages}
            totalPages={totalPages}
            handleMinMaxPrice={handleMinMaxPrice}
            minPrice={minPrice}
            maxPrice={maxPrice}
        />
    );
};

export default CriGameList;


