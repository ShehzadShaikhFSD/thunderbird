import React, { useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import medsData from '../../../../../assets/jsons/meds.json';
import image from '../../../../../assets/images/meds.jpeg';
import PatientModal from './PatientModal/PatientModal';
import './Inventory.css';

interface InventoryProps {
  id: string;
}

const Inventory: React.FC<InventoryProps> = ({ id }) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredMeds, setFilteredMeds] = useState<any[]>(medsData);

  const handleCheckboxChange = (productName: string) => {
    const index = selectedProducts.indexOf(productName);
    if (index === -1) {
      setSelectedProducts([...selectedProducts, productName]);
    } else {
      setSelectedProducts(selectedProducts.filter(item => item !== productName));
    }
  };

  const handlePlaceOrder = () => {
    // Implement logic to handle place order functionality
    console.log(selectedProducts);
    // Open the modal
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Close the modal
    setShowModal(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const filtered = medsData.filter(med =>
      med.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredMeds(filtered);
  };

  return (
    <div>
      <h2>Inventory</h2>
      <input className='mt-4 mb-4' type="text" placeholder="Search medicine" value={searchQuery} onChange={handleSearch} />
      <Row>
        {filteredMeds.map((med: any) => (
          <Col key={med.id} sm={6} md={4} lg={3}>
            <Card className='mb-2'>
              <div className='align-checkbox' >
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(med.name)}
                checked={selectedProducts.includes(med.name)}
              />
              </div>
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title>{med.name}</Card.Title>
                <div className="d-flex justify-content-between">
                  <div><strong>Price:</strong> ${med.price}</div>
                  <div><strong>Strength:</strong> {med.strength}</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <Button onClick={handlePlaceOrder}>Place Order</Button>
      </div>
      <PatientModal
        show={showModal}
        handleClose={handleCloseModal}
        id={id}
        selectedMedicines={selectedProducts} // Pass selected medicines array
        medicineType="inventory" // Pass medicine type
      />
    </div>
  );
};

export default Inventory;
