import React, {createContext, useReducer,useEffect} from "react";
import AppReducer from './AppReducer';
import {createStore} from 'redux';

const products=[
    {id: 1, name: 'name1', brand: 'company1', img: 'https://fk.by/uploads/images/cache/2019/04/01/noutbuk-asus-vivobook-15-r564ua-ej119-1100x500.jpg', description: 'description1', cost: 10, type: 'computer'},
    {id: 2, name: 'name2', brand: 'company2', img: 'https://nsv.by/upload/image_resize/78f/824/6392bb06724cdae3b5f76ad8116d64c6.jpg', description: 'description2', cost: 11, type: 'phone'},
    {id: 3, name: 'name3', brand: 'company1', img: 'https://fk.by/uploads/images/cache/2019/04/01/noutbuk-asus-vivobook-15-r564ua-ej119-1100x500.jpg', description: 'description3', cost: 9, type: 'computer'},
    {id: 4, name: 'name4', brand: 'company4', img: 'https://fk.by/uploads/images/cache/2019/04/01/noutbuk-asus-vivobook-15-r564ua-ej119-1100x500.jpg', description: 'description4', cost: 25, type: 'computer'},
    {id: 5, name: 'name5', brand: 'company5', img: 'https://fk.by/uploads/images/cache/2019/04/01/noutbuk-asus-vivobook-15-r564ua-ej119-1100x500.jpg', description: 'description5', cost: 1, type: 'computer'},
    {id: 6, name: 'name6', brand: 'company6', img: 'https://nsv.by/upload/image_resize/78f/824/6392bb06724cdae3b5f76ad8116d64c6.jpg', description: 'description6', cost: 45, type: 'phone'},
    {id: 7, name: 'name7', brand: 'company7', img: 'https://fk.by/uploads/images/cache/2019/04/01/noutbuk-asus-vivobook-15-r564ua-ej119-1100x500.jpg', description: 'description7', cost: 3, type: 'computer'},
    {id: 8, name: 'name8', brand: 'company7', img: 'https://fk.by/uploads/images/cache/2019/04/01/noutbuk-asus-vivobook-15-r564ua-ej119-1100x500.jpg', description: 'description8', cost: 12, type: 'computer'},
    {id: 9, name: 'name9', brand: 'company9', img: 'https://mobile-review.com/news/wp-content/uploads/Lenovo-M10-Plus.jpg', description: 'description9', cost: 30, type: 'tablet'},
    {id: 10, name: 'name10', brand: 'company9', img: 'https://fk.by/uploads/images/cache/2019/04/01/noutbuk-asus-vivobook-15-r564ua-ej119-1100x500.jpg', description: 'description10', cost: 10, type: 'computer'},
    {id: 11, name: 'name11', brand: 'company9', img: 'https://fk.by/uploads/images/cache/2019/04/01/noutbuk-asus-vivobook-15-r564ua-ej119-1100x500.jpg', description: 'description11', cost: 18, type: 'computer'},
];

const initialState = {
    products,
    defaultProduct: products
}

export const GlobalContext = createContext(initialState);



export const GlobalProvider =({children})=>{
    const [state, dispatch] = useReducer(AppReducer, initialState);


    const searchProduct = (name)=>{
        dispatch({
            type: 'SEARCH_PRODUCT',
            payload: name
        })
    }
    // store.dispatch({
    //     type: 'SEARCH_PRODUCT',
    //     payload: name
    // })
    const sortAsc=(products)=>{
        dispatch({
            type: 'SORT_ASC',
            payload: products,
        })
    }
    const sortDsc=(products)=>{
        dispatch({
            type: 'SORT_DSC',
            payload: products,
        })
    }

    const typeFilter=(types)=>{
        dispatch({
            type: 'TYPE_FILTER',
            payload: types,
        })
    }
    const companyFilter=(companies)=>{
        dispatch({
            type: 'COMPANY_FILTER',
            payload: companies,
        })
    }


    return (
        <GlobalContext.Provider value={{products: state.products, defaultProduct:state.defaultProduct, view: state.view, searchProduct, sortAsc,sortDsc, typeFilter,companyFilter}}>
            {children}
        </GlobalContext.Provider>
    )
}
