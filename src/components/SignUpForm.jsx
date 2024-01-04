import React, {useState} from "react";

export default function SignUpForm( {setToken} ) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [usernameValidation, setUsernameValidation] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (username.length < 8) {
            setUsernameValidation('Username must be at least 8 characters long');
            return;
        }

        setUsernameValidation('');

        try {
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
            const result = await response.json();
            console.log(result);

            if (result.token) {
                setToken(result.token);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input 
                        type='text' 
                        value={username} 
                        onChange={e => setUsername(e.target.value)} 
                    />
                </label>
                {usernameValidation && <p className='validation-message'>{usernameValidation}</p>}
                <label>
                    Password:
                    <input 
                        type='text' 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                </label>
                <button type='submit'>Submit</button>
            </form>

        </div>
    );
}