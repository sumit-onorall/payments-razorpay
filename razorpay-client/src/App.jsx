import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function loadScript(src) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }

    document.body.appendChild(script);
  })
}

const __DEV__  = document.domain === 'localhost';


function App() {
  // prefill
  const userDetails = { name: 'Sumit', email: 'sumit@gmail.com', contact: 9999785412}

  async function displayRazorpay() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert('Razorpay SDK failed to load.')
      return;
    }
      
    const data = await fetch("http://localhost:1337/razorpay", {
      method: "POST",
    }).then((t) => t.json());
    
    console.log(data)

    const options = {
      key: "rzp_test_27c5sxy15ExbIz",
      amount: data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "CretSkill",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",

      // logged in user
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open()
  }

  

  

  return (
    <div className="App">
      <h1>Payments</h1>
      <button onClick={displayRazorpay}>Donate $5</button>
    </div>
  );
}

export default App
