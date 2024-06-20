import { useState } from 'react';
import './App.css';
export const runtime = 'experimental-edge';


export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send form data to API endpoint (to be created)
    //const response = await fetch('https://f0182807.register-backend.pages.dev/api/register/', {
    
  
    try {
      //const response = await fetch('https://f0182807.register-backend.pages.dev/api/register/', {
        const response = await fetch('api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage('Registration failed: ' + data.message);
      }
    } catch (error) {
      setMessage('An error occurred: ' + error.message);
    }


  };

  return (
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} className='App-header'>
     
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
      <div className='App'><header>Auto Deploy Register Form</header></div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit" style={{ marginTop: '20px' }}>Register</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}


/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React From By Murugan Veera
          </a>
          <a 
          className="Web"
          href="https://www.artofliving.org"
          target="_blank"
          rel="noopener noreferrer"
          >
            Art of living
        </a>
      </header>
    </div>
  );
}

export default App;
*/