export const decodeToken = (token) => {
  try {
    // JWT has 3 parts: header.payload.signature
    const base64Payload = token.split('.')[1];

    // Replace URL-safe chars and decode
    const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/');

    // Works in both browser and Node.js (Next.js)
    const jsonPayload = typeof Buffer !== 'undefined'
      ? Buffer.from(base64, 'base64').toString('utf-8')
      : atob(base64);

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode token:', error.message);
    return null;
  }
}