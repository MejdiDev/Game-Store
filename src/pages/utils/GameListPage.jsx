import Nav from "../../components/Nav";
import { MobileNav, hideMobileNav } from '../../components/MobileNav';

import DropdownMenu from "../../components/DropdownMenu";
import Footer from "../../components/Footer";

import GamesList from "../../components/GamesList";
import { useEffect } from "react";


const GameListPage = ({ platform, pageTitle, games, onGenreClick, selectedGenres, currentPage, onPageChange, totalPages, handleMinMaxPrice, isLoading,
    minPrice, maxPrice
}) => {
    useEffect(() => {
        hideMobileNav();
    }, [games])

    return (
        <main>
            <div id="overlay" onClick={hideMobileNav}></div>
            <div id="overlay_dropdown" onClick={hideMobileNav}></div>

            <MobileNav />

            <Nav />
            <DropdownMenu platform={platform} />

            
            <GamesList
                isLoading={isLoading}
                platform={platform}
                pageTitle={pageTitle}
                games={games}
                onGenreClick={onGenreClick}
                selectedGenres={selectedGenres}
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalPages={totalPages}
                handleMinMaxPrice={handleMinMaxPrice}
                minPrice={minPrice}
                maxPrice={maxPrice}
            />

            <Footer />
        </main>
    );
}

export default GameListPage;