

const nextServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000/';


export const signup = async (data) => {
  
  
  try {

    // Prepare the request body
    const body = {
      username: data.username,
      password: data.password1
    }

    
    const response = await fetch(`${nextServerUrl}api/auth/singup`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    const result = await response.json();
  
    if (!response.ok) {
      throw new Error(result.error || 'Something went wrong');
    }

    return result;

  }catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }

}