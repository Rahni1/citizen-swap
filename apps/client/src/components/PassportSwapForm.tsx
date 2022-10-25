import React, { useState } from 'react';

const PassportSwapForm: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<String[]>();

    const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
            <h3>Select issuing country for current passport.</h3>
            <select multiple size={5} onChange={onChangeHandler} className="select">
                <option value="UK">UK</option>
            </select>
            <br />
            <h3>Select country for desired passport.</h3>
            <select multiple size={5} onChange={onChangeHandler} className="select">
                <option value="USA">USA</option>
            </select>
            <br />
      
        </div>
          {selectedCountry && <div className='swapInfoCard'>
            {selectedCountry} 
            <p>We have found 3 seekers.
               </p>
            <button>Submit request</button>
            </div>}
            </div>
    );
}
export default PassportSwapForm;
