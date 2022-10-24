import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <strong>Passport Swap</strong>
                </li>
                <li>About</li>
                <li>
                    Signup
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;