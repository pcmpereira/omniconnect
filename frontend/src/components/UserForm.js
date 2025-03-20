import React, { useState } from 'react';
import axios from 'axios';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/create', {
        name,
        email,
        cep
      });
      setMessage(response.data);
    } catch (error) {
      setMessage('Error creating account. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>CEP:</label>
          <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} required />
        </div>
        <button type="submit">Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserForm;