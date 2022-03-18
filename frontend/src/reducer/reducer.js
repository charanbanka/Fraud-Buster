import {combineReducers} from 'redux'

const user = (state={users:[],link:"",isLoad:false,postOffice:{}},action)=>{
    switch(action.type){
        case "FETCHALL":
            return {...state,users:action.data}
        case "CREATE":
            return {...state,users:[...state.users,action.data.data],link:action.data.link}
        case "LOAD":
            return {...state,isLoad:true}
        case "UNLOAD":
            return {...state,isLoad:false}
        case "GETPOSTOFFICE":
            console.log(action.data)
            return {...state,postOffice:action.data}
        default:
            return state
    }
}

export default combineReducers({user})