import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface PatientModalProps {
  show: boolean;
  handleClose: () => void;
  id: string;
  selectedMedicines: string[]; // Add selected medicines prop
  medicineType: string; // Add medicine type prop
}

const PatientModal: React.FC<PatientModalProps> = ({ show, handleClose, id, selectedMedicines, medicineType }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);

  useEffect(() => {
    if (show) {
      fetchPatients();
    }
  }, [show, id]);

  const fetchPatients = async () => {
    try {
      const response = await fetch(`https://meteor-c535aaff4f8f.herokuapp.com/api/getpatientsByPId/${id}`);
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handlePatientSelect = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  const handleConfirmOrder = async () => {
    try {
      // Check if a patient is selected
      if (!selectedPatientId) {
        throw new Error('Patient not selected');
      }

      // Find the selected patient from the patients array
      const selectedPatient = patients.find(patient => patient._id === selectedPatientId);

      // Create payload object
      const payload = {
        medicineType: medicineType === 'inventory' ? 'general' : medicineType,
        selectedMedicines: selectedMedicines,
        prescriberID: id,
        patientID: selectedPatientId,
        compoundingDetails: '',
        patientName: `${selectedPatient?.firstName} ${selectedPatient?.lastName}` // Dynamically include patient's name
      };

      // Make a POST request to place the order
      const response = await axios.post('https://meteor-c535aaff4f8f.herokuapp.com/api/prescriber/placeOrder', payload);

      // Show success message if request is successful
      setMessage(response.data.message);
      setShowMessageModal(true);
    } catch (error : any) {
      // Show error message if request fails
      setMessage(error.response?.data?.error || error.message);
      setShowMessageModal(true);
    }
  };

  const handleCloseMessageModal = () => {
    setShowMessageModal(false);
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Patient</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {patients.map((patient: Patient) => (
            <div key={patient._id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
              <Form.Check
                type="radio"
                name="patientRadio"
                label={`Name: ${patient.firstName} ${patient.lastName}, Email: ${patient.email}`}
                onChange={() => handlePatientSelect(patient._id)}
              />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmOrder} disabled={!selectedPatientId}>
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showMessageModal} onHide={handleCloseMessageModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseMessageModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PatientModal;
