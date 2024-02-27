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
  console.log(id)
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
    <div>
      {prescriberData ? (
        <div>
          <p>ID: {prescriberData._id}</p>
          <p>Name: {prescriberData.firstName} {prescriberData.lastName}</p>
          <p>Email: {prescriberData.email}</p>
          <p>Phone Number: {prescriberData.phoneNumber}</p>
          <p>Credentials: {prescriberData.credentials}</p>
          <p>Practice Name: {prescriberData.practiceName}</p>
          <p>Practice Address: {prescriberData.practiceAddressLine1}, {prescriberData.practiceAddressLine2}, {prescriberData.practiceCity}, {prescriberData.practiceState}, {prescriberData.practiceZipCode}</p>
          <p>NPI Number: {prescriberData.npiNumber}</p>
          <p>Medical License State: {prescriberData.medicalLicenseState}</p>
          <p>License Number: {prescriberData.licenseNumber}</p>
          {/* Add more data to display as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Profile;
