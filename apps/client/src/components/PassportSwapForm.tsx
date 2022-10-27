import e from 'express';
import React from 'react';

const PassportSwapForm: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = React.useState<String[]>([]);
    const [curCountry, setCurCountry] = React.useState("");

    const onCurCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const currentCountry = event.target.value;
       setCurCountry(currentCountry)
    }

    const handleSubmit = () => {
        console.log('button submitted')
    }

    const onSwapCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = event.currentTarget.selectedOptions;

        const newCountries = [];
        for (let i = 0; i < selectedOptions.length; i++) {
            newCountries.push(selectedOptions[i].value);
        }

        setSelectedCountry(newCountries);
    };

    return (
        <div className='passportSwapContainer'>
        <div className="container">
            <h3 data-testid="currentCountryHeader">Select issuing country for current passport.</h3>
            <select data-testid="currentCountry-dropdown" size={5} value={curCountry} 
            onChange={onCurCountryChange} className="select">
                <option data-testid="curCountry-option" value="UK">UK</option>
            </select>
            <br />
            <h3>Select country for desired passport.</h3>
            <select data-testid="swapCountry-dropdown" multiple size={5} onChange={onSwapCountryChange} className="select">
                <option data-testid="select-option" value="USA">USA</option>
            </select>
            <br />
      
        </div>
          {selectedCountry && 
          <div className='swapInfoCard'>
            <p><strong>{selectedCountry} </strong></p>
            <p>We have found 3 seekers.</p>
            <button onSubmit={handleSubmit}>Submit request</button>
            </div>}
            </div>
    );
}
export default PassportSwapForm;
