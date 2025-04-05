import React from 'react';

const ItemCard = ({ band, onTicketPurchase }) => {
  return (
    <div className="max-w-sm rounded shadow-lg bg-white border border-gray-200 p-4 flex flex-col justify-evenly h-full">
      <img
        className="w-full h-48 object-cover rounded"
        // my image for now. I know its not dynamic, but it will hold for now until I get a image back.
        src={'https://cdn2.vectorstock.com/i/1000x1000/96/11/sample-ticket-for-a-musical-concert-design-vector-44029611.jpg'}
        alt={band?.name || 'band image'}
      />
      <div className="px-4 py-2">
        <h2 className="font-bold text-xl mb-2 text-gray-800">{band?.name || 'band name'}</h2>
        <p className="text-gray-600 text-sm mb-4">{band?.description_blurb || 'Description not available.'}</p>
        <p className="text-gray-700 text-sm">
          <strong>Location:</strong> {band?.location || 'Location not available'}
        </p>
      </div>
      <div className="px-4 py-2 mt-4 text-center">
        {/* I am sending the selected band back to the parent component when the button is clicked. */}
        <button onClick={() => onTicketPurchase(band)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full">
          Select Tickets
        </button>
      </div>
    </div>
  );
};

export default ItemCard;