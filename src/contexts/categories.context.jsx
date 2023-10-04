import { createContext, useState, useContext, useEffect } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';
import SHOP_DATA from '../shop-data.js';

//we want to store an array of products
export const CategoriesContext = createContext({
   categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    //I am running the below only when the Provider gets mounted (the [])
    useEffect(() => {
        //created a new async function getCategoriesMap because getCategoriesAndDocuments is async
       //ANY async things you need to do inside useEffect wrap it inside an async function
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap(); //invoke it
    }, []); 

    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value} >{children}</CategoriesContext.Provider>
    )
}

export const useCurrentCategories = () => useContext(CategoriesContext);