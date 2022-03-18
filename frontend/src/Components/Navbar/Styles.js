import { makeStyles } from "@material-ui/core/styles";


export default makeStyles ((theme)=>({
    appBar: {
        display: 'flex',
        background: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '60px',
      },
     button:{
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
     }
}))