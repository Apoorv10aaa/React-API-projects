import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

// we use this component for security ki check karo pehle ki koi login wgaera h ki nhi tabhi le jaao
// uss route prr nhi toh wapas login..
export default function Protected({children,path}){
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();

    const authStatus=useSelector((state)=> state.status);
    useEffect(()=>{
        if(authStatus) navigate(path)
        else if(authStatus==false) navigate("/login")
        setLoading(false);
    },[authStatus,navigate])
    
    return loading ? <h1>Loading...</h1> : <>{children}</>
}