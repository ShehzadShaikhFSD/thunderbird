import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FormControl, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import medsData from '../../../../../../assets/jsons/meds.json';
import image from '../../../../../../assets/images/meds.jpeg';
import './OrderModal.css';

interface Medicine {
  strength: string;
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
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [errorModalShow, setErrorModalShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Reset form values when modal is opened
    if (show) {
      setSelectedMedicines([]);
      setSelectedOption('');
      setCompoundingDetails('');
      setMessage('');
      setSuccessModalShow(false);
      setErrorModalShow(false);
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
        patientID: patientID,
        patientName: patientName,
      };

      // Make a POST request to place the order
      const response = await axios.post('https://meteor-c535aaff4f8f.herokuapp.com/api/v1/prescribers/place-order', payload);

      // Show success message if request is successful
      setMessage(response.data.message);
      setSuccessModalShow(true);
    } catch (error : any) {
      // Show error message if request fails
      setMessage(error.response?.data?.error || error.message);
      setErrorModalShow(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredMedsData = medsData.filter((medicine: Medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Modal show={show} onHide={onHide} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Prescribe Medicine for {patientName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{message && <p>{message}</p>}</h5>
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
              <Form.Group controlId="formSearch">
                <Form.Label>Search Medicine:</Form.Label>
                <FormControl
                  type="text"
                  placeholder="Enter medicine name"
                  onChange={handleSearchChange}
                  value={searchTerm}
                />
              </Form.Group>
            )}
            <Row>
              {selectedOption === 'general' &&
                filteredMedsData.map((medicine: Medicine) => (
                  <Col key={medicine.id} sm={6} md={4} lg={3}>
                    <Card>
                      <div className="position-relative">
                        <Form.Check
                          type="checkbox"
                          id={`medicine-${medicine.id}`}
                          className="position-absolute top-0 start-0 mt-2 ms-2"
                          onChange={() => handleMedicineCheckboxChange(medicine)}
                        />
                      </div>
                      <Card.Img variant="top" src={image} />
                      <Card.Body>
                        <Card.Title>{medicine.name}</Card.Title>
                        <div className="align-price-str">
                          <div>${medicine.price}</div>
                          <div>{medicine.strength}</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
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
          <Button
            variant="primary"
            onClick={handlePlaceOrderClick}
            disabled={
              (selectedOption === 'general' && selectedMedicines.length === 0) ||
              (selectedOption === 'compounding' && compoundingDetails.trim() === '')
            }
          >
            Prescribe
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Success Modal */}
      <Modal show={successModalShow} onHide={() => setSuccessModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Prescribed successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { setSuccessModalShow(false); onHide(); }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Error Modal */}
      <Modal show={errorModalShow} onHide={() => setErrorModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { setErrorModalShow(false); onHide(); }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderModal;
