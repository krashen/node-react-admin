import { SyntheticEvent, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Wrapper from '../../components/Wrapper.component'
import axios from 'axios'
import '../../Form.css'

interface MatchParams {
    name: string;
}



type RoleType = {
    id: number;
    name: string;
}

const UsersEdit = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [roleId, setRoleId] = useState('')
    const [roles, setRoles] = useState([])
    const [redirectAfter, setRedirectAfter] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        (
            async () => {
                try {
                    const response = await axios.get('roles')
                    const {data} =  await axios.get(`users/${id}`)

                    setRoles(response.data)

                    setFirstName(data.first_name)
                    setLastName(data.last_name)
                    setEmail(data.email)
                    setRoleId(data.role.id)


                } catch(e) {
                    console.log(e)
                }
                
            }
        )()
    }, [])

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const response = await axios.put(`users/${id}`,{
                first_name: firstName,
                last_name: lastName,
                email,
                role_id: roleId
            })
            console.log(response)
            if (response.status === 202) {
                setRedirectAfter(true)           
            }
        } catch(e) {
            console.log(e)
        }

    }

    const capitalizeWord = (w: string): string => {
        return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() 
    }

    return (
        <Wrapper>
            {redirectAfter && <Navigate to={'/users'} />}
            <div className='form-signin form-add w-100 m-auto'>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Edit User</h1>

                    <input
                        className="form-control"
                        defaultValue={firstName} 
                        placeholder="First name"
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

                    <select 
                        className='form-control'
                        onChange={e => setRoleId(e.target.value)}
                        value={roleId} 
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
                        className="btn btn-primary w-100 py-2" type="submit">Save</button>
                    
                </form>
            </div>
        </Wrapper>
    )
}

export default UsersEdit