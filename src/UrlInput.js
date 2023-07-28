// src/components/UrlInput.js

import React, { useState } from 'react';
import axios from 'axios';

const UrlInput = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://api-ssl.bitly.com/v4/shorten',
        {
          long_url: url,
        },
        {
          headers: {
            Authorization: 'Bearer YOUR_BITLY_ACCESS_TOKEN', // Replace with your Bitly access token
            'Content-Type': 'application/json',
          },
        }
      );
      setShortUrl(response.data.link);
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

export default UrlInput;
