import { NavLink } from 'react-router-dom'

const Nav = () => {

    return (
        <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                         
                <div className="offcanvas-body d-md-flex flex-column p-0 overflow-y-auto">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink to={'/'} className="nav-link">  
                                Dashboard
                            </NavLink> 
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/roles'} className="nav-link">  
                                Roles
                            </NavLink> 
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/products'} className="nav-link">  
                                Products
                            </NavLink> 
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/users'} className="nav-link">Users</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/orders'} className="nav-link">Orders</NavLink>
                        </li>
                    </ul>            
                </div>
            
        </div>
    )
}

export default Nav