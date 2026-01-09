import React from 'react';
import { Search } from 'lucide-react';
import './Accounts.css';

const Accounts: React.FC = () => {
    // Sample data to match the image
    const accounts = Array(8).fill({
        unitLocation: 'P5500.00',
        email: 'Palapye', // Image puts 'Palapye' under Email Address column? A bit odd but I will follow the image text exactly or logical field? 
        // Image shows: UNIT LOCATION: P5500.00, EMAIL ADDRESS: Palapye, PHONE NUMBER: +267..., TOTAL BALANCE: P600 000.00
        // It seems the headers in the design might be mismatched with content, or "Palapye" is the specific address/email placeholder.
        // I'll stick to the text in the image.
        phone: '+26775536733',
        balance: 'P600`000.00',
        type: 'TPS'
    });

    return (
        <div className="accounts-container">
            <div className="page-header">
                <h2 className="page-title">Accounts</h2>

                <div className="header-actions">
                    <div className="search-bar-alt">
                        <Search size={18} color="#999" />
                        <input type="text" placeholder="Search for accounts here" className="search-input" />
                    </div>

                    <button className="filter-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 2048 2048" style={{ marginRight: '8px' }}>
                            <path fill="currentColor" d="M1152 1536h896l-448 448zm0-128v-128H896v640H256v-805l-83 82l-90-90l941-942l941 942l-90 90l-83-82v293h-128V987l-640-640l-640 640v805h384v-640h512v256z" />
                        </svg>
                        Filter by Location
                    </button>

                    <button className="action-btn-red">
                        Tenant Purchase Scheme
                    </button>
                </div>
            </div>

            <div className="accounts-table-container">
                <table className="accounts-table">
                    <thead>
                        <tr>
                            <th>UNIT LOCATION</th>
                            <th>EMAIL ADDRESS</th>
                            <th>PHONE NUMBER</th>
                            <th>TOTAL BALANCE</th>
                            <th>ACCOUNT TYPE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((acc, index) => (
                            <tr key={index}>
                                <td className="location-text">{acc.unitLocation}</td>
                                <td>{acc.email}</td>
                                <td>{acc.phone}</td>
                                <td className="balance-text">{acc.balance}</td>
                                <td>
                                    <span className="type-badge">{acc.type}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Accounts;
