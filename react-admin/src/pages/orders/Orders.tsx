import { Fragment, useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper.component'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Paginator from '../../components/Paginator.component'

const hide = {
    maxHeight: 0,
    padding:'00',
    transition: '200ms ease-in'
}

const show = {
    maxHeight: 'none',
    padding:'20px',
    transition: '200ms ease-out'
}

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
    const [selected, setSelected] = useState(-1)

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

    const handleView = (id: number) => {
            setSelected(selected === id? -1 : id)
    }

    const handleExport = async () => {

        try {
            const {data} = await axios.post('export', {}, {
                responseType: 'blob'
            })
            const blob = new Blob([data], {
                type: 'text/csv'
            })
            const url = window.URL.createObjectURL(data)
            const link = document.createElement('a')
            link.href = url
            link.download = 'orders.csv'
            link.click()
        } catch(e) {
            console.log(e)
        }
    }
    return (
        <Wrapper>
            <div className="add-user-box">
                    <button onClick={handleExport}>Export</button>
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
                                            <button
                                                onClick={() => {handleView(o.id)}}
                                            >View</button>                                            
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={5}>
                                            <div 
                                                className='overflow-hidden orders-colored-div' 
                                                style={selected === o.id ? show : hide}
                                            >
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