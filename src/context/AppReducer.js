
export default (state, action)=>{
    switch (action.type){
        case 'SEARCH_PRODUCT':
            return {
                ...state,
            products: state.defaultProduct.filter(product =>{
                return product.name.includes(action.payload);
            })}
            // return Object.assign({}, state, {
            //     products: state.products.filter(product =>{
            //        return product.name.includes(action.payload)})
            // })

        case 'SORT_ASC': return {
            ...state,
            products: state.products.sort((a,b)=> {
                return parseInt(a.cost) - parseInt(b.cost);
            })
        }
        case 'SORT_DSC': return {
            ...state,
            products:state.products.sort((a,b)=> {
                return parseInt(b.cost) - parseInt(a.cost);
            })
        }

        case 'TYPE_FILTER': return {
            ...state,
            products: state.defaultProduct.filter(product=> {

                // return product.type.includes(action.payload);
                return action.payload.has(product.type);
            })
        }
        case 'COMPANY_FILTER': return {
            ...state,
            products: state.defaultProduct.filter(product=> {

                // return product.type.includes(action.payload);
                return action.payload.has(product.brand);
            })
        }

        default:
            return state;
    }
}
