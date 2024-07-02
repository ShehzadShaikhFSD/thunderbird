import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Lists.css';
import Prescriptions from '../Prescriptions';

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
  optedForBussinessV1: boolean;
  optedForBussinessV2: boolean;
  optedForBussinessV3: boolean;
  bussinessV1Enabled: boolean;
  bussinessV2Enabled: boolean;
  bussinessV3Enabled: boolean;
}

const Lists = () => {
  const [prescribers, setPrescribers] = useState<Prescriber[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [disableButtons, setDisableButtons] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

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
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          setToken(data.token);
          setModalIsOpen(false);
          setDisableButtons(false);
          fetchPrescribers(data.token);
        } else {
          throw new Error('Failed to sign in');
        }
      })
      .catch(error => {
        console.error('Error signing in:', error);
        alert('Failed to sign in');
      });
  };

  const fetchPrescribers = (token: string) => {
    fetch('https://development-redcircle-fb2ace51f4d4.herokuapp.com/api/v1/admin/prescribers', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => { 
        setPrescribers(data.prescribers)
        console.log(data)
       } )
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleVerificationStatus = (id: string, status: boolean) => {
    fetch(`https://development-redcircle-fb2ace51f4d4.herokuapp.com/api/v1/admin/update-verification-status/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })
      .then(response => {
        if (response.ok) {
          setPrescribers(prevPrescribers =>
            prevPrescribers.map(prescriber => {
              if (prescriber._id === id) {
                return { ...prescriber, isVerifiedPrescriber: status };
              }
              return prescriber;
            })
          );
          alert(`Prescriber ${status ? 'approved' : 'rejected'}`);
        } else {
          throw new Error('Failed to update prescriber status');
        }
      })
      .catch(error => {
        console.error('Error updating prescriber status:', error);
        alert('Error updating prescriber status');
      });
  };

  const handleBusinessStatus = (id: string, status: boolean, vertical: string) => {
    fetch(`https://development-redcircle-fb2ace51f4d4.herokuapp.com/api/v1/admin/update-business-verification-status/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status, verticalToBeEnabled: vertical }),
    })
      .then(response => {
        if (response.ok) {
          setPrescribers(prevPrescribers =>
            prevPrescribers.map(prescriber => {
              if (prescriber._id === id) {
                return { ...prescriber, [vertical]: status };
              }
              return prescriber;
            })
          );
          alert(`Prescriber ${status ? 'Approved' : 'disabled'} for ${vertical}`);
        } else {
          throw new Error('Failed to update business status');
        }
      })
      .catch(error => {
        console.error('Error updating business status:', error);
        alert('Error updating business status');
      });
  };

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const handleLogoutClick = () => {
    setToken(null);
    setDisableButtons(true);
    setModalIsOpen(true);
    setActiveTab(0);
    setUsername('');
    setPassword('');
  };

  useEffect(() => {
    if (token) {
      fetchPrescribers(token);
    }
  }, [token]);

  const isLoginButtonDisabled = !username || !password;

  return (
    <div>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)} backdrop="static">
        <Modal.Header>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
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
          <Button variant="primary" onClick={handleLoginClick} disabled={isLoginButtonDisabled}>
            Login
          </Button>
        </Modal.Body>
      </Modal>

      {!modalIsOpen && (
        <div>
          <div className='logout-parent'>
            <Button variant="danger" onClick={handleLogoutClick}>
              Logout
            </Button>
          </div>
          <div className="container mt-8">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 0 ? 'active' : ''}`}
                  onClick={() => handleTabChange(0)}
                >
                  Prescribers
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                  onClick={() => handleTabChange(1)}
                  disabled={disableButtons}
                >
                  Prescriptions
                </button>
              </li>
            </ul>
            <div className="tab-content mt-4">
              {activeTab === 0 && (
                <div className="tab-pane fade show active">
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
                            <th>Opted for weight management
                               </th>
                            <th>Opted for Sexual wellness
                              </th>
                            <th>Opted for BHRT
                              </th>
                            <th>Approve weight management </th>
                            <th>Actions for weight management</th>
                            <th>Approve Sexual wellness </th>
                            <th>Actions for Sexual wellness</th>
                            <th>Approve  BHRT</th>
                            <th>Actions for  BHRT</th>
                            <th>Is Verified Prescriber</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...prescribers].reverse().map(prescriber => (
                            <tr key={prescriber._id}>
                              <td>{prescriber.firstName ?? ''}</td>
                              <td>{prescriber.lastName ?? ''}</td>
                              <td>{prescriber.email ?? ''}</td>
                              <td>{prescriber.phoneNumber ?? ''}</td>
                              <td>{prescriber.credentials ?? ''}</td>
                              <td>{prescriber.practiceName ?? ''}</td>
                              <td>{prescriber.practiceAddressLine1 ?? ''}</td>
                              <td>{prescriber.practiceAddressLine2 ?? ''}</td>
                              <td>{prescriber.practiceCity ?? ''}</td>
                              <td>{prescriber.practiceState ?? ''}</td>
                              <td>{prescriber.practiceZipCode ?? ''}</td>
                              <td>{prescriber.npiNumber ?? ''}</td>
                              <td>{prescriber.medicalLicenseState ?? ''}</td>
                              <td>{prescriber.licenseNumber ?? ''}</td>
                              <td>{prescriber.optedForBussinessV1?.toString() === 'true' ? 'Yes' : 'No'}</td>
<td>{prescriber.optedForBussinessV2?.toString() === 'true' ? 'Yes' : 'No'}</td>
<td>{prescriber.optedForBussinessV3?.toString() === 'true' ? 'Yes' : 'No'}</td>
                              <td>{prescriber.bussinessV1Enabled?.toString() === 'true' ? 'Approved' : 'Disabled'}</td>
                              <td>
                                <button
                                  className={`btn btn-${prescriber.bussinessV1Enabled ? 'danger' : 'success'}`}
                                  onClick={() => handleBusinessStatus(prescriber._id, !prescriber.bussinessV1Enabled, 'bussinessV1Enabled')}
                                >
                                  {prescriber.bussinessV1Enabled ? 'Disable' : 'Approve'}
                                </button>
                              </td>
                              <td>{prescriber.bussinessV2Enabled?.toString() === 'true' ? 'Approved' : 'Disabled'}</td>
                              <td>
                                <button
                                  className={`btn btn-${prescriber.bussinessV2Enabled ? 'danger' : 'success'}`}
                                  onClick={() => handleBusinessStatus(prescriber._id, !prescriber.bussinessV2Enabled, 'bussinessV2Enabled')}
                                >
                                  {prescriber.bussinessV2Enabled ? 'Disable' : 'Approve'}
                                </button>
                              </td>
                              <td>{prescriber.bussinessV3Enabled?.toString() === 'true' ? 'Approved' : 'Disabled'}</td>
                              <td>
                                <button
                                  className={`btn btn-${prescriber.bussinessV3Enabled ? 'danger' : 'success'}`}
                                  onClick={() => handleBusinessStatus(prescriber._id, !prescriber.bussinessV3Enabled, 'bussinessV3Enabled')}
                                >
                                  {prescriber.bussinessV3Enabled ? 'Disable' : 'Approve'}
                                </button>
                              </td>
                              <td>{prescriber.isVerifiedPrescriber?.toString() === 'true' ? 'Approved' : 'Disabled'}</td>
                              <td>
                                <button
                                  className={`btn btn-${prescriber.isVerifiedPrescriber ? 'danger' : 'success'}`}
                                  onClick={() => handleVerificationStatus(prescriber._id, !prescriber.isVerifiedPrescriber)}
                                >
                                  {prescriber.isVerifiedPrescriber ? 'Reject / Disable Prescriber ' : 'Approve'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              {activeTab === 1 && (
                <div className="tab-pane fade show active">
                  <Prescriptions />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lists;
