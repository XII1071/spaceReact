import {StrictMode} from 'react'
import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

const pVirtualDOM = React.createElement('p', null, 'Hello Virtual DOM ')
const root = createRoot(document.getElementById('root')!)
root.render(pVirtualDOM)
