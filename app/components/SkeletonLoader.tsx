const SkeletonLoader = () => {
  return (
    <>
      <div className="hidden xl:grid grid-cols-5 gap-4">
        <div className="h-80 bg-gray-300 rounded col-span-2"></div>
        <div className="h-80  rounded col-span-3 grid grid-cols-2 gap-4">
          <div className=" bg-gray-300 rounded col-span-1"></div>
          <div className=" bg-gray-300 rounded col-span-1"></div>
          <div className=" bg-gray-300 rounded col-span-1"></div>
          <div className=" bg-gray-300 rounded col-span-1"></div>
        </div>
        <div className="h-80  rounded col-span-3 grid grid-cols-2 gap-4">
          <div className=" bg-gray-300 rounded col-span-1"></div>
          <div className=" bg-gray-300 rounded col-span-1"></div>
          <div className=" bg-gray-300 rounded col-span-1"></div>
          <div className=" bg-gray-300 rounded col-span-1"></div>
        </div>
        <div className="h-80 bg-gray-300 rounded col-span-2"></div>
      </div>

      <div>
        <div className="xl:hidden rounded grid sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-col">
          <div className="bg-gray-300 rounded col-span-1 h-44"></div>
          <div className="bg-gray-300 rounded col-span-1 h-44"></div>
          <div className="bg-gray-300 rounded col-span-1 h-44"></div>
          <div className="bg-gray-300 rounded col-span-1 h-44"></div>
          <div className="bg-gray-300 rounded col-span-1 h-44"></div>
          <div className="bg-gray-300 rounded col-span-1 h-44"></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonLoader;
