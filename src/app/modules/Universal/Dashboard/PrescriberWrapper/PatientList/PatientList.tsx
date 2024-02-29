// PatientList.tsx
import React, { useState, useEffect } from 'react';
import OrderModal from '../Orders/OrderModal/OrderModal';
import { Button } from 'react-bootstrap';

interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  AddressLine1: string;
  City: string;
  State: string;
  ZipCode: string;
  prescriberId: string;
}

interface PatientListProps {
  id: string;
}

const PatientList: React.FC<PatientListProps> = ({ id }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const [selectedPatientid, setselectedPatientid] = useState("");
  const [selectedPrescriberId, setselectedPrescriberId] = useState("");


  const handleOrderClick = (firstName: string , patientID : string  , prescriberID : string) => {
    setShowModal(true);
    setSelectedPatientName(firstName);
    setselectedPatientid(patientID),
    setselectedPrescriberId(prescriberID)
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`https://meteor-c535aaff4f8f.herokuapp.com/api/getpatientsByPId/${id}`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, [id]);

  return (
    <div className="container mt-5">
      <h2>Patients</h2>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Prescribe</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient._id}>
                <td>{patient.firstName}</td>
                <td>{patient.lastName}</td>
                <td>{patient.email}</td>
                <td>{patient.phoneNumber}</td>
                <td>{patient.AddressLine1}</td>
                <td>{patient.City}</td>
                <td>{patient.State}</td>
                <td>{patient.ZipCode}</td>
                <td>
                  <Button variant="primary" onClick={() => handleOrderClick(patient.firstName ,patient._id , id )}>
                    Prescribe
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <OrderModal show={showModal} onHide={handleCloseModal} patientName={selectedPatientName} patientID={selectedPatientid}  prescriberID={selectedPrescriberId} />
      </div>
    </div>
  );
};

export default PatientList;
