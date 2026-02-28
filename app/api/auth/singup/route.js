import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { tokenAge } from "@/lib/auth/jwt-decoder";

const djangoBackendUrl = process.env.DJANGO_BACKEND_URL || 'http://127.0.0.1:8000/';

export async function POST(req, res) {

  try {
    const data = await req.json()

    const response = await fetch(`${djangoBackendUrl}api/auth/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })


    const result = await response.json();

    if(!response.ok) {
      return NextResponse.json({error: result.error || 'Something went wrong with singup'}, {status:400})
    }



    const cookieStore = await cookies(); 
    const accessAge = await tokenAge(result.access_token);
    const refreshAge = await tokenAge(result.refresh_token);


    cookieStore.set('access_token', result.access_token, {
      httpOnly: true,
      maxAge: accessAge,
    })

    cookieStore.set('refresh_token', result.refresh_token, {
      httpOnly: true,
      maxAge: refreshAge,
    })


    cookieStore.set('username', result.user.username, {
      httpOnly: true,
    })

    cookieStore.set('user_id', String(result.user.id), {
      httpOnly: true,
    })



    return NextResponse.json(result, {status:200})

  } catch (error) {
    return NextResponse.json({error: error.message || 'Internal server error'}, {status:500})
  }

}