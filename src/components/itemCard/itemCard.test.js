import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemCard from './itemCard';

describe('ItemCard Component', () => {
    it('calls onTicketPurchase when the button is clicked', () => {
        // Mock function for onTicketPurchase
        const mockOnTicketPurchase = jest.fn();

        // Mock band data
        const mockBand = {
            name: 'New Band',
            description_blurb: 'This is some random information that I made up that makes no sense.',
            location: 'Outside',
            imgUrl: 'https://randomImageThatIsntReal.com',
        };

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

        const mockBand = {
            name: 'New Band',
            description_blurb: 'This is some random information that I made up that makes no sense.',
            location: 'Outside',
            imgUrl: 'https://randomImageThatIsntReal.com',
        };

        const mockData = render(<ItemCard band={mockBand} onTicketPurchase={mockOnTicketPurchase} />);
        expect(mockData).toMatchSnapshot();
    });
});