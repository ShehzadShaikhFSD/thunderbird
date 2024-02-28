import React from 'react'
import './Orders.css'

interface OrderProps {
    id: string;
  }
  
const Orders : React.FC<OrderProps> = ({ id }) => {
  return (
    <div>Orders</div>
  )
}

export default Orders