import React from "react";

const TrendingCoin = ({ data }) => {
  return (
    <div className="w-[40%] bg-gray-200 mb-12 last:mb-0 rounded-lg p-4 relative cursor-pointer hover:bg-gray-100 hover:bg-opacity-40">
      {data.item.name}
    </div>
  );
};

export default TrendingCoin;