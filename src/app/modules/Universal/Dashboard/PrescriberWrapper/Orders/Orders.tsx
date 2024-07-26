import React, { useEffect, useState } from 'react';
import './Orders.css';
import Cookie from 'universal-cookie';

const cookies = new Cookie();
interface Order {
  index: number;
  medicineType: string;
  selectedMedicines: string[];
  compoundingDetails: string;
  patientName: string;
  createdAt: string;
}

interface OrderProps {
  id: string;
}

const Orders: React.FC<OrderProps> = ({ id }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = cookies.get('TOKEN');
        const queryParams = new URLSearchParams({
          prescriberID: id
        });
        const response = await fetch(`https://development-redcircle-fb2ace51f4d4.herokuapp.com/api/v1/prescribers/orders?${queryParams}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();

        // Modify the orders data to match the new format
        const modifiedOrders = data.orders.map((order: any, index: number) => ({
          index: index,
          medicineType: order.medicineType,
          selectedMedicines: order.selectedMedicines,
          compoundingDetails: order.compoundingDetails,
          patientName: order.patientName,
          createdAt: new Date(order.createdAt).toLocaleString()
        }));

        setOrders(modifiedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [id]);

  return (
    <div>
      <h2>Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Medicine Type</th>
            <th>Selected Medicines</th>
            <th>Compounding Details</th>
            <th>Patient Name</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.index}>
              <td>{order.index + 1}</td>
              <td>{order.medicineType}</td>
              <td>{order.selectedMedicines.length > 0 ? order.selectedMedicines.join(', ') : 'NA'}</td>
              <td>{order.compoundingDetails || 'NA'}</td>
              <td>{order.patientName || 'NA'}</td>
              <td>{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
