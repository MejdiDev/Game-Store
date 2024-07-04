const currencies = [
    { name: "Eur", logo: "€" },
    { name: "Usd", logo: "$" },
    { name: "Pln", logo: "zł" },
    { name: "Gbp", logo: "£" },

]
export const getCurrencyLogo = () => {
    const currency = localStorage.getItem("currency") || "Eur";
    const item = currencies.find(c => c.name === currency);
    return item ? item.logo : '€';
};
export const getCurrentCurrency = () => {
    const item = currencies.find(c => c.name === localStorage.getItem("currency"));
    return item ? item.name : 'Eur';
}