import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap'; // Assuming you have installed react-bootstrap

import medsData from '../../../../../assets/jsons/meds.json';
import image from    '../../../../../assets/images/meds.jpeg'

interface InventoryProps {
  id: string;
}

const Inventory: React.FC<InventoryProps> = ({ id }) => {
  useEffect(() => {
    // Log the array from the JSON file
    console.log(medsData);
  }, []);

  return (
    <div>
      <h2>Inventory</h2>
      <Row  >
        {medsData.map((med: any) => (
          <Col key={med.id} sm={6} md={4} lg={3}>
            <Card className='mb-2' >
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title>{med.name}</Card.Title>
                {/* <Card.Text>{med.description}</Card.Text> */}
                <Card.Text>Price: ${med.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Inventory;
