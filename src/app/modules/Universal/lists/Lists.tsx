import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

interface Prescriber {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  credentials: string;
  practiceName: string;
  practiceAddressLine1: string;
  practiceAddressLine2: string;
  practiceCity: string;
  practiceState: string;
  practiceZipCode: string;
  npiNumber: string;
  medicalLicenseState: string;
  licenseNumber: string;
  optInPhysicianSearch: boolean;
  agreeToPrivacyPolicy: boolean;
  acceptBAA: boolean;
  isVerifiedPrescriber: boolean;
}

const Lists = () => {
  const [prescribers, setPrescribers] = useState<Prescriber[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (username  === 'admin' && password === 'admin') {
      // Make API call
      fetch('https://meteor-c535aaff4f8f.herokuapp.com/api/prescribers')
        .then(response => response.json())
        .then(data => setPrescribers(data))
        .catch(error => console.error('Error fetching data:', error));

      // Close the modal after successful login
      setModalIsOpen(false);
    }
  }, [username, password]);

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      // Set state to trigger useEffect and fetch data
      setUsername('admin');
      setPassword('admin');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleApprove = (id: string) => {
    fetch(`https://meteor-c535aaff4f8f.herokuapp.com/api/prescribers/${id}/approve`, {
      method: 'POST'
    })
    .then(response => {
      if (response.ok) {
        // If the API call is successful, update the prescriber list to reflect the change
        setPrescribers(prevPrescribers => prevPrescribers.map(prescriber => {
          if (prescriber._id === id) {
            return { ...prescriber, isVerifiedPrescriber: true };
          }
          return prescriber;
        }));
        // Show a modal indicating approval
        alert('Prescriber approved');
      } else {
        throw new Error('Failed to approve prescriber');
      }
    })
    .catch(error => {
      console.error('Error approving prescriber:', error);
      alert('Error approving prescriber');
    });
  };

  return (
    <div className="container mt-8">
      <h1 className="text-center mt-5 mb-4">All Prescribers</h1>
      <Modal  isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </Modal>
      {prescribers.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Credentials</th>
                <th>Practice Name</th>
                <th>Practice Address Line 1</th>
                <th>Practice Address Line 2</th>
                <th>Practice City</th>
                <th>Practice State</th>
                <th>Practice Zip Code</th>
                <th>NPI Number</th>
                <th>Medical License State</th>
                <th>License Number</th>
                <th>Opt In Physician Search</th>
                <th>Agree To Privacy Policy</th>
                <th>Accept BAA</th>
                <th>Is Verified Prescriber</th>
                <th>Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {prescribers.map(prescriber => (
                <tr key={prescriber?._id}>
                  <td>{prescriber.firstName}</td>
                  <td>{prescriber.lastName}</td>
                  <td>{prescriber.email}</td>
                  <td>{prescriber.phoneNumber}</td>
                  <td>{prescriber.credentials}</td>
                  <td>{prescriber.practiceName}</td>
                  <td>{prescriber.practiceAddressLine1}</td>
                  <td>{prescriber.practiceAddressLine2}</td>
                  <td>{prescriber.practiceCity}</td>
                  <td>{prescriber.practiceState}</td>
                  <td>{prescriber.practiceZipCode}</td>
                  <td>{prescriber.npiNumber}</td>
                  <td>{prescriber.medicalLicenseState}</td>
                  <td>{prescriber.licenseNumber}</td>
                  <td>{prescriber.optInPhysicianSearch.toString()}</td>
                  <td>{prescriber.agreeToPrivacyPolicy.toString()}</td>
                  <td>{prescriber.acceptBAA.toString()}</td>
                  <td>{prescriber.isVerifiedPrescriber.toString()}</td>
                  <td>
                    {/* Button to approve the prescriber */}
                    {!prescriber.isVerifiedPrescriber && (
                      <button onClick={() => handleApprove(prescriber._id)}>Approve Prescriber</button>
                    )}

                    {prescriber.isVerifiedPrescriber && (
                     <span> Verified </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Lists;
