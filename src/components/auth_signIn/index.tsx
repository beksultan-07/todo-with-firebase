import React from 'react'
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setAuth } from '../../store/actions/auth';



const SignIn = () => {
    const auth = getAuth();

    const [signInData, setSignInData] = React.useState({
        email: '',
        password: ''
    })

    const [errorText, setErrorText] = React.useState('')

    const dispatch = useDispatch()

    async function signInHandler() {
        console.log(signInData);
            try {
                const userCredential = await signInWithEmailAndPassword(auth, signInData.email, signInData.password);
                const user = userCredential.user;
                
                dispatch(setAuth({
                    email: signInData.email,
                    auth: true 
                }))
                
                console.log('Пользователь успешно зарегистрирован:', user);
            } catch (error) {
                console.error('Ошибка регистрации: ', error);
                setErrorText('Registration error: ' + error)
            }

        
    }


    const nav = useNavigate()

  return (
    <Box
            component="form"
            sx={{
                maxWidth: 500,
                height: '100%',
                backgroundColor: 'rgb(255, 255, 255)',
                border: 'solid 3px #9c27b0',
                margin: '100px auto',
                padding: '20px',
                borderRadius: 2
            }}
        >
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                >
                <Typography mb={2} variant="h3" lineHeight="lg" textAlign='center'>
                    Sign In
                </Typography>
                <Typography mb={2} variant="h5" lineHeight="lg" textAlign='center' color='red'>
                    {errorText}
                </Typography>
                <TextField
                    label="Login"
                    defaultValue="Beka@gmail.com"
                    margin='normal'
                    onChange={(e) => setSignInData((state) => ({ ...state, email: e.target.value }))}
                />
                    <TextField
                    label="Password"
                    margin='normal'
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setSignInData((state) => ({ ...state, password: e.target.value }))}
                />
                <Button style={{margin: '20px 0'}}  variant='contained' color='secondary' onClick={signInHandler}>
                    Sign in
                </Button>
                <Button onClick={() => nav('/auth?key=register')}>
                    Register
                </Button>
            
            </Grid>
        </Box>
  )
}

export default SignIn