import axios from 'axios';
import { useParams } from 'react-router-dom';

const API = axios.create({baseURL:"http://localhost:5000"})


export const getUsers = () => async(dispatch)=>{
    try {
        const {data} = await API.get('/')

        dispatch({type:"FETCHALL",data})
    } catch (error) {
        console.log(error)
    }
}

export const postUser = (user) => async(dispatch)=>{
    try {
        dispatch({type:"LOAD"})
        const {data} = await API.post('/',user)

        alert("status: ok, message: user successfully created")
        
        dispatch({type:"CREATE",data})
        dispatch({type:"UNLOAD"})
    } catch (error) {
        console.log(error)
        alert(error.message)
    }
}

export const getPostOffice = (pincode)=>async(dispatch) =>{
    
    try {
        const {data} = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)

        //console.log(data[0].PostOffice[0])
        dispatch({type:"GETPOSTOFFICE",data:data[0].PostOffice[0]})
    } catch (error) {
        console.log(error)
    }
}