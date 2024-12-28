import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        alert(`Searching for: ${searchQuery}`);
    };

    return (
        <div className="container mt-4">
            <Form onSubmit={handleSearchSubmit} className="d-flex">
                <div className="col-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products..."
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-light" type="button">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default SearchBar;
