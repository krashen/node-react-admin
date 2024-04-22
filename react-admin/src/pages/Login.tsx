import { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import WrapperForm from '../components/WrapperForm.component'
import Message from '../components/Message.component'


const Login = () => {

    const [redirectAfter, setRedirectAfter] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(false)

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

            await axios.post('login', {
                email,
                password
            }).then(r => {
                if (r.status === 200) {
                    setRedirectAfter(true)           
                }
            }).catch(e => {
                console.log(e)
                setMessage(true)
            })

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
                {message && <Message text='Invalid credentials' color='red' /> }
                
            </form>
        </WrapperForm>
    )
}

export default Login