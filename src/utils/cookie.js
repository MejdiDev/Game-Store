const checkIsLoggedIn = () => {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const tkCookie = cookies.find(cookie => cookie.startsWith('tk='));
    return !!tkCookie;
};
const getToken = () => {
    console.log("getToken");
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const tkCookie = cookies.find(cookie => cookie.startsWith('tk='));
    console.log(tkCookie);
    if (tkCookie) {
        const tkValue = tkCookie.split('=')[1];
        return tkValue;
    } else {
        return null;
    }
}

const setToken = (token) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1); // Set expiration to 1 day from now
    const expires = expirationDate.toUTCString();
    document.cookie = `tk=${token}; expires=${expires}; path=/`;
}

export {
    checkIsLoggedIn,
    getToken,
    setToken
}