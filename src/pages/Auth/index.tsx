import React from 'react'
import { useLocation  } from 'react-router-dom'
import SignIn from '../../components/auth_signIn';
import Register from '../../components/auth_register';

const Auth:React.FC = () => {


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const key = searchParams.get('key')

    const [component, setComponent] = React.useState(<SignIn/>)

    React.useEffect(() => {
        if(key){
            setComponent(<Register/>)
        }else{
            setComponent(<SignIn/>)
        }
    }, [location])
    


    
    return (
        <>
            {component}
        </>
        )
}

export default Auth