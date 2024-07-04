import { getCurrentCurrency } from "./handle_currency";

function toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
        codeUnits[i] = string.charCodeAt(i);
    }
    return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
}

function fromBinary(encoded) {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return String.fromCharCode(...new Uint16Array(bytes.buffer));
}

export const getCartInfo = () => {
    const encodedCart = localStorage.getItem('idt');
    if (encodedCart) {
        return JSON.parse(fromBinary(encodedCart));
    }
    return null;
}
export const findMaxQte = (table, offerId) => {
    for (let i = 0; i < table.length; i++) {
        if (table[i].offerId === offerId) {
            return table[i].qty;
        }
    }
    return null;
}
export const addToCart = (item, type) => {
    let cart = getCartInfo() || [];

    const simple_object = {
        _id: item.kinguinId ? item.kinguinId : item._id,
        price: type === "game" ? (getCurrentCurrency() === "Usd" ? item.usdPrice : (
            getCurrentCurrency() === "Pln" ? item.plnPrice : (
                getCurrentCurrency() === "Gbp" ? item.gbpPrice : item.sellPrice
            )
        )) : (item.price),
        is_discounted: item.is_discounted ? item.is_discounted : false,
        new_price: item.new_price ? item.new_price : 0,
        mainImage: item.mainImage ? item.mainImage : (item.images.cover.url ? item.images.cover.url : item.coverImageOriginal),
        name: item.productName ? item.productName : item.name,
        type: type,
        mqte: item.qty ? item.qty : 100,
        offerId: item.cheapestOfferId ? item.cheapestOfferId[0] : null

    };
    const object = {
        item: simple_object,
        prices: { Usd: item.usdPrice, Pln: item.plnPrice, Gbp: item.gbpPrice, Eur: item.sellPrice },
        quantity: 1
    };
    cart.push(object);
    localStorage.setItem('idt', toBinary(JSON.stringify(cart)));
    window.dispatchEvent(new Event('storage'));
};

export const isItemInCart = (itemId) => {
    const cart = getCartInfo();
    if (cart) {
        console.log(cart.some(i => i.item._id === itemId))
        return cart.some(i => i.item._id == itemId);
    }
    return false;
}

export const removeFromCart = (itemId) => {
    let cart = getCartInfo();
    if (cart) {
        cart = cart.filter(i => i.item._id !== itemId);
        localStorage.setItem('idt', toBinary(JSON.stringify(cart)));
        window.dispatchEvent(new Event('storage'));
    }
}
export const calculateItemTotalPrice = (i) => {
    const price = i.item.is_discounted ? i.item.new_price : i.item.price;
    return parseFloat((price * i.quantity).toFixed(2));
}
export const calculateTotalPrice = () => {
    const cart = getCartInfo();
    let totalPrice = 0;
    if (cart) {
        cart.forEach(cartItem => {
            const item = cartItem.item;
            const price = item.is_discounted ? item.new_price : item.price;
            totalPrice += price * cartItem.quantity;
        });
    }
    return parseFloat(totalPrice.toFixed(2));
}
export const incrementQuantity = (itemId) => {
    let cart = getCartInfo();
    if (cart) {
        const index = cart.findIndex(item => item.item._id === itemId);
        if (index !== -1) {
            cart[index].quantity++;
            localStorage.setItem('idt', toBinary(JSON.stringify(cart)));
        }
    }
}
export const decrementQuantity = (itemId) => {
    let cart = getCartInfo();
    if (cart) {
        const index = cart.findIndex(item => item.item._id === itemId);
        if (index !== -1) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                localStorage.setItem('idt', toBinary(JSON.stringify(cart)));
            }
        }
    }
}
export const updateQantity = (itemId, qte) => {
    let cart = getCartInfo();
    if (cart) {
        const index = cart.findIndex(item => item.item._id === itemId);
        if (index !== -1) {
            cart[index].quantity = qte;
            localStorage.setItem('idt', toBinary(JSON.stringify(cart)));
        }
    }
}
export const updateCartPrices = () => {
    const currentCurrency = getCurrentCurrency();
    let cart = getCartInfo();
    cart = cart.map(cartItem => {
        let updatedPrice = cartItem.prices[currentCurrency] || cartItem.item.price;

        // Create a new simple_object with the updated price
        const updatedSimpleObject = {
            ...cartItem.item,
            price: updatedPrice,
        };

        return {
            ...cartItem,
            item: updatedSimpleObject,
        };
    });
    localStorage.setItem('idt', toBinary(JSON.stringify(cart)));
    window.dispatchEvent(new Event('storage'));
};