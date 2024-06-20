// functions/api/register.js

export async function onRequest(context) {
  const { request } = context;

  // Handle CORS preflight request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method === 'POST') {
    const data = await request.json();

    // You can save the data to a database or KV storage.
    // For this example, we'll just log the data to the console.
    console.log('Received data:', data);

    return new Response(JSON.stringify({ message: 'Registration successful' }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
      },
    });
  } else {
    return new Response('Method not allowed Your Request may be in queue', {
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
      },
    });
  }
}
