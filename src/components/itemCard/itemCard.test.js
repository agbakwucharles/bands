import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemCard from './itemCard';
import PunkBand from '../../band-json/punk-band.json'; 

describe('ItemCard Component', () => {
    it('calls onTicketPurchase when the button is clicked', () => {
        // Mock function for onTicketPurchase
        const mockOnTicketPurchase = jest.fn();

        // I decided to use the pre existing json for tests
        const mockBand = PunkBand['ticketTypes'][0];
        // Render the component
        render(<ItemCard band={mockBand} onTicketPurchase={mockOnTicketPurchase} />);

        // Find the select tickets button
        const button = screen.getByText('Select Tickets');

        // Simulate a click event of the select tickets button
        fireEvent.click(button);

        // Assert that the mock function was called once
        expect(mockOnTicketPurchase).toHaveBeenCalledTimes(1);

        // Assert that the mock function was called with the correct band data
        expect(mockOnTicketPurchase).toHaveBeenCalledWith(mockBand);
    });

    // Always nice to have some matching snapshots
    it('matches snaptshot', () => {
        const mockOnTicketPurchase = jest.fn();

        // same as above
        const mockBand = PunkBand['ticketTypes'][0];

        const mockData = render(<ItemCard band={mockBand} onTicketPurchase={mockOnTicketPurchase} />);
        expect(mockData).toMatchSnapshot();
    });
});
