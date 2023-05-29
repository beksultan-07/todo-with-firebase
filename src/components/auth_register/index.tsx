import React from 'react'
import { Box, TextField, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, push, } from "firebase/database";
import { setAuth } from '../../store/actions/auth';
import { taskType } from '../owner_todo';


export interface UserType {
    email: string,
    name: string,
    tasks: Array<taskType>,
    photo: string,
    hash?: string,
}

const Register = () => { 
    const auth = getAuth();

    const [signInData, setSignInData] = React.useState({
        email: '',
        name: '',
        password: '',
        password2: ''
    })

    const [errorText, setErrorText] = React.useState('')

    const dispatch = useDispatch()

    const database = getDatabase();


    const nav = useNavigate()

    function registerHandler() {
        console.log(signInData);
        if(signInData.password === signInData.password2){
            createUserWithEmailAndPassword(auth, signInData.email, signInData.password)
            .then(() => {
                const user: UserType = {
                    email: signInData.email,
                    name: signInData.name,
                    photo: '',
                    tasks: []
                };

                push(ref(database, 'users'), user)
                    .then(() => {
                        console.log("Data was successfully added to the database");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                    
                dispatch(setAuth({
                    email: signInData.email,
                    auth: true 
                }))
                
                console.log('Пользователь успешно зарегистрирован:', user);
                
            }).catch((error) => {
                console.error('Ошибка регистрации: ', error);
                setErrorText('Registration error: ' + error)
            });
                
        }else{
            setErrorText("The passwords don't match")
        }

        
    }

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
                    Register
                </Typography>
                <Typography mb={2} variant="h5" lineHeight="lg" textAlign='center' color='red'>
                    {errorText}
                </Typography>
                <TextField
                    id="outlined-disabled"
                    label="Login"
                    defaultValue="Beka"
                    margin='normal'
                    onChange={(e) => setSignInData((state) => ({ ...state, email: e.target.value }))}
                />
                <TextField
                    label="Name"
                    defaultValue="Beka"
                    margin='normal'
                    onChange={(e) => setSignInData((state) => ({ ...state, name: e.target.value }))}
                />
                <TextField
                    label="Password"
                    margin='normal'
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setSignInData((state) => ({ ...state, password: e.target.value }))}
                />
                
                <TextField
                    label="Confirm password"
                    margin='normal'
                    type="password"
                    autoComplete="current-password"
                    onChange={(e) => setSignInData((state) => ({ ...state, password2: e.target.value }))}
                />
                <Button style={{margin: '20px 0'}}  variant='contained' color='secondary' onClick={() => registerHandler()}>
                    Register
                </Button>
                <Button onClick={() => nav('/auth')}>
                    Sign In
                </Button>
            
            </Grid>
        </Box>
    )
}

export default Register