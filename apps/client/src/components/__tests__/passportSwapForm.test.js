import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import PassportSwapForm from '../PassportSwapForm'

afterEach(() => {
    cleanup();
})

test('current country dropdown header renders with correct text', () => {
    render(<PassportSwapForm />);
    const curCountryHeader = screen.getByTestId('currentCountryHeader');
    expect(curCountryHeader.textContent).toBe("Select issuing country for current passport.")
})


test('onChange handler gets called when option selected for swapCountry dropdown', () => {
    const { getByTestId, getAllByTestId } = render(<PassportSwapForm />);
    fireEvent.change(getByTestId('swapCountry-dropdown'), { target: { value: 2 } })
    let options = getAllByTestId('select-option')
    expect(options[0].selected).toBeFalsy();
})

test('set current country correctly', () => {
    render(<PassportSwapForm />);
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');

    useStateSpy.mockImplementation((init) => [init, setState]);
    fireEvent.change(screen.getByTestId("curCountry-dropdown"))
     expect(setState).toHaveBeenCalledTimes(1);
    // expect(setState).toHaveBeenCalledWith(currentCountry)
})
