// src/UrlShortener.js

import React, { useState } from 'react';
import axios from 'axios';

const UrlShortener = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:7070/shorten', {
        url: url,
      });
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error shortening URL:', error);
      setShortUrl('Error occurred while shortening the URL.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="urlInput">Enter URL:</label>
        <input
          type="text"
          id="urlInput"
          value={url}
          onChange={handleInputChange}
          placeholder="https://example.com"
          required
        />
        <button type="submit">Get Short URL</button>
      </form>
      {shortUrl && (
        <div>
          <p>Short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
