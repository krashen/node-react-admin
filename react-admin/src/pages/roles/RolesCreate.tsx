import { SyntheticEvent, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Wrapper from '../../components/Wrapper.component'
import axios from 'axios'
import '../../Form.css'
import { capitalizeWord } from '../../utils'

type RoleType = {
    id: number;
    name: string;
}

const RolesCreate = () => {

    const [permissions, setPermissions] = useState([])
    const [name, setName] = useState('')
    const [redirectAfter, setRedirectAfter] = useState(false)
    const [selected, setSelected] = useState([] as number[])

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('permissions')

                    setPermissions(data)
                    
                } catch(e) {
                    console.log(e)
                }
                
            }
        )()
    }, [])

    const formatName = (n: string) => {
        return capitalizeWord(n).split('_').join(' ')
    }

    const onCheck = (id: number) => {

        if (selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id))
            return
        }

        setSelected([...selected, id])
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const {data} = await axios.post('roles', {
                name,
                permissions: selected
            })
            setRedirectAfter(true)
            
        } catch(e) {
            console.log(e)
        }


    }

    return (
        <Wrapper>
            {redirectAfter && <Navigate to={'/roles'} />}
            <div className='form-signin form-add w-100 m-auto'>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Add Role</h1>
                    <input
                        className="form-control" 
                        placeholder="Name"
                        onChange={e => setName(e.target.value)}
                        required 
                    />
                    <h4 className=" mb-3 fw-normal permissions-title">Permissions</h4>
                    <ul className="list-group">
                        {permissions.map((p: RoleType) => {
                            return (
                                <li key={p.id} className="list-group-item">
                                    <input
                                        className="form-check-input" 
                                        value={p.id}
                                        type="checkbox" 
                                        onChange={() => onCheck(p.id)}
                                    />
                                    <label className="form-check-label">{formatName(p.name)}</label>
                                </li>
                            )
                        })}
                    </ul>                    
                    <button
                        className="btn btn-primary w-100 py-2" 
                        type="submit"
                    >Add</button>
                    
                </form>
            </div>
        </Wrapper>
    )
}

export default RolesCreate