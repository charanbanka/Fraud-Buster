import { Box, Button, Divider, Grid, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../action/action'
import { Country ,State, City} from 'country-state-city'

const Home = () => {
  const {users} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const [showUsers,setShowUsers] = useState(false)
  const [country,setCountry] = useState(false)
  const [state,setState] = useState(false)
  const [city,setCity] = useState(false)
  const [countryId,setCountryId] = useState("")
  const [stateId,setStateId] = useState("")
  const [states,setStates] = useState([])
  const [cities,setCities] = useState([])

  useEffect(()=>{
    dispatch(getUsers())
  },[])
  useEffect(()=>{
   setStates(State.getStatesOfCountry(countryId))
  },[countryId])
  useEffect(()=>{
    setCities(City.getCitiesOfState(countryId,stateId))
  },[stateId])
  console.log(state)
  const countries = Country.getAllCountries()
  return (
    <Grid container >
      <Grid item xs={3}>
          <Button variant='contained' onClick={()=>setCountry(!country)} >Get countries</Button>
          { country && (
            <div  >
              <Typography style={{padding:"1rem"}}>Country Names</Typography>
              {countries?.map((country)=>(
                <Box key={country.isoCode}>
                  <Typography>{country.name}</Typography>
                  <Divider/>
                </Box>
              ))}
              </div>
          ) }
      </Grid>
      <Grid item xs={3}>
        <Button variant='contained' onClick={()=>setState(!state)}>Get states of country</Button>
        
        {state && (
          <div style={{padding:"1rem"}}>
            <TextField value={countryId} label="Country Code" size='small' onChange={(e)=>setCountryId(e.target.value)} required ></TextField>     
            <Typography style={{padding:"1rem"}}>States</Typography>     
               {states?.map((stat)=>(
                <Box key={stat.isoCode}>
                  <Typography>{stat.name}</Typography>
                  <Divider/>
                </Box>
              ))
             }
            
          </div>
        )}
      </Grid>
      <Grid item xs={3}>
       <Button variant='contained' onClick={()=>setCity(!city)}>Get all cities in state</Button>
       {city && (
         <div style={{padding:"1rem"}}>
           <TextField value={countryId} label="Country Code" size='small' onChange={(e)=>setCountryId(e.target.value)} required ></TextField>
           <TextField value={stateId} label="State Code" size='small' onChange={(e)=>setStateId(e.target.value)} required ></TextField>
           <Typography style={{padding:"1rem"}}>Cities</Typography> 
           {cities?.map((city)=>(
             <Box key={city.name}>
               <Typography>{city.name}</Typography>
               <Divider/>
             </Box>
           ))}
         </div>
       )}
      </Grid>
      <Grid item xs={3}>
       <Button variant='contained'onClick={()=>setShowUsers(!showUsers)} >Get all users</Button>
       {showUsers && (
         users?.map((user)=>(
           <Box key={user._id} style={{padding:"1rem"}}>
             <Typography >userId: {user._id}</Typography>
             <Typography>Name: {user.firstname} {user.lastname}</Typography>
             <Typography>Country: {user.country}</Typography>
             <Divider/>
           </Box>
         ))
       )}
      </Grid>
    </Grid>
  )
}

export default Home