import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import axios from 'axios'
import URLS from './constants'
import { Provider } from 'react-redux'
import { store } from './redux'

axios.defaults.baseURL = URLS.base_api_url
axios.defaults.withCredentials = true



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <App />
    </Provider>
)
