import { makeStyles } from "@material-ui/core/styles";


export default makeStyles((theme)=>({
    container:{
        width:"600px"
    },
    maintext:{
        marginBottom:theme.spacing(1),
    },
    form:{
        display: "flex",
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:"center"
    },
    box:{
        //marginTop:theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight:theme.spacing(2),
        paddingTop:theme.spacing(1.5),
        display: "flex",
        justifyContent:"Space-around",
        alignItems:"center"
    },
   
    button:{
        marginTop:theme.spacing(2),
        marginRight:theme.spacing(2),
        marginBottom:theme.spacing(2),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
     },
     profile:{
         padding:theme.spacing(2)
     },
     submit:{
        paddingLeft: theme.spacing(2),
        paddingRight:theme.spacing(2),
        paddingTop:theme.spacing(1),
        paddingBottom:theme.spacing(2),
     }
}))