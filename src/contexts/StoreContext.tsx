import axios from 'axios';
import { createContext, useState, useEffect, useReducer } from 'react';


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

export type CartState = {
    itemQuantity: number,
    items: {
        item: ProductType,
        quantity: number
    }[] | null
} | null

export type CartAction = {
    type: string,
    quantity: number,
    id: number
}


//handler functions for adding and removing items from cart
const handleAddToCart = (state: CartState, action: CartAction) => {
    console.log(action)
    return state;
}

const handleRemoveToCart = (state: CartState, action: CartAction) => {
    return state;
}


const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'add':
            return handleAddToCart(state, action);
        case 'remove':
            return handleRemoveToCart(state, action);
        default:
            return state
    }
}

export const StoreContextProvider = ({ children }: StoreContextProviderProps) => {

    const [products, setProducts] = useState();

    const initialCartState = {
        itemQuantity: 0,
        items: null
    }

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