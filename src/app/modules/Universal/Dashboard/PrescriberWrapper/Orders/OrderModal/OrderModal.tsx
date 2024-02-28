import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormControl } from 'react-bootstrap';
import axios from 'axios'; // Import Axios for making HTTP requests
import medsData from '../../../../../../assets/jsons/meds.json';

interface Medicine {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface OrderModalProps {
  show: boolean;
  onHide: () => void;
  patientName: string;
  prescriberID: string;
  patientID: string;
}

const OrderModal: React.FC<OrderModalProps> = ({ show, onHide, patientName, prescriberID, patientID }) => {
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[]>([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [compoundingDetails, setCompoundingDetails] = useState('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Reset form values when modal is opened
    if (show) {
      setSelectedMedicines([]);
      setSelectedOption('');
      setCompoundingDetails('');
      setMessage('');
    }
  }, [show]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleMedicineCheckboxChange = (medicine: Medicine) => {
    if (selectedMedicines.find(med => med.id === medicine.id)) {
      setSelectedMedicines(selectedMedicines.filter(med => med.id !== medicine.id));
    } else {
      setSelectedMedicines([...selectedMedicines, medicine]);
    }
  };

  const handleCompoundingDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCompoundingDetails(e.target.value);
  };

  const handlePlaceOrderClick = async () => {
    setMessage('');
    try {
      // Create payload object
      const payload = {
        medicineType: selectedOption,
        selectedMedicines: selectedMedicines.map(medicine => medicine.name),
        compoundingDetails: compoundingDetails,
        prescriberID: prescriberID,
        patientID: patientID
      };

      // Make a POST request to place the order
      const response = await axios.post('https://meteor-c535aaff4f8f.herokuapp.com/api/prescriber/placeOrder', payload);

      // Show success message if request is successful
      setMessage(response.data.message);
    } catch (error : any ) {
      // Show error message if request fails
      setMessage(error.response.data.error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Order Medicine for {patientName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h5> {message && <p>{message}</p>}
       </h5>
        <Form>
          <Form.Group controlId="formMedicineType">
            <Form.Label>Select Medicine Type:</Form.Label>
            <select className="form-control" onChange={handleSelectChange} value={selectedOption}>
              <option value="">Select...</option>
              <option value="general">General</option>
              <option value="compounding">Compounding</option>
            </select>
          </Form.Group>
          {selectedOption === 'general' && (
            <Form.Group controlId="formMedicineList">
              <Form.Label>Choose Medicines:</Form.Label>
              {medsData.map((medicine: Medicine) => (
                <Form.Check
                  key={medicine.id}
                  type="checkbox"
                  id={`medicine-${medicine.id}`}
                  label={medicine.name}
                  onChange={() => handleMedicineCheckboxChange(medicine)}
                />
              ))}
            </Form.Group>
          )}
          {selectedOption === 'compounding' && (
            <Form.Group controlId="formCompoundingDetails">
              <Form.Label>Enter Compounding Details:</Form.Label>
              <FormControl
                as="textarea"
                rows={3}
                placeholder="Enter details..."
                onChange={handleCompoundingDetailsChange}
                value={compoundingDetails}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePlaceOrderClick}>
          Place Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
