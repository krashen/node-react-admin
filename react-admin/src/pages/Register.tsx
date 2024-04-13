import { SyntheticEvent, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import WrapperForm from '../components/WrapperForm.component'

const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [redirectAfter, setRedirectAfter] = useState(false)


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const response = await axios.post('register', {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            password_confirm: passwordConfirm
        })

        if (response.status === 200) {
            setRedirectAfter(true)           
        }

    }

    return (
        <WrapperForm>
            {redirectAfter && <Navigate to={'/login'} />}

            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Register</h1>

                <input 
                    onChange={e => setFirstName(e.target.value)}
                    className="form-control" placeholder="First name" required />

                <input
                    onChange={e => setLastName(e.target.value)}
                    className="form-control"  placeholder="Last name" required />

                <input
                    onChange={e => setEmail(e.target.value)} 
                    type="email" className="form-control" placeholder="Email" required />

                <input 
                    onChange={e => setPassword(e.target.value)}
                    type="password" className="form-control" placeholder="Password" required />

                <input 
                    onChange={e => setPasswordConfirm(e.target.value)}
                    type="password" className="form-control" placeholder="Repeat password" required />
                
                <button
                    className="btn btn-primary w-100 py-2" type="submit">Submit</button>
                
            </form>
        </WrapperForm>
    )
}

export default Register