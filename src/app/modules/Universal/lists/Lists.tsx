import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Fetch data from the API
    fetch('https://meteor-c535aaff4f8f.herokuapp.com/api/prescribers')
      .then(response => response.json())
      .then(data => setPrescribers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mt-8">
        <Link to="/" className="home-link">Go to Home</Link>
        <Link to="/Prescriber/lists" className="home-link">Prescriber lists</Link>
        <Link to="/prescriber/Register" className="home-link">Sign Up (Prescriber)</Link>
        <Link to="/About" className="home-link">Mission</Link>

      <h1 className="text-center mt-5 mb-4">Prescribers</h1>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lists;
