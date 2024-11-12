import React from 'react';

const Card = ({ data }) => {
  console.log(data);

  const readMore = (url) => {
    window.open(url, '_blank'); // Open in a new tab
  };

  return (
    <div className='cardContainer'>
      {data.map((curItem, index) => {
        // Skip items without images or required fields
        if (!curItem.urlToImage || !curItem.title || !curItem.description) {
          return null;
        }

        return (
          <div className='card' key={index}>
            <img src={curItem.urlToImage} alt={curItem.title || "News image"} />
            <div className='content'>
              <a 
                className='title' 
                onClick={() => readMore(curItem.url)} 
                style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
              >
                {curItem.title}
              </a>
              <p>{curItem.description}</p>
              <button onClick={() => readMore(curItem.url)}>Read More</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
