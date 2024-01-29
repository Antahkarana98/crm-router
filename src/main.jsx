import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import NewClient, {action as newClientAction} from './pages/NewClient.jsx'
import Home, {loader as clientsLoader} from './pages/Home.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import EditClient, {loader as EditClientLoader, action as EditClientAction} from './components/EditClient.jsx'
import { action as deleteClientAction } from './components/Client.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />,
        loader: clientsLoader
      },
      {
        path: '/clients/new',
        element: <NewClient />,
        action: newClientAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clients/:id/edit',
        element: <EditClient />,
        loader: EditClientLoader,
        action: EditClientAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clients/:id/delete',
        action: deleteClientAction,
      }
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
