import { CardElement } from "@stripe/react-stripe-js";
import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import Product from "./Product";

const CheckoutForm = () => {


          
                const CARD_ELEMENT_OPTIONS = {
                iconStyle: "solid",
                hidePostalCode: true,
                style: {
                    base: {
                    iconColor: "rgb(240, 57, 122)",
                    color: "rgb(240, 57, 122)",
                    fontSize: "16px",
                    fontFamily: '"Open Sans", sans-serif',
                    fontSmoothing: "antialiased",
                    "::placeholder": {
                        color: "#CFD7DF"
                    }
                    },
                    invalid: {
                    color: "#e5424d",
                    ":focus": {
                        color: "#303238"
                    }
                    }
                }
                };

                function CardSection() {
                return <CardElement options={CARD_ELEMENT_OPTIONS} />;
                }
                


      // handle payment request
     const handleSubmit = async event => {
        event.preventDefault();
      
        const { stripe, elements } = this.props;
        if (!stripe || !elements) {
          return;
        }
      
        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card);
        if (result.error) {
          console.log(result.error.message);
        } else {
          console.log(result.token);
          // pass the token to your backend API
        }
      };
  
    
    
      return (
        <div>
          <div class="product-info">
            <h3 className="product-title">{Product.name}</h3>
            <h4 className="product-price">{Product.price}</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <CardSection />
            <button className="btn-pay">Buy Now</button>
          </form>
        </div>
      );
}
    
  





export default CheckoutForm;