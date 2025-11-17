import { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
const Connections = ()=>{
    const fetchConnections= async()=>{
        try{const res = await axios.get(BASE_URL+'/users/connections',
            {withCredentials:true})
            console.log(res.data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        fetchConnections()
    }, [])
    
    return(
        <>
        <h1 className=' '>Connections</h1>
        </>
    )
}

export default Connections;