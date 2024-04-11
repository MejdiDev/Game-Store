import faved_games from "../data/faved_games.json";

const shuffleArray = (array) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
};

const includesAll = (arr, values) => values.every(v => arr.includes(v));

const gameIsInWishlist = id => faved_games.map(pt_game => pt_game.id).includes(id);

export {
  shuffleArray,
  includesAll,
  gameIsInWishlist
}