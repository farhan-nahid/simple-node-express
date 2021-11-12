import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState();
  const nameRef = useRef('');
  const emailRef = useRef('');

  useEffect(() => {
    fetch('https://simple-express-node.herokuapp.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handelSubmit = (e) => {
    e.preventDefault();
    if (nameRef.current.value && emailRef.current.value) {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const newUser = { name, email };

      // send data to the server
      fetch('https://simple-express-node.herokuapp.com/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => setUsers([...users, data]));
      nameRef.current.value = '';
      emailRef.current.value = '';
    }
  };

  return (
    <div className='App'>
      <h1>Please add a User</h1>
      <form onSubmit={handelSubmit}>
        <input type='text' ref={nameRef} placeholder='Enter a name' />
        <input type='email' ref={emailRef} placeholder='Enter a email' />
        <input type='submit' value='Submit' />
      </form>
      <h1>Total User: {users?.length}</h1>
      {users?.length ? (
        <ul>
          {
            // map users
            users.map((user) => (
              <li key={user.id}>
                {user.id}. Name: {user.name} ------- Email: {user.email}
              </li>
            ))
          }
        </ul>
      ) : (
        'loading'
      )}
    </div>
  );
}

export default App;
