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
        const response = await fetch(`https://development-redcircle-fb2ace51f4d4.herokuapp.com/api/v1/prescribers/prescriber/${id}`);
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
    <div className="container mt-5 max-width">
      {prescriberData ? (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Profile Details</h5>
          </div>
          <div className="card-body">
            <table className="table">
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{prescriberData.firstName} {prescriberData.lastName}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{prescriberData.email}</td>
                </tr>
                <tr>
                  <td>Phone Number:</td>
                  <td>{prescriberData.phoneNumber}</td>
                </tr>
                <tr>
                  <td>Credentials:</td>
                  <td>{prescriberData.credentials}</td>
                </tr>
                <tr>
                  <td>Practice Name:</td>
                  <td>{prescriberData.practiceName}</td>
                </tr>
                <tr>
                  <td>Practice Address:</td>
                  <td>{prescriberData.practiceAddressLine1}, {prescriberData.practiceAddressLine2}, {prescriberData.practiceCity}, {prescriberData.practiceState}, {prescriberData.practiceZipCode}</td>
                </tr>
                <tr>
                  <td>NPI Number:</td>
                  <td>{prescriberData.npiNumber}</td>
                </tr>
                <tr>
                  <td>Medical License State:</td>
                  <td>{prescriberData.medicalLicenseState}</td>
                </tr>
                <tr>
                  <td>License Number:</td>
                  <td>{prescriberData.licenseNumber}</td>
                </tr>
                {/* Add more data to display as needed */}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
