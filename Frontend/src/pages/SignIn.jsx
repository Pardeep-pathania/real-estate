import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signin',
        formData
      );
      alert('User logged in successfully');
      navigate('/');
    } catch (err) {
      if (err.response) {
        console.log()
        setError(err.response.data.error || 'An unexpected error occurred');
      } else {
        setError('Network error. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      {error && <div className='text-red-500 mb-4'>{error}</div>}

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type='submit'
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'SignIn'}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>New here?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'>Register here</span>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
