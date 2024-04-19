import { SyntheticEvent, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Wrapper from '../../components/Wrapper.component'
import { capitalizeWord } from '../../utils'
import axios from 'axios'
import '../../Form.css'

type RoleType = {
    id: number;
    name: string;
}

const UsersCreate = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [roleId, setRoleId] = useState('')
    const [roles, setRoles] = useState([])
    const [redirectAfter, setRedirectAfter] = useState(false)

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('roles')
                    setRoles(data)
                } catch(e) {
                    console.log(e)
                }
                
            }
        )()
    }, [])

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const response = await axios.post('users',{
                first_name: firstName,
                last_name: lastName,
                email,
                role_id: roleId
            })
            console.log(response)
            if (response.status === 201) {
                setRedirectAfter(true)           
            }
        } catch(e) {
            console.log(e)
        }

    }

    return (
        <Wrapper>
            {redirectAfter && <Navigate to={'/users'} />}
            <div className='form-signin form-add w-100 m-auto'>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Add User</h1>

                    <input
                        className="form-control" 
                        placeholder="First name"
                        onChange={e => setFirstName(e.target.value)}
                        required 
                    />
                    
                    <input
                        className="form-control" 
                        placeholder="Last name"
                        onChange={e => setLastName(e.target.value)}
                        required 
                    />

                    <input
                        type="email" 
                        className="form-control" 
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email" 
                        required 
                    />

                    <select 
                        className='form-control'
                        onChange={e => setRoleId(e.target.value)}
                    >
                        {
                            roles.map((r: RoleType) => {
                                return (
                                    <option key={r.id} value={r.id}>{capitalizeWord(r.name)}</option>
                                )
                            })
                        }
                    </select>
                    
                    <button
                        className="btn btn-primary w-100 py-2" type="submit">Add</button>
                    
                </form>
            </div>
        </Wrapper>
    )
}

export default UsersCreate