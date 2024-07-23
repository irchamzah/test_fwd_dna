import Image from "next/image";

interface NewsCardProps {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  author: string;
  publishedAt: string;
  textTop?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  url,
  urlToImage,
  author,
  publishedAt,
  textTop = false,
}) => {
  const handleRead = () => {
    const storedArticles = localStorage.getItem("readArticles");
    let readArticles = storedArticles ? JSON.parse(storedArticles) : [];
    readArticles = [...readArticles, { title, url, urlToImage }];
    localStorage.setItem("readArticles", JSON.stringify(readArticles));
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full relative">
      {/* Container for the image */}
      <div className="relative  h-full">
        <img src={urlToImage} alt={title} className="h-full object-cover" />
        {/* Overlay for text background */}
        <div
          className={`absolute inset-0 ${
            textTop
              ? "bg-gradient-to-b from-black via-transparent to-transparent"
              : "bg-gradient-to-t from-black via-transparent to-transparent"
          }`}
        ></div>
      </div>

      {/* Text content */}
      <div
        className={`absolute inset-0 p-4 flex flex-col ${
          textTop ? "justify-start" : "justify-end"
        } z-10`}
      >
        <div>
          <h2 className={`font-bold text-lg mb-2 text-white truncate`}>
            {title}
          </h2>
          <p
            className={`text-gray-200 mb-2 text-sm ${
              textTop ? "" : "truncate"
            }`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <p className={`text-gray-300 text-xs  mt-auto`}>
            Oleh {author} pada{" "}
            {new Date(publishedAt).toLocaleString("id-ID", {
              weekday: "short",
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <div className="mt-2"></div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline text-sm"
            onClick={handleRead}
          >
            Baca Selengkapnya
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
