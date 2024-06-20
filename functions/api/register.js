import fs from 'fs';
import path from 'path';
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
   // const data = await request.json();

    // You can save the data to a database or KV storage.
    // For this example, we'll just log the data to the console.
    const { name, email, password } = req.body;

    // Construct data object
    const newEntry = {
      name,
      email,
      password,
      timestamp: new Date().toISOString(),
    };

    // Define file path
    const filePath = path.join(process.cwd(), 'data', 'registrations.json');

    // Ensure data directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Read existing data
    let data = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      data = JSON.parse(fileContent);
    }

    // Add new entry to data
    data.push(newEntry);

    // Write updated data back to file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

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
