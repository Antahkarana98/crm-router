import { useLoaderData, Form, redirect } from "react-router-dom"

import Client from "../components/Client"
import { getClients } from "../data/Clients";

export function loader(){

  const clients = getClients()

  return clients
}

function Home() {

  const clients = useLoaderData()

  return (
    <>
      <div>
        <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
        <p className="mt-3">Administra tus Clientes</p>

        { clients.length ? 
        (
          <table className="w-full bg-white shadow mt-5 table-auto">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="p-2">Clientes</th>
                <th className="p-2">Contactos</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((client) => (
                <Client key={client.id} client={client} />
              ))}
            </tbody>

          </table>
        ) : (
          <p className="taxt-center mt-10">No hay clientes</p>
        )}
      </div>
    </>
  )
}

export default Home
