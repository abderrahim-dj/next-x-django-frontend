import SingupForm from "./components/singup-form";
import { cookies } from 'next/headers';

export default async function SingupPage() {

  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll(); // Returns an array of objects
 

  
 
  return (
    <>
      <SingupForm />
    
    <p>
      All cookies: {JSON.stringify(allCookies)}
    </p>
    
    </>
  )
}