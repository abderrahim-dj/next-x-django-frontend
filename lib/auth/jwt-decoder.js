// check the life of jwt token

import { jwtDecode } from "jwt-decode";


export async function tokenAge(token) {
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);    
    return decoded.exp - currentTime;
  } catch (error) {
    return 0
  }
}