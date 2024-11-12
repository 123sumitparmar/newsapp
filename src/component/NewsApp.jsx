import React, { useEffect, useState } from 'react';
import Card from './Card';

const NewsApp = () => {
  const [search, setSearch] = useState("india"); // Default search term
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const API_KEY = "d13680ecc6c049cf9b9a23768df30fe9";

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
      
      if (response.status === 429) {
        setError("You've reached the request limit. Please try again later.");
        setNewsData([]);
        return;
      }
      
      const jsonData = await response.json();
      if (jsonData.articles) {
        setNewsData(jsonData.articles.slice(0, 10)); // Top 10 articles
      } else {
        setError("No articles found.");
        setNewsData([]);
      }
    } catch (error) {
      console.error("Error fetching news data:", error);
      setError("Failed to load news. Please try again later.");
      setNewsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  const handleAllNewsClick = () => {
    setSearch("news"); // Broad term for general news
  };

  const handleTrendingClick = () => {
    setSearch("trending"); // Broad term for trending news
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <nav>
        <div>
          <h1> &#x1F6A8;New Alerts&#x1F6A8;</h1>
        </div>
        <ul style={{ display: "flex", gap: "11px" }}>
          <button 
            onClick={handleAllNewsClick} 
            style={{ fontWeight: 600, fontSize: "17px" }}
          >
            All News
          </button>
          
          <button 
            onClick={handleTrendingClick} 
            style={{ fontWeight: 600, fontSize: "17px" }}
          >
            Trending
          </button>
        </ul>
        <div className='searchBar'>
          <input 
            type='text' 
            placeholder='Search News' 
            value={search} 
            onChange={handleInputChange} 
          />
          <button onClick={getData}>Search</button>
        </div>
      </nav>
      
      <div className='categoryBtn'>
        <button onClick={() => setSearch("sports")}>Sports</button>
        <button onClick={() => setSearch("politics")}>Politics</button>
        <button onClick={() => setSearch("entertainment")}>Entertainment</button>
        <button onClick={() => setSearch("health")}>Health</button>
        <button onClick={() => setSearch("fitness")}>Fitness</button>
      </div>
      <div>
        {loading ? <p>Loading news...</p> : error ? <p>{error}</p> : <Card data={newsData} />}
      </div>
      <div className="footer">
        <p>© 2024 Trendy News. All rights reserved.</p>
      </div>
    </div>
    
  );
};

export default NewsApp;
