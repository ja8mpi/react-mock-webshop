import axios from 'axios';
import { createContext, useState, useEffect, useReducer, useContext } from 'react';
import AuthContext from './AuthContext';


export type ProductType = {
    id: number,
    name: string,
    src: string,
    category: {},
    price: number,
    productionYear: number,
    description: string
}

type StoreContextType = {
    products?: [ProductType] | undefined,
    setProducts: React.Dispatch<React.SetStateAction<undefined>> | undefined
    cart: CartState
    dispatchCart: React.Dispatch<CartAction>,
    getItemQuantity?: (id: number) => number
    increaseCartQuantity?: (id: number) => void
    decreaseCartQuantity?: (id: number) => void
    removeFromCart?: (id: number) => void
}
export type StoreContextProviderProps = {
    children: React.ReactNode
}


export const getItemQuantity = (id: number) => { }
export const increaseCartQuantity = (id: number) => { }
export const decreaseCartQuantity = (id: number) => { }
export const removeFromCart = (id: number) => { }


export const StoreContext = createContext<StoreContextType>({} as StoreContextType);

export type CartItemType = {
    id: number
    quantity: number
}

export type CartState = {
    itemQuantity: number,
    items: CartItemType[]
}

export type CartAction = {
    type: string,
    quantity: number,
    id: number
}

type CartActionWithOptions = {

}

//handler functions for adding and removing items from cart
const handleAddToCart = (state: CartState, action: CartAction): CartState => {
    let newItems = [];
    if (!state?.items.some(item => item.id === action.id)) {
        newItems = [...state?.items, {
            id: action.id,
            quantity: action.quantity
        }]
    }
    else {
        newItems = state.items.map(item => {
            if (item.id === action.id)
                return { ...item, quantity: item.quantity + action.quantity };
            return item;
        });
    }

    return { itemQuantity: state.itemQuantity + action.quantity, items: newItems }
}


const handleDecreaseFromCart = (state: CartState, action: CartAction) => {
    let newItems = state.items.map(item => {
        if (item.id === action.id)
            return { ...item, quantity: item.quantity - action.quantity };
        return item;
    });

    return { itemQuantity: state.itemQuantity - action.quantity, items: newItems }
}

const handleIncreaseCart = (state: CartState, action: CartAction) => {
    let newItems = state.items.map(item => {
        if (item.id === action.id)
            return { ...item, quantity: item.quantity + action.quantity };
        return item;
    });

    return { itemQuantity: state.itemQuantity + action.quantity, items: newItems }
}


const handleRemoveToCart = (state: CartState, action: CartAction) => {
    let newItems = state.items.filter(item => { return item.id !== action.id });

    return { itemQuantity: state.itemQuantity - action.quantity, items: newItems }
}

const handleEmptyCart = (state: CartState, action: CartAction) => {
    return initialCartState;
}

const handleOrderByCart = (state: CartState, action: CartAction) => {

}


const cartReducer = (state: CartState, action: CartAction): CartState => {

    switch (action.type) {
        case 'add':
            return handleAddToCart(state, action);
        case 'decrease':
            return handleDecreaseFromCart(state, action);
        case 'increase':
            return handleIncreaseCart(state, action);
        case 'remove':
            return handleRemoveToCart(state, action);
        case 'empty':
            return handleEmptyCart(state, action);
        default:
            return state
    }
}

const initialCartState = {
    cartSize: 0,
    itemQuantity: 0,
    items: []
}

export const StoreContextProvider = ({ children }: StoreContextProviderProps) => {
    const [products, setProducts] = useState();


    const [cart, dispatch] = useReducer(cartReducer, initialCartState);

    useEffect(() => {
        const fetchMyData = async () => {
            const { data } = await axios.get(`http://localhost:5000/products`)

            if (data) {
                setProducts(data);
            } else {
                // There was an error fetching the data
            }
        };

        fetchMyData();
    }, []);


    return (
        <StoreContext.Provider
            value={{
                products,
                setProducts,
                dispatchCart: dispatch,
                cart
            }}
        >
            {children}
        </StoreContext.Provider>
    )
}