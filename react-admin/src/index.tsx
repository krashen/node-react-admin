import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import axios from 'axios'
import URLS from './constants'

axios.defaults.baseURL = URLS.base_api_url
axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
)
