import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../PrescriberWrapper/Header/Header';
import './Wrapper.css';
import Profile from './Profile/Profile';
import CreatePatient from './CreatePatient/CreatePatient';
import PatientList from './PatientList/PatientList';
import Inventory from './Inventory/Inventory';
import Orders from './Orders/Orders';

// 
interface PrescriberData {
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
  isVerifiedPrescriber:boolean ;
  // Add other properties as needed
}


// 

const Wrapper = () => {
  const { id } = useParams<{ id: string }>();
  const [showText, setShowText] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [ isVerified  , setisVerified] = useState(false);
  const handleTabChange = (tabIndex: number) => {
    console.log(tabIndex)
    setActiveTab(tabIndex);
  };
  // 
  const [prescriberData, setPrescriberData] = useState<PrescriberData | null>(null);

  //
  useEffect(() => {
    const fetchPrescriberData = async () => {
      try {
        const response = await fetch(`https://meteor-c535aaff4f8f.herokuapp.com/api/v1/prescribers/prescriber/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: PrescriberData = await response.json();
        setPrescriberData(data);
        console.log(data)
        setisVerified(data.isVerifiedPrescriber)
        console.log(isVerified)
      } catch (error) {
        console.error('Error fetching prescriber data:', error);
      }
      const timer = setTimeout(() => {
        setShowText(false);
      }, 10000); // 10 seconds
    };
    fetchPrescriberData();
  }, [id]);

  // 

  return (
    <>
      <Header />
      <div className="container mt-5">
      {showText && <div className='bold' >Inventory Enabled only for verified Prescriber</div>}
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
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 3 ? 'active' : ''}`}
              disabled={!isVerified}
              onClick={() => handleTabChange(3)}
            >
             Inventory
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 4 ? 'active' : ''}`}
              disabled={!isVerified}
              onClick={() => handleTabChange(4)}
            >
            Prescriptions
            </button>
          </li>
          {/* Add more buttons for additional tabs if needed */}
        </ul>
        <div className="tab-content mt-4">
          {/* Content for tab 1 */}
          {activeTab === 0 && (
            <div className="tab-pane fade show active">
              {id ? <PatientList id={id} isVerifiedPrescriber={isVerified} /> : <p>No ID provided</p>}
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
          {/* Content for tab 4 */}
          {activeTab === 3 && (
            <div className="tab-pane fade show active">
              { id ? <Inventory id={id} /> : <p>No ID provided</p> }
            </div>
          )}
          {/* Content for tab 5 */}
          {activeTab === 4 && (
            <div className="tab-pane fade show active">
              { id ? <Orders id={id} /> : <p>No ID provided</p> }
            </div>
          )}
          {/* Add more content for additional tabs if needed */}
        </div>
      </div>
    </>
  );
};

export default Wrapper;
