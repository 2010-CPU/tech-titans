import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

 
const TakeMoney = ({token}) => {
  const stripeKey = 'sk_test_51IgfNNBiothv58cf1OMUUdoXVz5akce35IHlHHrfkcz3hmB2jq3HPYomKuN9Ed8D242645yU8KyqmIPFsrABUDbM00YcTM2dDt'
   const onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }
 
  // ...
 {
    return <>
      // ...
      <StripeCheckout
        token={token}
        stripeKey="my_PUBLISHABLE_stripekey"
      />
      </>
  }
}


export default TakeMoney;