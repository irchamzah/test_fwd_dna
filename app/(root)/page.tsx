"use client";
import { useState, useEffect } from "react";
import SkeletonLoader from "../components/SkeletonLoader";
import NewsCard from "../components/NewsCard";
import ReadArticles from "../components/ReadArticles";
import { IoSearch } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
}

const Home = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState("Star");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  // API fetch berita
  const fetchArticles = (page: number) => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    fetch(
      `https://newsapi.org/v2/everything?q=${searchTerm}&page=${page}&pageSize=${articlesPerPage}&apiKey=e8ede967b94f42fda6dfdf572ba2a551`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.articles) {
          setArticles(data.articles);
        } else {
          setError("Failed to fetch articles");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch articles");
        setLoading(false);
      });
  };

  // Agar berita langsung dirender 1 kali
  useEffect(() => {
    fetchArticles(currentPage);
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchArticles(newPage);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchArticles(currentPage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex w-full justify-center mt-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border py-2 px-6 rounded-full mb-4 mr-3"
          placeholder="Cari Berita..."
        />
        <button
          onClick={() => fetchArticles(currentPage)}
          className="bg-blue-500 text-white h-10 w-10 flex items-center justify-center  rounded-full mb-4 hover:opacity-90 active:bg-blue-700"
        >
          <IoSearch className="w-5 h-5" />
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-4">Berita Terbaru</h1>

      {loading ? (
        <SkeletonLoader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <div className="hidden xl:grid grid-cols-5 gap-4">
            <div className="rounded col-span-2 overflow-hidden h-full shadow-md">
              {articles[0] && (
                <NewsCard
                  key={0}
                  title={articles[0].title}
                  description={articles[0].description}
                  url={articles[0].url}
                  urlToImage={articles[0].urlToImage}
                  author={articles[0].author}
                  publishedAt={articles[0].publishedAt}
                />
              )}
            </div>

            <div className="rounded col-span-3 grid grid-cols-2 gap-4">
              {articles.slice(1, 5).map((article, index) => (
                <div key={index} className="rounded col-span-1">
                  <NewsCard
                    title={article.title}
                    description={article.description}
                    url={article.url}
                    urlToImage={article.urlToImage}
                    author={article.author}
                    publishedAt={article.publishedAt}
                  />
                </div>
              ))}
            </div>

            <div className="rounded col-span-3 grid grid-cols-2 gap-4">
              {articles.slice(5, 9).map((article, index) => (
                <div key={index} className="rounded col-span-1">
                  <NewsCard
                    title={article.title}
                    description={article.description}
                    url={article.url}
                    urlToImage={article.urlToImage}
                    author={article.author}
                    publishedAt={article.publishedAt}
                  />
                </div>
              ))}
            </div>

            <div className="rounded col-span-2">
              {articles[9] && (
                <NewsCard
                  key={9}
                  title={articles[9].title}
                  description={articles[9].description}
                  url={articles[9].url}
                  urlToImage={articles[9].urlToImage}
                  author={articles[9].author}
                  publishedAt={articles[9].publishedAt}
                  textTop={true}
                />
              )}
            </div>
          </div>

          <div>
            <div className="xl:hidden rounded grid sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-col">
              {articles.map((article, index) => (
                <div key={index} className="">
                  <NewsCard
                    title={article.title}
                    description={article.description}
                    url={article.url}
                    urlToImage={article.urlToImage}
                    author={article.author}
                    publishedAt={article.publishedAt}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigasi halaman */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white h-10 w-10 flex items-center justify-center rounded-full hover:opacity-90 active:bg-blue-700"
            >
              <FaChevronLeft className="h-4 w-4" />
            </button>
            <span className="self-center mx-4">Page {currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="bg-blue-500 text-white h-10 w-10 flex items-center justify-center rounded-full hover:opacity-90 active:bg-blue-700"
            >
              <FaChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <ReadArticles />
    </div>
  );
};

export default Home;
