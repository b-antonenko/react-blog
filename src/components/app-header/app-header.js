import React from 'react';

import './app-header.css';

const AppHeader = ({likedAmount, postsAmount}) => {
    return (
        <div className='app-header d-flex'>
            <h1>Antonenko Bohdan</h1>
            <h2>{postsAmount} articles, {likedAmount} liked</h2>
        </div>
    )
};

export default AppHeader;