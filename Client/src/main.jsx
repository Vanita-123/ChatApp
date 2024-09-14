import { BrowserRouter } from "react-router-dom"
import { AuthProvider} from "./Component/Context/AuthProvider"
import { SocketProvider } from "./Component/Context/SocketContext"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
  <React.StrictMode>
    <AuthProvider>
<SocketProvider>
      <App />
</SocketProvider>
    </AuthProvider>
    </React.StrictMode>
    </BrowserRouter>
);
