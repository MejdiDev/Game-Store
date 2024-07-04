


const WISHLIST_KEY = 'wishlist';

// Get the current wishlist from localStorage
export const getWishlist = () => {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
};

// Add an item to the wishlist
export const addToWishlist = (item) => {
    const wishlist = getWishlist();
    if (!wishlist.some(wishlistItem => wishlistItem._id === item.id)) {
        const simple_object = {
            _id: item.kinguinId ? item.kinguinId : item._id,
            price: item.price,
            is_discounted: item.is_discounted ? item.is_discounted : false,
            new_price: item.new_price ? item.new_price : 0,
            mainImage: item.mainImage ? item.mainImage : (item.images.cover.url ? item.images.cover.url : item.coverImageOriginal),
            name: item.productName ? item.productName : item.name,
            platform: item.platform ? item.platform : item.plateform,
            type: item.kinguinId ? 'game' : 'software'
        };
        wishlist.push(simple_object);
        localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    }
};

// Remove an item from the wishlist
export const removeFromWishlist = (itemId) => {
    const wishlist = getWishlist();
    const updatedWishlist = wishlist.filter(item => item._id !== itemId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
};

// Check if an item is in the wishlist
export const isInWishlist = (itemId) => {
    const wishlist = getWishlist();
    return wishlist.some(item => item._id === itemId);
};
