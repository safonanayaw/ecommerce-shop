import { createContext } from "react";
import { products } from "../assets/assets";

// using useContext to make value attribute accesible in all components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const value = {
        products , currency , delivery_fee
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;