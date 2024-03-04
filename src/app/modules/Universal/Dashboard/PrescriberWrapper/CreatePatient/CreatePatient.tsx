import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './CreatePatient.css'
interface CreatePatientProps {
  id: string;
}

const CreatePatient: React.FC<CreatePatientProps> = ({ id }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    AddressLine1: '',
    City: '',
    State: '',
    ZipCode: '',
    password: '',
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const prescriberId = id;
      const response = await axios.post('https://meteor-c535aaff4f8f.herokuapp.com/api/v1/patients/create', {
        ...formData,
        prescriberId,
      });
      setSuccessMessage("Patient Created Successfully "); // Assuming the API returns a success message
      setShowSuccessModal(true);
      // Reset form fields after successful submission
      // setFormData({
      //   firstName: '',
      //   lastName: '',
      //   email: '',
      //   phoneNumber: '',
      //   AddressLine1: '',
      //   City: '',
      //   State: '',
      //   ZipCode: '',
      //   password: '',
      // });
    } catch (error) {
      setErrorMessage(" Failed to create user  "); // Assuming the API returns an error message
      setShowErrorModal(true);
      // console.log(Response)
      // console.log(error)
      console.error('Error creating patient as Patient Email already exists ', );
    }
  };

  return (
    <div className="container mt-5 max-width">
      <h2>Create Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" className="form-control" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="AddressLine1">Address Line 1</label>
          <input type="text" className="form-control" id="AddressLine1" name="AddressLine1" value={formData.AddressLine1} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="City">City</label>
          <input type="text" className="form-control" id="City" name="City" value={formData.City} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="State">State</label>
          <input type="text" className="form-control" id="State" name="State" value={formData.State} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="ZipCode">Zip Code</label>
          <input type="text" className="form-control" id="ZipCode" name="ZipCode" value={formData.ZipCode} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
   {/* Success Modal */}
   <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={handleCloseErrorModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseErrorModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreatePatient;