import { CircularProgress, Container, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

const UserResponse = () => {
    const {isLoad} = useSelector((state)=>state.user)

    if(isLoad) return <CircularProgress/>
  return (
    <Container maxWidth="sm">
        <Paper elevation={4} style={{padding:"4rem"}}>
            <Typography color="inherit" style={{background:"#00e676", padding:"5px"}} >You have successfully registered, Please check your mail </Typography>
        </Paper>
    </Container>
  )
}

export default UserResponse