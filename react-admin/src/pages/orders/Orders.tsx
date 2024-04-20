import { Fragment, useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper.component'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Paginator from '../../components/Paginator.component'

type OrderItemsType = {
    id: number;
    product_title: string;
    price: number;
    quantity: number;
}

type OrderType = {
    id: number;
    name: string;
    email: string;
    total: number;
    order_items: OrderItemsType[]
}

const Orders = () => {
    
    const [orders, setOrders] = useState([])
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)

    useEffect(() => {
        (   
            async () => {
                try {
                    const {data} = await axios.get(`orders?page=${page}`)
                    setOrders(data.data)
                    setLastPage(data.meta.last_page)
                }catch(e){
                    console.log(e)
                }                  
            }
        )()
    },[page])

    /* const deleteProduct = async (id: number) => {
            
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
 */    
    return (
        <Wrapper>
            <div className="add-user-box">
                    <a href="/products/create">Add</a>
            </div>
            <div className="table-responsive small">
                <table className="table table-sm border table-orders">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Total</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map((o: OrderType) => {
                            return (
                                <Fragment key={o.id}>
                                    <tr>
                                        <td>{o.id}</td>
                                        <td>{o.name}</td>
                                        <td>{o.email}</td>
                                        <td>Total: <b>${o.total}</b></td>
                                        <td className='actions'>
                                            <Link to={`/products/${o.id}/edit`}>Edit</Link>
                                            <button 
                                                //onClick={() => {deleteProduct(o.id)}}
                                                className='delete-button'
                                            >
                                                Delete
                                            </button>
                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="orders-colored-td" colSpan={5}>
                                            <div>
                                                <table className="table talbe-sm table-order-details">
                                                    <thead>
                                                        <tr>
                                                            <th colSpan={3}>Order details:</th>  
                                                              
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {o.order_items.map((i) => {
                                                            return (
                                                                <tr key={i.id}>
                                                                    <td>{i.product_title}</td>
                                                                    <td>x {i.quantity}</td>
                                                                    <td>${i.price}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5} className='orders-extra-td'></td>
                                    </tr>
                                </Fragment>
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

export default Orders