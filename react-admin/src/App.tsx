
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard'
import Users from './pages/users/Users'
import UsersCreate from './pages/users/UsersCreate'
import Register from './pages/Register'
import Login from './pages/Login'

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
          </Routes>        
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
