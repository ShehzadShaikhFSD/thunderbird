import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Cookies from 'universal-cookie';
import './PrescriberLogin.css'

const PrescriberLogin = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


 
  const handleSignInClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEmail('')
    setError('')
    setPassword('')
    setShowModal(false);
  };

  const handleEmailChange = (event : any ) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event : any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://meteor-c535aaff4f8f.herokuapp.com/api/prescribers/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const cookies = new Cookies();
        cookies.set('TOKEN', data.token, { path: '/' });
        cookies.set('LOGIN-TYPE', "PRESCRIBER" , { path: '/' });
        cookies.set('SITE-TYPE', "DERMA", { path: '/' });
        // cookies.set('SITE-TYPE', "DERMA", { path: '/' });
        setShowModal(false);
        navigate(`/Prescriber/Dashboard/${data.prescriberId}`); // Redirect to home page
      } else {
        const errorData = await response.json();
        console.log(errorData)
        setError(errorData.error );
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='nav-dark-black' >
      <span className="prescriber-login" onClick={handleSignInClick}>Sign In (Prescriber)</span>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Prescriber Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" className="form-control" value={email} onChange={handleEmailChange} />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" className="form-control" value={password} onChange={handlePasswordChange} />
            </div>
            {error && <div className="error-message">{error}</div>}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PrescriberLogin;
