import { createContext, useState, useEffect, useContext } from 'react';
import PRODUCTS from '../shop-data.json'

//we want to store an array of products
export const ProductsContext = createContext({
   products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = {products};
    return (
        <ProductsContext.Provider value={value} >{children}</ProductsContext.Provider>
    )
}

export const useCurrentProducts = () => useContext(ProductsContext);