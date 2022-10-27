import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from '../Navbar'

afterEach(() => {
    cleanup();
})

test('title is rendered in navbar', () => {
    render(<Navbar />);
    const navTitle = screen.getByText('Passport Swap')
    expect(navTitle).toBeInTheDocument()
})