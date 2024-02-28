import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../PrescriberWrapper/Header/Header';
import './Wrapper.css';
import Profile from './Profile/Profile';
import CreatePatient from './CreatePatient/CreatePatient';
import PatientList from './PatientList/PatientList';

const Wrapper = () => {
  const { id } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 0 ? 'active' : ''}`}
              onClick={() => handleTabChange(0)}
            >
              Patient Lists
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => handleTabChange(1)}
            >
              Create Patient
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
              onClick={() => handleTabChange(2)}
            >
              Profile
            </button>
          </li>
          {/* Add more buttons for additional tabs if needed */}
        </ul>
        <div className="tab-content">
          {/* Content for tab 1 */}
          {activeTab === 0 && (
            <div className="tab-pane fade show active">
              {id ? <PatientList id={id} /> : <p>No ID provided</p>}
            </div>
          )}
          {/* Content for tab 2 */}
          {activeTab === 1 && (
            <div className="tab-pane fade show active">
              {id ? <CreatePatient id={id} /> : <p>No ID provided</p>}
            </div>
          )}
          {/* Content for tab 3 */}
          {activeTab === 2 && (
            <div className="tab-pane fade show active">
              {id ? <Profile id={id} /> : <p>No ID provided</p>}
            </div>
          )}
          {/* Add more content for additional tabs if needed */}
        </div>
      </div>
    </>
  );
};

export default Wrapper;
