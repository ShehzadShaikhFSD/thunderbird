import React, { useState, useEffect } from 'react';

interface ProfileProps {
  id: string;
}

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
  // Add other properties as needed
}

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const [prescriberData, setPrescriberData] = useState<PrescriberData | null>(null);

  useEffect(() => {
    const fetchPrescriberData = async () => {
      try {
        const response = await fetch(`https://meteor-c535aaff4f8f.herokuapp.com/api/prescribers/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: PrescriberData = await response.json();
        setPrescriberData(data);
      } catch (error) {
        console.error('Error fetching prescriber data:', error);
      }
    };

    fetchPrescriberData();
  }, [id]);

  return (
    <div className="container mt-5">
      {prescriberData ? (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Profile Details</h5>
          </div>
          <div className="card-body">
            <p className="card-text">ID: {prescriberData._id}</p>
            <p className="card-text">Name: {prescriberData.firstName} {prescriberData.lastName}</p>
            <p className="card-text">Email: {prescriberData.email}</p>
            <p className="card-text">Phone Number: {prescriberData.phoneNumber}</p>
            <p className="card-text">Credentials: {prescriberData.credentials}</p>
            <p className="card-text">Practice Name: {prescriberData.practiceName}</p>
            <p className="card-text">Practice Address: {prescriberData.practiceAddressLine1}, {prescriberData.practiceAddressLine2}, {prescriberData.practiceCity}, {prescriberData.practiceState}, {prescriberData.practiceZipCode}</p>
            <p className="card-text">NPI Number: {prescriberData.npiNumber}</p>
            <p className="card-text">Medical License State: {prescriberData.medicalLicenseState}</p>
            <p className="card-text">License Number: {prescriberData.licenseNumber}</p>
            {/* Add more data to display as needed */}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
