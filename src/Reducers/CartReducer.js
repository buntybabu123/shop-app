const initialState = {
    products: [],
    totalPrice: 0,
    totalQuantities: 0,
}

const CartReducer = (state = initialState, action) => {
    let findPro;
    let index;
    switch(action.type){
        case "ADD_TO_CART":
            const {product,quantity} = action.payload;
            const check = state.products.find(prdt => prdt.id === product.id);
            if(check) {
                return state;
            }else{
                const TotalPrice = state.totalPrice + product.price * quantity;
                const TotalQuantities = state.totalQuantities + quantity;
                product.quantity = quantity;
                return {
                    ...state, products: [...state.products, product],totalPrice: TotalPrice, totalQuantities: TotalQuantities
                }
            }
            case 'INC':
                findPro = state.products.find(product => product.id === action.payload);
                index = state.products.findIndex(product => product.id === action.payload);
                console.log(findPro);
                findPro.quantity += 1;
                state.products[index] = findPro;
                return {
                    ...state, totalPrice: state.totalPrice + findPro.price, totalQuantities: state.totalQuantities + 1
                }
            case 'DEC':
                findPro = state.products.find(product => product.id === action.payload);
                index = state.products.findIndex(product => product.id === action.payload);
                if(findPro.quantity > 1){
                    findPro.quantity -= 1 ;
                    state.products[index] = findPro;
                    return {
                        ...state, totalPrice: state.totalPrice - findPro.price, totalQuantities: state.totalQuantities - 1
                    }
                }else{
                    return state;
                }
            case 'REMOVE':
                findPro = state.products.find(product => product.id === action.payload);
                const filtered = state.products.filter(product => product.id !== action.payload);
                return {
                    ...state, products: filtered, totalPrice: state.totalPrice - findPro.price * findPro.quantity, totalQuantities: state.totalQuantities - findPro.quantity
                }
        default:
            return state;
    }
}

export default CartReducer;