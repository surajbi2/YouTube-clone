import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchList.css';

function SearchList({ TitleArray = [], setSearchQuery }) {
  return (
    <div className="Container_SearchList">
      {TitleArray.length === 0 ? (
        <p>No results found</p>
      ) : (
        TitleArray.map((m) => (
          <p 
            key={m} 
            onClick={() => setSearchQuery(m)} 
            className='titleItem'>
            <FaSearch />
            {m}
          </p>
        ))
      )}
    </div>
  );
}

export default SearchList;
