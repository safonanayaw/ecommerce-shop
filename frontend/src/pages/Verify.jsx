import React, {useContext, useEffect} from "react"

import { ShopContext } from "../context/ShopContext"
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

const Verify = () => {
    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)

    const [searchParams, setSearchParams] = useSearchParams()

    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")

    const verifyPayment = async () => {
        try{
            if(!token){
                return null
            }
            console.log("success value", success)
            console.log("orderId number ", orderId)

            const response = await axios.post(backendUrl + "/api/order/verifyStripe", {success, orderId}, {headers: {token}})
            console.log("response from server", response)
            if(response.data.success){
                setCartItems({})
                navigate("/orders")
                console.log("success payment")

            }else{
                navigate("/cart")
                console.log("failed payment")
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])

    return (
        <div>

        </div>
    )
}

export default Verify