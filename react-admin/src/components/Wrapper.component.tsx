import React, { useEffect, useState } from 'react';
import Nav from './Nav.component'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


type Props = {
    children: React.ReactNode;
}

const Wrapper = ({children}: Props) => {

    const emptyUser = {
        id : 0,
        first_name: '',
        last_name: '',
        email: ''
    }    

    const [redirectToLogin, setRedirectToLogin] = useState(false)
    const [user, setUser] = useState(emptyUser)
    
    useEffect(()=> {    
        (async () => {
            try {
                const {data} = await axios.get('user')
                setUser(data)
            } catch(e) {
                console.log(e)
                setRedirectToLogin(true)
            }
        })()
    }, [])

    const handleLogOut = async () => {
        await axios.post('logout', {})
    }

    if (redirectToLogin) return <Navigate to={'/login'} />
    return (
        <div className='row'>
            <div className='head-nav'>
                <Link to={'/login'} className='logout-link' onClick={handleLogOut}>Log out</Link>
                <Link to={'/profile'} className='profile-link'>{`${user.first_name} ${user.last_name}`}</Link>
            </div>                     
            <Nav />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">                             
                {children}
            </main>
        </div>
    )
}

export default Wrapper