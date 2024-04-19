import { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper.component'
import axios from 'axios'
import { Link } from 'react-router-dom'

type RoleType = {
    id: number;
    name: string;
}

const Roles = () => {

    const [roles, setRoles] = useState([])

    useEffect(() => {
        (   
            async () => {
                try {
                    const {data} = await axios.get('roles')
                    setRoles(data)
                }catch(e){
                    console.log(e)
                }                  
            }
        )()
    },[])

    const deleteRole = async (id: number) => {
            
        if (window.confirm('Are you sure you want to delete this role?')) {
            try {
                const response = await axios.delete(`roles/${id}`)
                console.log(response)
                setRoles(roles.filter((r: RoleType) => r.id !== id))
            }catch(e){
                console.log(e)
            }
        }                       
    }

    return (
        <Wrapper>
            <div className="add-user-box">
                    <a href="/roles/create">Add</a>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm border">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        roles.map((r: RoleType) => {
                            return (
                                <tr key={r.id}>
                                    <td>{r.id}</td>
                                    <td>{r.name}</td>
                                    <td className='actions'>
                                        <Link to={`/roles/${r.id}/edit`}>Edit</Link>
                                        <button 
                                            onClick={() => {deleteRole(r.id)}}
                                            className='delete-button'
                                        >
                                            Delete
                                        </button>
                                        
                                    </td>
                                </tr>
                            )
                        })
                    }
                    
                    </tbody>
                </table>
            </div>
            {/*}
            <nav className='pagination-nav'>
                <ul className="pagination">
                    <li className="page-item">
                        <button 
                            className="page-link" 
                            onClick={handlePreviousPage}
                            disabled={page === 1}
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    
                    <li className="page-item">
                        <button
                            className="page-link"
                            onClick={handleNextPage}
                            disabled={page === lastPage}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav> 
            {*/}
        </Wrapper>
    )
}

export default Roles