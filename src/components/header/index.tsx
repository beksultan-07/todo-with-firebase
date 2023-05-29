import React from 'react'
import { Grid, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../store/actions/auth'
import {useNavigate} from 'react-router-dom'

const Header = () => {

    const dispatch = useDispatch()

    const nav = useNavigate()

    function logOutHandler(){
        dispatch(setAuth({auth: false, email: ''}))
    }
  return (
    <Grid
        container
        justifyContent='space-between'
    >
        <Button onClick={() => nav('/')}>
            my to do
        </Button>
        <Button onClick={logOutHandler}>
            log out
        </Button>
    </Grid>
  )
}

export default Header