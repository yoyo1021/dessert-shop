import { Outlet } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

function FrontLayout() {

    const [cartData,setCartData] = useState({});
    const [ _,setIsLOading] = useState(false);

    const getCart = async()=>{
        try {
            setIsLOading(true);
            const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`);
            setCartData(res.data.data);
            setIsLOading(false);
        } catch (error) {
            console.log(error)
        }
        
    }
    useEffect(()=>{
        getCart()
    },[])

    return (<>
        <Navbar cartData={cartData}/>
        
        <Outlet context={{ getCart,cartData }}></Outlet>

        <Footer />
        
    </>

    )
}

export default FrontLayout