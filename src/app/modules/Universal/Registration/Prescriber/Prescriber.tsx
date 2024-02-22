import React, { useState } from 'react';
import './Prescriber.css';
import Header from './Header/Header';
const Prescriber = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    credentials: '',
    practiceName: '',
    practiceAddressLine1: '',
    practiceAddressLine2: '',
    practiceCity: '',
    practiceState: '',
    practiceZipCode: '',
    npiNumber: '',
    medicalLicenseState: '',
    licenseNumber: '',
    password: '',
    confirmPassword: '',
    optInPhysicianSearch: false,
    agreeToPrivacyPolicy: false,
    acceptBAA: false,
  });

  const handleChange = (e : any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
    try {
      const response = await fetch('https://meteor-c535aaff4f8f.herokuapp.com/api/prescribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log(responseData);
      alert("Thanks !! Your Form is Submitted Successfully , we'll let you know once your account is active.")
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    
    <div className="prescriber-container">
      <Header></Header>
      <h2>Prescriber Registration</h2>
      <h3>Create an account to sign up for OptioRX Medicinals</h3>
      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData?.firstName}
          onChange={handleChange}
          required
        />

        {/* Last Name */}
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData?.lastName}
          onChange={handleChange}
          required
        />

        {/* Email */}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData?.email}
          onChange={handleChange}
          required
        />

        {/* Phone Number */}
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData?.phoneNumber}
          onChange={handleChange}
          required
        />

        {/* Credentials (Dropdown) */}
        <label htmlFor="credentials">Credentials:</label>
        <select
          id="credentials"
          name="credentials"
          value={formData?.credentials}
          onChange={handleChange}
          required
        >
          <option value="">Select Credentials</option>
          <option value="md">MD</option>
          <option value="do">DO</option>
          <option value="pharmd">PharmD</option>
          {/* Add more options as needed */}
        </select>


        {/* Practice Name */}
        <label htmlFor="practiceName">Practice Name:</label>
        <input
          type="text"
          id="practiceName"
          name="practiceName"
          value={formData?.practiceName}
          onChange={handleChange}
          required
        />

        {/* Practice Address Line 1 */}
        <label htmlFor="practiceAddressLine1">Practice Address Line 1:</label>
        <input
          type="text"
          id="practiceAddressLine1"
          name="practiceAddressLine1"
          value={formData?.practiceAddressLine1}
          onChange={handleChange}
          required
        />

        {/* Practice Address Line 2 */}
        <label htmlFor="practiceAddressLine2">Practice Address Line 2:</label>
        <input
          type="text"
          id="practiceAddressLine2"
          name="practiceAddressLine2"
          value={formData?.practiceAddressLine2}
          onChange={handleChange}
        />

        {/* Practice City */}
        <label htmlFor="practiceCity">Practice City:</label>
        <input
          type="text"
          id="practiceCity"
          name="practiceCity"
          value={formData?.practiceCity}
          onChange={handleChange}
          required
        />

        {/* Practice Zip Code */}
        <label htmlFor="practiceZipCode">Practice Zip Code:</label>
        <input
          type="number"
          id="practiceZipCode"
          name="practiceZipCode"
          value={formData?.practiceZipCode}
          onChange={handleChange}
          required
        />

        {/* NPI Number */}
        <label htmlFor="npiNumber">NPI Number:</label>
        <input
          type="number"
          id="npiNumber"
          name="npiNumber"
          value={formData?.npiNumber}
          onChange={handleChange}
          required
        />

        {/* Medical License State (Dropdown) */}
        <label htmlFor="medicalLicenseState">Medical License State:</label>
        <select
          id="medicalLicenseState"
          name="medicalLicenseState"
          value={formData?.medicalLicenseState}
          onChange={handleChange}
          required
        >
          {/* Add your state options here */}
          <option value="state1">State 1</option>
          <option value="state2">State 2</option>
          {/* Add more states as needed */}
        </select>

        {/* License Number */}
        <label htmlFor="licenseNumber">License Number:</label>
        <input
          type="number"
          id="licenseNumber"
          name="licenseNumber"
          value={formData?.licenseNumber}
          onChange={handleChange}
          required
        />

        {/* Password */}
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData?.password}
          onChange={handleChange}
          required
        />

        {/* Confirm Password */}
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData?.confirmPassword}
          onChange={handleChange}
          required
        />
        {/*  */}
        {/* Opt In to Physician Search */}
        <label>
          <input
            type="checkbox"
            name="optInPhysicianSearch"
            checked={formData?.optInPhysicianSearch}
            onChange={handleChange}
          />
          Opt In to Physician Search
        </label>

        {/* Agree to Privacy Policy */}
        <label>
          <input
            type="checkbox"
            name="agreeToPrivacyPolicy"
            checked={formData?.agreeToPrivacyPolicy}
            onChange={handleChange}
          />
          Agree to our Privacy Policy
        </label>

        {/* Accept BAA */}
        <label>
          <input
            type="checkbox"
            name="acceptBAA"
            checked={formData?.acceptBAA}
            onChange={handleChange}
          />
          Accept our BAA
        </label>


        <button type="submit">Submit</button>
      </form>
    </div>
    </>
    
  );
};

export default Prescriber;
