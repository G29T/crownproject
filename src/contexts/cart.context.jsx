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

const removeCartItem = (cartItems, productToRemove) => {

    const foundProductToRemove = cartItems.find((cartItem) => cartItem.id === productToRemove.id);
    
    if(foundProductToRemove.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map(
        (cartItem) => cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    );
}

const clearCartItem = (cartItems, productToClear) => cartItems.filter(cartItem => cartItem.id !== productToClear.id);

export const CartContext = createContext({
   isCartOpen: false,
   setIsCartOpen: () => {},
   cartItems: [],
   addItemToCart: () => {},
   cartCount: 0,
   removeItemFromCart: () => {},
   clearItemFromCart: () => {},
   cartTotal: 0
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    // useEffect we pass it a callback
    //& the callback runs everytime smth in your array dependency cartItmes changes
    //so, everytime the cartItems array changes in any way we need to recalculate the cart count
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };

    return (
        <CartContext.Provider value={value} >{children}</CartContext.Provider>
    )
}

export const useCurrentCartDropdownState = () => useContext(CartContext);