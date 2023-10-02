import { createContext, useState, useContext, useEffect } from 'react';
import PRODUCTS from '../shop-data.js'
import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils.js';
import SHOP_DATA from '../shop-data.js';

//we want to store an array of products
export const ProductsContext = createContext({
   products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const value = {products};

    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA)
    }, []);

    return (
        <ProductsContext.Provider value={value} >{children}</ProductsContext.Provider>
    )
}

export const useCurrentProducts = () => useContext(ProductsContext);