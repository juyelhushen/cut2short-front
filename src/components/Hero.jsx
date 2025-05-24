import React, { useState } from "react";
import { makeShort } from "../services/UrlService";

const Hero = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");

  const handleUrlShortClick = async () => {
    try {
      const payload = {
        originalUrl: inputUrl,
      };
      const response = await makeShort(payload);
      console.log('data',response.data);
      
      if (response.success) {
        setShortenedUrl(response.data.shortenUrl);
      }
    } catch (error) {
      console.error("error : ", error);
    }
  };

  console.log("url",setShortenedUrl);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };
  return (
    <section className="w-full px-20 py-16 text-center bg-blue-800">
      <div className="max-w-5xl mx-auto px-8">
        <h1 className="text-4xl font-bold text-white mb-6">
          Shorten, Share, and Track Your Links
        </h1>
        <p className="text-gray-300 mb-8">
          Simplify your links and engage your audience with advanced analytics.
        </p>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Paste a long URL to shorten..."
              className="w-3/4 px-4 py-2 border rounded-l-md text-black"
            />
            <button
              onClick={handleUrlShortClick}
              className="w-1/4 bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
            >
              Shorten
            </button>
          </div>

          {shortenedUrl && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <p className="text-blue-800 font-semibold mb-2">Shortened URL:</p>
              <div className="flex items-center space-x-4">
                <span className="text-blue-700">{shortenedUrl}</span>
                <button
                  onClick={copyToClipboard}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
