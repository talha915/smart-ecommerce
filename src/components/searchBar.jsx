import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
        <div className="container m-6">
            <Form onSubmit={handleSearchSubmit} className="d-flex">
                <div className="col-6">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="I'm looking for..."
                            aria-label="Search"
                        />
                        <Button className="btn btn-outline-light btn btn-secondary">
                            <FontAwesomeIcon icon={faSearch} />
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default SearchBar;
