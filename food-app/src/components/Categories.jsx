import React, { useState } from "react";

function Categories() {
  const [categories] = useState([
    { name: "المشويات", image: "images/steak-with-flame-it_950347-4081.avif" },
    { name: "الجريل", image: "images/Pastitsio-_4-SQ.webp" },
    { name: "المكرونات", image: "images/images.jpg" },
    {
      name: "سلطات ومقبلات",
      image: "images/a39okhfk_620_625x300_21_January_20.webp",
    },
    { name: "محاشي وممبار", image: "images/20211128145812863.jpg" },
    {
      name: "الطواجن",
      image: "images/181204_Olive-Magazine_Berenjak_201-9c70cd3.jpg",
    },
    { name: "سندوتشات", image: "images/images.jpg" },
    { name: "المكرونات", image: "images/images.jpg" },
  ]);

  return (
    <div className="w-[87%] mx-auto">
      <h1 className="text-3xl font-bold m-5 text-center">الاصناف</h1>
      <div className="grid grid-cols-1 cursor-pointer sm:grid-cols-2 md:grid-cols-4 gap-8  ">
        {categories.map((category) => (
          <div
            key={category.name}
            className="mb-5 bg-white w-full  hover:shadow-lg transition duration-300 ease-in-out  flex flex-col items-center justify-between"
          >
            <div className="overflow-hidden w-[100%] h-[200px]">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover "
              />
            </div>
            {/* <h3 className="text-lg font-bold mt-2">{category.name}</h3> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
