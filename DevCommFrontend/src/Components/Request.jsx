import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import {addRequest} from '../utils/requestSlice'



function Request() {
    const dispatch = useDispatch()

    const fetchReq = async()=>{
       try {
         const res = await axios.get(BASE_URL+'/users/requests/received')
         console.log(res,"reqdata")
        dispatch(addRequest(res.data.data))

       } catch (error) {
        console.log("request eroor"+error)
       }
    }

    useEffect(() => {
      fetchReq()
    }, [])
    

  return (
    <div>Request</div>
  )
}

export default Request