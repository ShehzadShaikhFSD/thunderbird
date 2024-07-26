import React, { useState, useEffect } from 'react';

// Define interfaces for the data structure
interface Patient {
  _id: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  city: string;
  state: string;
  zipcode: string;
  gender: string;
  DOB: string;
  prescriberIds: string[];
  siteId: number;
  passwordExpiry: string;
  createdAt: string;
}

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
  agreeToPrivacyPolicy: boolean;
  acceptBAA: boolean;
  isVerifiedPrescriber: boolean;
  fax: string;
  siteId: number;
  __v: number;
  bussinessV1Enabled: boolean;
  bussinessV2Enabled: boolean;
  bussinessV3Enabled: boolean;
  optedForBussinessV1: boolean;
  optedForBussinessV2: boolean;
  optedForBussinessV3: boolean;
  signatureLink: string;
}

interface PrescriptionItem {
  _id: string;
  refills: number;
}

interface Prescription {
  items: PrescriptionItem[];
  orderId: string;
}

interface Payment {
  from: string;
  amount: number;
  paymentStatus: string;
  paymentLink: string;
}

interface Redirection {
  success: string;
  failure: string;
}

interface TransactionDetails {
  id: string;
  intent: string;
  state: string;
  amount: {
    total: string;
    currency: string;
    details: {
      subtotal: string;
      shipping: string;
      insurance: string;
      handling_fee: string;
      shipping_discount: string;
      discount: string;
    };
  };
  payee: {
    merchant_id: string;
    email: string;
  };
  payer: {
    payment_method: string;
    status: string;
    payer_info: {
      email: string;
      first_name: string;
      last_name: string;
      payer_id: string;
      shipping_address: {
        recipient_name: string;
        line1: string;
        city: string;
        state: string;
        postal_code: string;
        country_code: string;
      };
      country_code: string;
    };
  };
  transactions: any[];
  failed_transactions: any[];
  create_time: string;
  update_time: string;
  links: any[];
  httpStatusCode: number;
}

interface Order {
  _id: string;
  patient: Patient;
  prescriber: Prescriber;
  prescription: Prescription;
  payment: Payment;
  redirection: Redirection;
  paymentStatus: string;
  rxStatus: string;
  prescriptionExpiry: string;
  createdAt: string;
  rxNumber: string;
  medicationName: string;
  __v: number;
  payerId: string;
  payerToken: string;
  transactionDetails: TransactionDetails;
}

interface ApiResponse {
  countOfOrders: number;
  order: Order[];
  totalOrders : number;
}

const Prescriptions: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [countOfOrders, setCountOfOrders] = useState(0);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await fetch('https://development-redcircle-fb2ace51f4d4.herokuapp.com/api/v1/admin/prescriptions?limit=10000');
        if (!response.ok) {
          throw new Error('Failed to fetch prescriptions');
        }
        const data: ApiResponse = await response.json();
        console.log(data)
        console.log(data.order)
        // setOrders(data.order);
        setCountOfOrders(data?.totalOrders);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div>
      <h1>Prescriptions</h1>
      <p>Count of orders: {countOfOrders}</p>
      {orders.map(order => (
        <div key={order._id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
          <h2>Order ID: {order._id}</h2>
          <h3>Patient Details</h3>
          <p>Name: {order?.patient?.firstName} {order?.patient?.lastName}</p>
          <p>Email: {order.patient.email}</p>
          <p>Phone Number: {order.patient.phoneNumber}</p>
          <p>Address: {order.patient.addressLine1}, {order.patient.city}, {order.patient.state} {order.patient.zipcode}</p>
          <p>Gender: {order.patient.gender}</p>
          <p>Date of Birth: {new Date(order.patient.DOB).toLocaleDateString()}</p>

          <h3>Prescriber Details</h3>
          <p>Name: {order.prescriber.firstName} {order.prescriber.lastName}</p>
          <p>Email: {order.prescriber.email}</p>
          <p>Phone Number: {order.prescriber.phoneNumber}</p>
          <p>Practice Name: {order.prescriber.practiceName}</p>
          <p>Practice Address: {order.prescriber.practiceAddressLine1}, {order.prescriber.practiceCity}, {order.prescriber.practiceState} {order.prescriber.practiceZipCode}</p>

          <h3>Prescription Details</h3>
          {order.prescription.items.map(item => (
            <div key={item._id}>
              <p>Item ID: {item._id}</p>
              <p>Refills: {item.refills}</p>
            </div>
          ))}

          {/* <h3>Payment Details</h3>
          <p>From: {order.payment.from}</p>
          <p>Amount: ${order.payment.amount}</p>
          <p>Payment Status: {order.payment.paymentStatus}</p>
          <p>Payment Link: <a href={order.payment.paymentLink} target="_blank" rel="noopener noreferrer">View Payment</a></p>

          <h3>Redirection URLs</h3>
          <p>Success URL: <a href={order.redirection.success} target="_blank" rel="noopener noreferrer">{order.redirection.success}</a></p>
          <p>Failure URL: <a href={order.redirection.failure} target="_blank" rel="noopener noreferrer">{order.redirection.failure}</a></p>

          <h3>Transaction Details</h3>
          <p>Transaction ID: {order.transactionDetails.id}</p>
          <p>Intent: {order.transactionDetails.intent}</p>
          <p>State: {order.transactionDetails.state}</p>
          <p>Amount: {order.transactionDetails.amount.total} {order.transactionDetails.amount.currency}</p>
          <p>Payee: {order.transactionDetails.payee.email}</p>
          <p>Payer: {order.transactionDetails.payer.payer_info.email}</p> */}
        </div>
      ))}
    </div>
  );
};

export default Prescriptions;
