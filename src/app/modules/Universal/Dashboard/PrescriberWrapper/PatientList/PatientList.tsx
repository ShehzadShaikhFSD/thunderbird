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
  isVerifiedPrescriber: boolean;
}

const PatientList: React.FC<PatientListProps> = ({ id, isVerifiedPrescriber   }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const [selectedPatientid, setselectedPatientid] = useState("");
  const [selectedPrescriberId, setselectedPrescriberId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  const handleOrderClick = (firstName: string, patientID: string, prescriberID: string) => {
    setShowModal(true);
    setSelectedPatientName(firstName);
    setselectedPatientid(patientID);
    setselectedPrescriberId(prescriberID);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`https://production-redcircle-e4c6af6e6b63.herokuapp.com/api/v1/patients/getByPrescriber/${id}`);
        const data = await response.json();
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, [id]);

  useEffect(() => {
    const filtered = patients.filter(patient =>
      patient.firstName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchQuery, patients]);

  return (
    <div className="container mt-5">
      <h2>Patients</h2>
      <div className="search-bar mb-4">
        <input type="text" placeholder="Search by first name" value={searchQuery} onChange={handleSearch} />
      </div>
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
            {filteredPatients.map(patient => (
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
                  <Button disabled={!isVerifiedPrescriber} variant="primary" onClick={() => handleOrderClick(patient.firstName, patient._id, id)}>
                    Prescribe
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <OrderModal show={showModal} onHide={handleCloseModal} patientName={selectedPatientName} patientID={selectedPatientid} prescriberID={selectedPrescriberId} />
      </div>
    </div>
  );
};

export default PatientList;
