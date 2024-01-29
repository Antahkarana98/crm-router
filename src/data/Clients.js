export async function getClients() {
  const response = await fetch(import.meta.env.VITE_API_URL)
  const data = await response.json()

  return data
}

export async function getClient(id) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`)
  const data = await response.json()

  return data
}

export async function addData(data) {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  
    await response.json()
  } catch (error) {
      console.log(error);
  }
}

export async function updateData(id, data) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  
    await response.json()
  } catch (error) {
      console.log(error);
  }
}

export async function deleteClient(id) {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'DELETE'
    })
  } catch (error) {
      console.log(error);
  }
}