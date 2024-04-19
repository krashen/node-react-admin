
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard'
import Users from './pages/users/Users'
import Roles from './pages/roles/Roles'
import RolesCreate from './pages/roles/RolesCreate'
import RolesEdit from './pages/roles/RolesEdit'
import Products from './pages/products/Products'
import UsersCreate from './pages/users/UsersCreate'
import Register from './pages/Register'
import Login from './pages/Login'
import UsersEdit from './pages/users/UsersEdit'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="container-fluid">
          <Routes>
            <Route path={'/'} Component={Dashboard} />
            <Route path={'/register'} Component={Register} />
            <Route path={'/login'} Component={Login} />
            <Route path={'/users'} Component={Users} />
            <Route path={'/users/create'} Component={UsersCreate} />
            <Route path={'/users/:id/edit'} Component={UsersEdit} />
            <Route path={'/roles'} Component={Roles} />
            <Route path={'/roles/create'} Component={RolesCreate} />
            <Route path={'/roles/:id/edit'} Component={RolesEdit} />
            <Route path={'/products'} Component={Products} />
          </Routes>        
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
