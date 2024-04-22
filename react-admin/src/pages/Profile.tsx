import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import Wrapper from '../components/Wrapper.component'
import axios from 'axios'
import '../Form.css'
import Message from '../components/Message.component'

const Profile = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)
    const [userUpdatedMessage, setUserUpdatedMessage] = useState(false)
    const [passwordUpdatedMessage, setPasswordUpdatedMessage] = useState(false)

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('user')

                    setFirstName(data.first_name)
                    setLastName(data.last_name)
                    setEmail(data.email)
                   
                } catch(e) {
                    console.log(e)
                }
                
            }
        )()
    }, [])

    const handleSubmitProfileUpdate = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const response = await axios.put('user/info',{
                first_name: firstName,
                last_name: lastName,
                email,
            })
            console.log(response)
            if (response.status === 200) {
                setUserUpdatedMessage(true)           
            }
        } catch(e) {
            console.log(e)
        }

    }

    const handleSubmitPasswordChange = async (e: SyntheticEvent) => {
        e.preventDefault()

        if (password.length < 4) {
            window.alert('Password should be at least 4 characters long')
            return
        }

        if (password !== passwordConfirm) {
            
            window.alert('Passwords don\'t match')
            return
        }

        try {
            const response = await axios.put('user/password',{
                password,
                password_confirm: passwordConfirm
            })
            console.log(response)
            if (response.status === 200) {
                setPasswordUpdatedMessage(true) 
                if (passwordRef.current && passwordConfirmRef.current) {
                    passwordRef.current.value = ''          
                    passwordConfirmRef.current.value = ''
                }          
            }
        } catch(e) {
            console.log(e)
        }

    }

    return (
        <Wrapper>
            <div className='form-signin form-add w-100 m-auto'>
                <form onSubmit={handleSubmitProfileUpdate}>
                    <h1 className="h6 mb-3 fw-normal">Profile Information</h1>

                    <input
                        className="form-control" 
                        placeholder="First name"
                        defaultValue={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        required 
                    />
                    
                    <input
                        className="form-control" 
                        placeholder="Last name"
                        defaultValue={lastName}
                        onChange={e => setLastName(e.target.value)}
                        required 
                    />

                    <input
                        type="email" 
                        className="form-control" 
                        defaultValue={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email" 
                        required 
                    />
                    {userUpdatedMessage && <Message text={"Profile updated!"} />}
                    <button
                        className="btn btn-primary w-100 " type="submit">Save</button>
                    
                </form>
                <form onSubmit={handleSubmitPasswordChange}>
                    <h2 className="h6 mb-3 fw-normal">Change Password</h2>
                    
                    <input
                        className="form-control" 
                        placeholder="New password"
                        type="password"
                        ref={passwordRef}
                        onChange={e => setPassword(e.target.value)}
                        required 
                    />
                    
                    <input
                        className="form-control" 
                        placeholder="Confirm password"
                        type="password"
                        ref={passwordConfirmRef}
                        onChange={e => setPasswordConfirm(e.target.value)}
                        required 
                    /> 
                    {passwordUpdatedMessage && <Message text={"Password updated!"} />}                   
                    <button
                        className="btn btn-primary w-100" type="submit">Change</button>
                    
                </form>
            </div>
        </Wrapper>
    )
}

export default Profile