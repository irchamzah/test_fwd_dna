import React, { useEffect, useState } from "react";

interface ReadArticle {
  title: string;
  url: string;
  urlToImage: string;
}

const ReadArticles = () => {
  const [readArticles, setReadArticles] = useState<ReadArticle[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  // Fungsi untuk memuat artikel dari localStorage
  const fetchReadArticles = () => {
    const storedArticles = JSON.parse(
      localStorage.getItem("readArticles") || "[]"
    );
    const sortedArticles = storedArticles.reverse();
    setReadArticles(sortedArticles);
  };

  // Efek untuk memuat artikel saat komponen dimuat
  useEffect(() => {
    fetchReadArticles();

    const handleStorageChange = () => {
      fetchReadArticles();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Fungsi untuk menambah jumlah artikel yang ditampilkan
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  // Fungsi untuk menghapus seluruh riwayat
  const handleClearAll = () => {
    localStorage.removeItem("readArticles");
    setReadArticles([]); // Mengosongkan state
    setVisibleCount(5); // Mengatur ulang jumlah artikel yang ditampilkan
  };

  // Fungsi untuk menghapus artikel tertentu
  const handleRemoveArticle = (url: string) => {
    const storedArticles = JSON.parse(
      localStorage.getItem("readArticles") || "[]"
    );
    const updatedArticles = storedArticles.filter(
      (article: ReadArticle) => article.url !== url
    );
    localStorage.setItem("readArticles", JSON.stringify(updatedArticles));
    setReadArticles(updatedArticles);
  };

  return (
    <div className="mt-20">
      <h2 className="font-bold text-2xl mb-4">Histori Berita</h2>
      {readArticles.slice(0, visibleCount).map((article) => (
        <div key={article.url} className="flex items-center mb-4">
          <img
            className="w-16 h-16 object-cover rounded-lg mr-4"
            src={article.urlToImage}
            alt={article.title}
            width={64}
            height={64}
          />
          <div className="flex-1">
            <h3 className="font-bold">{article.title}</h3>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline text-sm"
            >
              Baca Selengkapnya
            </a>
          </div>
          <button
            onClick={() => handleRemoveArticle(article.url)}
            className="ml-4 text-red-500 hover:underline text-sm"
          >
            Hapus
          </button>
        </div>
      ))}
      {visibleCount < readArticles.length && (
        <>
          <button
            onClick={handleLoadMore}
            className=" text-blue-500 hover:underline"
          >
            Load More...
          </button>
          <br />
        </>
      )}

      {/* Tombol untuk menghapus seluruh riwayat */}
      <button
        onClick={handleClearAll}
        className="mt-5 bg-red-500 text-white py-2 px-4 rounded hover:opacity-90 active:bg-red-700"
      >
        Hapus Seluruh Histori
      </button>
    </div>
  );
};

export default ReadArticles;
