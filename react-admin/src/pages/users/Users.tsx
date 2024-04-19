import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Wrapper from '../../components/Wrapper.component'
import axios from 'axios'
import Paginator from '../../components/Paginator.component'

type UserType = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role?: {
        name: string
    };
    action: string
}

const Users = () => {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)

    useEffect(() => {
        (   
            async () => {
                try {
                    const {data} = await axios.get(`users?page=${page}`)
                    setUsers(data.data)
                    setLastPage(data.meta.last_page)
                }catch(e){
                    console.log(e)
                }                  
            }
        )()
    }, [page])

    const deleteUser = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this record?')){

            try {
                await axios.delete(`users/${id}`)
                setUsers(users.filter((u: UserType) => {
                    return u.id !== id
                }))
            }catch(e){
                console.log(e)
            }           
        }
    }

    return (
        <Wrapper>
            <div className="add-user-box">
                <a href="/users/create">Add</a>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm border">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((u: UserType) => {
                            return (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{`${u.first_name} ${u.last_name}`}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role?.name}</td>
                                    <td className='actions'>
                                        <Link to={`/users/${u.id}/edit`}>Edit</Link>
                                        <button 
                                            onClick={() => {deleteUser(u.id)}}
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
            <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/>
        </Wrapper>
    )
}

export default Users