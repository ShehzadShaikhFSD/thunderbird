import React, { useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
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

  const handleLoginClick = () => {
    fetch('https://development-redcircle-fb2ace51f4d4.herokuapp.com/api/v1/admin/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      })
      .then(response => {
        if (response.ok) {
          // If login successful, close modal and fetch prescribers data
          setModalIsOpen(false);
          fetchPrescribers();
        } else {
          throw new Error('Failed to sign in');
        }
      })
      .catch(error => {
        console.error('Error signing in:', error);
        alert('Failed to sign in');
      });
  }

  const fetchPrescribers = () => {
    // Make API call to fetch prescribers data
    fetch('https://development-redcircle-fb2ace51f4d4.herokuapp.com/api/v1/admin/prescribers')
      .then(response => response.json())
      .then(data => setPrescribers(data))
      .catch(error => console.error('Error fetching data:', error));
  };


  const handleVerificationStatus = (id: string, status: boolean) => {
    fetch(`https://development-redcircle-fb2ace51f4d4.herokuapp.com/api/v1/admin/update-verification-status/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
    .then(response => {
      if (response.ok) {
        // If the API call is successful, update the prescriber list to reflect the change
        setPrescribers(prevPrescribers =>
          prevPrescribers.map(prescriber => {
            if (prescriber._id === id) {
              return { ...prescriber, isVerifiedPrescriber: status };
            }
            return prescriber;
          })
        );
        // Show a modal indicating approval or rejection
        if (status) {
          alert('Prescriber approved');
        } else {
          alert('Prescriber rejected');
        }
      } else {
        throw new Error('Failed to update prescriber status');
      }
    })
    .catch(error => {
      console.error('Error updating prescriber status:', error);
      alert('Error updating prescriber status');
    });
  };
  
  return (
    <div className="container mt-8">
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} >
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button variant="primary" onClick={handleLoginClick}>
            Login
          </Button>
        </Modal.Body>
      </Modal>
      {prescribers.length > 0 && (
        <div className="table-responsive">
      <h1 className="text-center mt-5 mb-4">All Prescribers</h1>
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
                {/* <th>Opt In Physician Search</th> */}
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
                  {/* <td>{prescriber.optInPhysicianSearch.toString()}</td> */}
                  <td>{prescriber.agreeToPrivacyPolicy.toString()}</td>
                  <td>{prescriber.acceptBAA.toString()}</td>
                  <td>{prescriber.isVerifiedPrescriber.toString()}</td>
                  <td>
                    {!prescriber.isVerifiedPrescriber && (
                      <Button onClick={() => handleVerificationStatus(prescriber._id, true)}>Approve Prescriber</Button>
                    )}
                    {prescriber.isVerifiedPrescriber &&
                    //  <span>Verified</span>
                     <Button onClick={() => handleVerificationStatus(prescriber._id, false)}>Reject / Disable Prescriber</Button>
                     }
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
