import React from 'react';
import styles from '../styles/loader.module.css'; 

const Loader = ({ message = "We are searching the best deals and products based on price., please wait..." }) => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingMessage}>{message}</p>
        </div>
    );
};

export default Loader;
