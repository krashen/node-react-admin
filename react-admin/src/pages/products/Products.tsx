import { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper.component'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Paginator from '../../components/Paginator.component'

type ProductType = {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
}

const Products = () => {
    
    const [products, setProducts] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)

    useEffect(() => {
        (   
            async () => {
                try {
                    const {data} = await axios.get(`products?page=${page}`)
                    setProducts(data.data)
                    setLastPage(data.meta.last_page)
                }catch(e){
                    console.log(e)
                }                  
            }
        )()
    },[page])

    const deleteProduct = async (id: number) => {
            
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await axios.delete(`products/${id}`)
                console.log(response)
                setProducts(products.filter((p: ProductType) => p.id !== id))
            }catch(e){
                console.log(e)
            }
        }                       
    }
    
    return (
        <Wrapper>
            <div className="add-user-box">
                    <a href="/products/create">Add</a>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm border table-products">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products.map((p: ProductType) => {
                            return (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td><img src={p.image} alt={p.title} /></td>
                                    <td>{p.title}</td>
                                    <td><p>{p.description}</p></td>
                                    
                                    <td>{p.price}</td>
                                    <td className='actions'>
                                        <Link to={`/products/${p.id}/edit`}>Edit</Link>
                                        <button 
                                            onClick={() => {deleteProduct(p.id)}}
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

export default Products