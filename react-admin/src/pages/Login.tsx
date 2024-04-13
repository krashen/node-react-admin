import { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import WrapperForm from '../components/WrapperForm.component'

const Login = () => {

    const [redirectAfter, setRedirectAfter] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const response = await axios.post('login', {
            email,
            password
        })

        if (response.status === 200) {
            setRedirectAfter(true)           
        }

    }

    return (
        <WrapperForm>
            {redirectAfter && <Navigate to={'/'} />}

            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Sign In</h1>

                <input
                    onChange={e => setEmail(e.target.value)} 
                    type="email" className="form-control" placeholder="Email" required />

                <input 
                    onChange={e => setPassword(e.target.value)}
                    type="password" className="form-control" placeholder="Password" required />              
                
                <button
                    className="btn btn-primary w-100 py-2" type="submit">Submit</button>
                
            </form>
        </WrapperForm>
    )
}

export default Login