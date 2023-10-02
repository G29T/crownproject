import { createContext, useState, useContext, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';
import SHOP_DATA from '../shop-data.js';

//we want to store an array of products
export const ProductsContext = createContext({
   products: [],
});

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    //I am running the below only when the Provider gets mounted (the [])
    useEffect(() => {
        //created a new async function getCategoriesMap because getCategoriesAndDocuments is async
       //ANY async things you need to do inside useEffect wrap it inside an async function
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
        }

        getCategoriesMap(); //invoke it
    }, []); 

    const value = {products};

    return (
        <ProductsContext.Provider value={value} >{children}</ProductsContext.Provider>
    )
}

export const useCurrentProducts = () => useContext(ProductsContext);