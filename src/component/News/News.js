import axios from 'axios';
import React, { useEffect, useState } from 'react';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await axios.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=19d5548ec7ab4ba79877be8d65d688e3");
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error loading news:", error);
      }
    }
    loadNews();
  }, []);

  return (
    <div className="bg-gray-100">
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold">News Portal</h1>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <section className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-4">Latest News</h2>
          <ul className="divide-y divide-gray-300">
            {news && news.map((article, index) => (
              <li key={index} className="py-4">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-gray-700">{article.description}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(article.publishedAt).toLocaleDateString()} - {article.author}
                </p>
                {article.urlToImage && (
                  <div className="mt-4 mx-auto flex items-center justify-center">
                    <img src={article.urlToImage} alt={article.title} className="w-96 h-96 object-contain" />
                  </div>
                )}
                <a href={article.url} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Read More</a>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="bg-gray-200 text-gray-600 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} News Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default News;
