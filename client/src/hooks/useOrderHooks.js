import { useState, useEffect } from "react"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const baseUrl = "http://localhost:4001/api/order"

const useOrderHooks = () => {
    const [data, setData] = useState()
    const [orderId, setOrderId] = useState()
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)

    useEffect(() => {
      get_slices()
    }, [])


    const get_slices = () => {
        axios.get(`${baseUrl}/getSlicesList`).then(response => {
            console.log({response})
            setData(response.data)
        }).catch(err => {
            console.log({err})
            setError(err.message)
        })
    }

    const add_burger = (body) => {
        setLoading(true)
        axios.post(`${baseUrl}/addOrder`,body).then(response => {
            console.log({response})
            return response.data.result
        }).catch(err => {
            console.log({err})
            setError(err)
        }).finally(() => {
            setLoading(false)
        })
    }

    const get_ordered_burger = (body) => {
        axios.post(`${baseUrl}/getBurger`,body).then(response => {
            console.log({response})
        }).catch(err => {
            console.log({err})
        })
    }

    return {data,loading,error,get_ordered_burger,add_burger,orderId}
}

export default useOrderHooks