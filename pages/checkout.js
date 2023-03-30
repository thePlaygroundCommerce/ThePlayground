import { useRouter } from 'next/router';
import React from 'react'
import checkout from './api/checkout';

const { Client, Environment } = require("square");

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,
});

const { checkoutApi } = squareClient;



const Checkout = (props) => {
  const router = useRouter()
  if (typeof window !== "undefined") {
    // Client-side-only code
    window.location.assign("https://sandbox.square.link/u/z4bVeeAR")
  }

  return (
   null
  )
}

export default Checkout

export async function getServerSideProps(){

  try {
    // const response = await checkoutApi.createPaymentLink({
    //   idempotencyKey: '2360cade-9675-4a3a-a2c2-fea70bbdda92',
    //   quickPay: {
    //     name: 'Auto Detailing',
    //     priceMoney: {
    //       amount: 12500,
    //       currency: 'USD'
    //     },
    //     locationId: 'LFX4KWJMYHQZ3'
    //   }
    // });

    // console.log(response.result);
    return {
      props: {
        // response
      }
     }
  
  } catch(error) {
    console.log(error);
  }
}