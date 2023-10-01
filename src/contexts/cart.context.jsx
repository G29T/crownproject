import { createContext, useState, useContext, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains productToAdd
    const foundProductToAdd = cartItems.find((item) => item.id === productToAdd.id);

    //if found increment quantity
    if(foundProductToAdd){
        return cartItems.map(
            (cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        )
    } 
 
    //return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
   isCartOpen: false,
   setIsCartOpen: () => {},
   cartItems: [],
   addItemToCart: () => {},
   cartCount: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    // useEffect we pass it a callback
    //& the callback runs everytime smth in your array dependency cartItmes changes
    //so, everytime the cartItems array changes in any way we need to recalculate the cart count
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount };

    return (
        <CartContext.Provider value={value} >{children}</CartContext.Provider>
    )
}

export const useCurrentCartDropdownState = () => useContext(CartContext);