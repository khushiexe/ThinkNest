import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom" ;
import AppContextProvider from './context/AppContext.jsx';
import { ChatProvider } from "./context/ChatContext";
import { QuizProvider } from './context/QuizContext.jsx';


createRoot(document.getElementById('root')).render(
  // BrowserRouter : It wraps your entire app so React can keep track of the URL and 
  // display the correct page without reloading the browser.
  <BrowserRouter>
    <AppContextProvider>
    <QuizProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </QuizProvider>
    </AppContextProvider>
  </BrowserRouter>
)
