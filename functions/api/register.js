import fs from 'fs';
import path from 'path';
//export const runtime = 'experimental-edge';
//export const runtime = "nodejs";


export default async (req, res) => {
  if (req.method === 'POST') {
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

    // Respond with success message
    res.status(200).json({ message: 'Registration successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
