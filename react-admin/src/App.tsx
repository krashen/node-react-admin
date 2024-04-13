
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard'
import Users from './pages/users/Users'
import Register from './pages/Register'
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="container-fluid">
          <Routes>
            <Route path={'/'} Component={Dashboard} />
            <Route path={'/users'} Component={Users} />
            <Route path={'/register'} Component={Register} />
            <Route path={'/login'} Component={Login} />
          </Routes>        
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
