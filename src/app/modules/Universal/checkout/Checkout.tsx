import React from 'react';

const Checkout: React.FC = () => {
  const handleClick = () => {
    fetch("https://production-redcircle-e4c6af6e6b63.herokuapp.com/api/v1/payments/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          { id: 1, quantity: 1 },
          { id: 2, quantity: 1 },
        ],
      }),
    })
      .then(res => {
        if (res.ok) return res.json();
        return res.json().then(json => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch(e => {
        console.error(e.error);
      });
  };

  return (
    <div>
      <h1>Checkout Page</h1>
      <button onClick={handleClick}>Click for demo checkout .</button>
    </div>
  );
};

export default Checkout;
