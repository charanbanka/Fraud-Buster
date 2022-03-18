import { Box, Button, Container,FormControl, InputLabel, MenuItem, Paper, Select, TextField, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Styles from './Styles'
import FileBase from 'react-file-base64'
import {useDispatch, useSelector} from 'react-redux'
import { Country ,State, City} from 'country-state-city'
import { getPostOffice, postUser } from '../../action/action'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
    const initialValues = {
        "firstname":"","lastname":"","email":"","country":"","state":"","city":"","postoffice":"",
        "pincode":"","adharno":"","dob":"","profileimage":"","address":[]
    }
   const initialAdresses = {address_1:"",address_2:"",address_3:""}
    
    const [formData,setFormData] = useState(initialValues)
    
    const [isSubmit,setIsSubmit] = useState(false)
    const [formErrors,setFormErrors] = useState({})
    const [states,setStates] = useState([])
    const [cities,setCities] = useState([])
    const [addresses,setAddresses] = useState(initialAdresses)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {postOffice} = useSelector((state)=>state.user)
    const handleChange= (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
        if(e.target.name==="pincode" && e.target.value.length===6)
            dispatch(getPostOffice(e.target.value))
        
    }
    useEffect(()=>{
        if(postOffice) setFormData({...formData,postoffice:postOffice?.Name})
    },[postOffice])
    const handleAddress = (e)=>{
        setAddresses({...addresses,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        setFormErrors(validate(formData))
        setIsSubmit(true)
        
    }
    const validate = (data)=>{
        const errors = {}
        if (data?.firstname?.length<4) errors.firstname ="Please enter valid firstname!"
        if (data?.lastname?.length<4) errors.lastname ="Please enter valid lastname!"
        //if (data.email.length<4) errors.firstname ="Please enter valid name"
        if (data?.pincode?.length!==6) errors.pincode = "Pincode must be 6 digits!"
        if(data?.adharno?.length!==12) errors.adharno = "Adhar number must be 12 digits!"
        if(data?.profileimage=="") errors.profileimage = "Please Upload profile picture"
        return errors
    }
    const handleClear = ()=>{
        setFormData(initialValues)
        setAddresses(initialAdresses)
    }
    useEffect(()=>{
        setFormData({...formData,address:[addresses?.address_1,addresses?.address_2,addresses?.address_3]})
    },[addresses])
    
    useEffect(()=>{
        
        if(Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formData)
            dispatch(postUser({...formData,country:formData.country.split(" ")[1]}))
            setFormData(initialValues)
            setAddresses(initialAdresses)
            navigate('/userResponse')
        }
    },[formErrors])
    useEffect(()=>{
        if(formData?.country) {
            
            setStates(State.getStatesOfCountry(formData?.country.split(" ")[0]))
        }
    },[formData?.country])

    useEffect(()=>{
        if(formData?.state)
        {
            setCities(City.getCitiesOfState(formData?.country.split(" ")[0] ,formData?.state.split(" ")[0]))
        }
    },[formData?.state])
    const classes = Styles()
    
    const countries = Country.getAllCountries()

    const textfileds = [{name:"firstname",type:"text"},{name:"lastname",type:"text"},{name:"email",type:"email"},{name:"dob",type:"date"}]
    console.log(formData?.profileimage)
  return (
    <Container className={classes.container}>
        <Typography color='secondary' variant='h4' className={classes.maintext} sx={{mb:2}} align='center' >Enter User Details</Typography>
        <Paper component="form"  onSubmit={handleSubmit} autoComplete="off" >
            {
                textfileds.map((item)=>(
                    <Box className={classes.box} key={item.name}>
                        <TextField type={item.type} name={item.name} label={item.name} variant="outlined" required fullWidth
                            size='small' value={formData[item.name]} onChange={handleChange}
                            error={formErrors[item.name]?.length>0} helperText={formErrors[item.name]}
                        />
                    </Box>
                ))
            }
            <Box className={classes.box}>
                <FormControl fullWidth>
                    <InputLabel id="country">Country</InputLabel>
                    <Select 
                        labelId="country"
                        name="country"
                        value={formData.country}
                        label="Country"
                        onChange={handleChange}
                        variant="standard"
                        required
                    >
                        {countries.map((country)=>(
                            <MenuItem key={country.isoCode} value={country.isoCode+" "+country.name}>{country.name}</MenuItem>
                        ))}
                    </Select>
                    </FormControl>
            </Box>
            <Box className={classes.box}>
                <FormControl fullWidth>
                    <InputLabel id="state">State</InputLabel>
                    <Select
                        labelId="state"
                        name="state"
                        value={formData.state}
                        label="State"
                        onChange={handleChange}
                        variant="standard"
                        required
                    >
                        {states.map((state)=>(
                            <MenuItem key={state.isoCode+state.name} value={state.isoCode+" "+state.name}>{state.name}</MenuItem>
                        ))}
                    </Select>
                    </FormControl>
            </Box>
            <Box className={classes.box}>
                <FormControl fullWidth>
                    <InputLabel id="city">City</InputLabel>
                    <Select
                        labelId="city"
                        name="city"
                        value={formData.city}
                        label="City"
                        onChange={handleChange}
                        variant="standard"
                        required
                    >
                        {cities.map((city)=>(
                            <MenuItem key={city.name} value={city.name}>{city.name}</MenuItem>
                        ))}
                    </Select>
                    </FormControl>
            </Box>
           
            <Box className={classes.box}>
            <TextField variant='outlined' type="number" name='pincode' label="Pincode" value={formData?.pincode} 
                        onChange={handleChange} error={formErrors?.pincode?.length>0} size="small"
                        helperText={formErrors?.pincode} required fullWidth 
                        onKeyPress={(e) => { formData.pincode.length === 6 && e.preventDefault(); }}
                />
            </Box>
            <Box className={classes.box}>
            <TextField variant='outlined' type="text" name='postoffice' label="Postoffice" value={formData.postoffice} 
                         size="small" required fullWidth 
                />
            </Box>
            <Box className={classes.box}>
            <TextField variant='outlined' type="number" name='adharno' label="Adhar Number" value={formData?.adharno} 
                        onChange={handleChange} error={formErrors?.adharno?.length>0} size="small"
                        helperText={formErrors?.adharno} required fullWidth 
                        onKeyPress={(e) => { formData.adharno.length === 12 && e.preventDefault(); }}
                />
            </Box>
            <Box className={classes.box}>
            <TextField variant='outlined' type="text" multiline maxRows={4} name='address_1' label="Address-1" value={addresses.address_1} 
                        onChange={handleAddress} required fullWidth 
                />
            </Box>
            <Box className={classes.box}>
            <TextField variant='outlined' type="text" multiline maxRows={4} name='address_2' label="Address-2" value={addresses.address_2} 
                        onChange={handleAddress}  fullWidth 
                />
            </Box>
            <Box className={classes.box}>
            <TextField variant='outlined' type="text" multiline maxRows={4} name='address_3' label="Address-2" value={addresses.address_3} 
                        onChange={handleAddress}  fullWidth 
                />
            </Box>
            <Box className={classes.profile}>
                <InputLabel style={{marginBottom:"10px"}}>Profile Picture</InputLabel>
                <FileBase required type="file"  multiple={false} onDone={({base64})=>setFormData({...formData,profileimage:base64})} />
                {formErrors?.profileimage && <Typography color='secondary'>{formErrors?.profileimage}</Typography>}
            </Box>
            
            <Box className={classes.submit}  >
                <Button type="submit" variant='contained' color="primary" style={{marginRight:"1.5rem"}} >Submit</Button>
                <Button color="secondary" variant='contained' onClick={handleClear}>Clear</Button>
            </Box>
           
        </Paper>
    </Container>
    
  )
}

export default Profile