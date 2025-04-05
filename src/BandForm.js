import React, { useState } from 'react';

function BandForm({ band }) {

  // initially, I will set the state to have default empty values for the form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    cardNumber: '',
    cvv: '',
    expirationDate: '',
    price: 0,
    ticketQuantities: {}, // I added this to track the ticket types and their quantities
  });

  const onBuy = (e) => {
    // will prevent the default form submission behavior
    e.preventDefault();

    // making sure we're actually getting paid 😂
    if (formData.price <= 0) {
      alert('Please select at least one ticket before purchasing.');
      return;
    }

    // validating that all fields are filled in before submitting the form
    if (!formData.firstName || !formData.lastName || !formData.cardNumber || !formData.cvv || !formData.expirationDate) {
      alert('Please fill in all required fields.');
      return;
    }

    // Instead of an actual request, I will dislpay an alert and log the form data to the console
    alert(`Thank you for your purchase! Your total is $${formData.price.toFixed(2)}.`);
    console.log('Form Data:', formData);
  }


  // If no band is provided initially, I want it to say none is selected.
  if (!band) {
    return (
      <div className="p-4 text-center">
        <h1>No band selected</h1>
      </div>
    );
  }

  const handleTicketChange = (e, ticket) => {
    // I grabbed the current ticket count here
    const quantity = parseInt(e.target.value)

    // With that count, I updated the type count. The amount of tickets selected for a specific type of ticket.
    const updatedQuantities = {
      ...formData.ticketQuantities,
      [ticket.type]: quantity,
    };

    // Here, I decided to do the math of calculating the price based on the ticket types and their quantities.
    // using reduce allowed me to loop through each ticket type and calculate the total price based on the quantities selected.
    const newTotal = band.ticketTypes.reduce((total, ticket) => {
      // if nothing for that ticket type count, I will have it return a 0
      const qty = updatedQuantities[ticket.type] || 0;
      console.log('Calculating for ticket type:', ticket.type, 'with quantity:', qty);
      // classic PEMDAS here 😂
      return total + qty * (ticket.cost / 100);
    }, 0);

    // I updated the price with the new price above.
    setFormData({
      ...formData,
      ticketQuantities: updatedQuantities,
      price: newTotal,
    });
  };


  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-10 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* I set us the left column for my form */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{band.name}</h2>
          <p className="text-gray-600 text-sm mb-2">
            {/* had to remember how to format date because I wanted to display it better */}
            <strong>Date:</strong> {new Date(band.date).toLocaleDateString()}
          </p>
          <p className="text-gray-600 text-sm mb-4">
            <strong>Location:</strong> {band.location}
          </p>
          <img
            className="w-full h-48 object-cover rounded mb-4"
            // still gonna use this image for now 😂
            src={'https://cdn2.vectorstock.com/i/1000x1000/96/11/sample-ticket-for-a-musical-concert-design-vector-44029611.jpg'}
            alt={band.name || 'Band Image'}
          />
          <p className="text-gray-700 text-sm">{band.description_blurb}</p>
        </div>


        {/* I set the right column to be a form to match the sample form */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-800">Select Tickets</h3>
          <form onSubmit={onBuy} method='POST'>
            {/* Here, I am looping through the different ticket types and displaying an input for each one. */}
            {band.ticketTypes.map((ticket) => (
              <div key={ticket.type} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="block text-gray-700 text-sm font-bold"
                    htmlFor={ticket.type}
                  >
                    {ticket.name}
                  </label>

                  {/* Converting the ticket costs, in the json, it comes back in cents. Ex. 6000 is $60 */}
                  <span className="text-gray-600 text-sm">${(ticket.cost / 100).toFixed(2)}</span>
                </div>
                <input
                  type="number"
                  id={ticket.type}
                  min="0"
                  // We will start with 0 tickets. I would like to set a max but for now, I will just let it be open-ended.
                  defaultValue="0"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // I passed in the current ticket so that I could create a function up top to calculate the price based on the ticket type and quantity.
                  onChange={(e) => handleTicketChange(e, ticket)}
                />
              </div>
            ))}
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-800 mb-2">Total: ${formData.price}</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    // Update formData for first name. I will do this for all the fields in the form.
                    setFormData({ ...formData, firstName: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setFormData({ ...formData, lastName: e.target.value });
                  }}
                />
              </div>
              <input
                type="text"
                placeholder="Address"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              />
              <h4 className="text-lg font-bold text-gray-800 mb-2">Payment Details</h4>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setFormData({ ...formData, cardNumber: e.target.value });
                  }}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => {
                    setFormData({ ...formData, cvv: e.target.value });
                  }}
                />
              </div>
              <input
                type="text"
                placeholder="MM / YY"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                onChange={(e) => {
                  setFormData({ ...formData, expirationDate: e.target.value });
                }}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Get Tickets
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BandForm;
