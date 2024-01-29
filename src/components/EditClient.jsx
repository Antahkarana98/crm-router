import { Form, useNavigate, useLoaderData, redirect, useActionData } from "react-router-dom"
import { getClient, updateData } from "../data/Clients"
import FormClient from "./FormClient"
import Error from "./Error"

export async function loader({params}) {

  const client = await getClient(params.id)

  if(Object.values(client).length === 0) {
    throw new Response('', {
      status: 404,
      statusText: 'Client Not found'
    })
  }

  return client
}

export async function action({request, params}) {
  const formData = await request.formData()

  const data = Object.fromEntries(formData)
  const email = formData.get('email')

  const errors = []

  if(Object.values(data).includes('')) {
    errors.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])")
  if(!regex.test(email)) {
    errors.push('Email no válido')
  }

  if(Object.keys(errors).length) {
    return errors
  }

  await updateData(params.id, data)

  return redirect('/')
}


const EditClient = () => {

  const navigate = useNavigate()
  const client = useLoaderData()
  const errors = useActionData()

  return (
    <div>
       <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Aca puedes modificar el Cliente</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-black uppercase"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20">

        {errors?.length && errors.map((error, i) => ( <Error key={i}>{error}</Error> ))}

        <Form 
          method='POST'
          noValidate
        >
          <FormClient 
            client={client}
          />

          <input 
            type="submit"
            className="mt-3 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg cursor-pointer"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </div>
  )
}

export default EditClient
