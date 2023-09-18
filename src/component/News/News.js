import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocal } from '../../helpers/auth';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from '../../utils/config';
import { Button } from '@material-tailwind/react';


const News = () => {
  const [news, setNews] = useState([]);

  const navigate=useNavigate()
 
  useEffect(() => {
    const localResponse = getLocal('authToken');
    if (localResponse) {
      const decoded = jwtDecode(localResponse);
      console.log('Decoded from setup complete ::: ', decoded);
      if (decoded.is_admin==true) {
        navigate('/adm')
      }
    }
  }, []);


  // useEffect(() => {
  //   const loadNews = async () => {
  //     try {
  //       const response = await axios.get("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=19d5548ec7ab4ba79877be8d65d688e3");
  //       setNews(response.data.articles);
  //     } catch (error) {
  //       console.error("Requests from the browser are not allowed on the Developer plan, except from localhost:", error);
  //       toast.error("Error loading news:", error);
        
  //     }
  //   }
  //   loadNews();
  // }, []);

  const handleFetchInitialNews = () => {
   
    axios.post(`${BASE_URL}/message/fetch-initial-news/`)
        .then(response => {
            console.log(response.data.message);
        
            
        })
        .catch(error => {
            console.error('Error fetching and storing initial news data:', error);
            toast.error(' fetching and storing initial news data')
        });
};

// useEffect(()=>{
//   handleFetchInitialNews()
// },[])


useEffect(() => {

    axios.get(`${BASE_URL}/message/cached-news/`)
        .then(response => {
            setNews(response.data);
        })
        .catch(error => {
            console.error('Error fetching cached news data:', error);
            toast.error('Error fetching cached news data:')
        });
}, []);




  return (
    <div className="bg-gray-100">
      <ToastContainer/>
      <header className="bg-blue-500 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold">News Portal</h1>
        </div>
      </header>

      <main className="container mx-auto py-8">
        <section className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-4">Latest News</h2>
          {news.length === 0 ? (
                    <>
                    <p>No news data available. Please check back later.</p>
                    <Button onClick={handleFetchInitialNews} class="">Fetch Initial News Data</Button>
                    </>
                ) : (
          <ul className="divide-y divide-gray-300">
            
            {news && news.map((article, index) => (
              <li key={index} className="py-4">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-gray-700">{article.description}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {/* {new Date(article.publishedAt).toLocaleDateString()} -  */}
                  {article.author}
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
                )}
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
