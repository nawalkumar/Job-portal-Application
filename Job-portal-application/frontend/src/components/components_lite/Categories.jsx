import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import Autoplay from "embla-carousel-autoplay";

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Machine Learning Engineer",
  "Artificial Intelligence Engineer",
  "Cybersecurity Engineer",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Engineer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Autoplay plugin — continuous left-to-right movement
  const plugin = React.useRef(
    Autoplay({
      delay: 2500,                  // slide change every 2.5 seconds
      stopOnInteraction: false,     // keep moving even after click/hover
      stopOnMouseEnter: true,       // pause only while hovering
      stopOnFocusIn: true,
      rootNode: (root) => root.parentElement, // better mobile behavior
    })
  );

  return (
    <div>
      <div>
        <h1 className="text-4xl mt-3 font-bold text-center text-blue-600">
          Categories
        </h1>
        <p className="text-center text-2xl mt-3 text-gray-600">
          Explore our extensive job market.
        </p>
      </div>

      {/* Updated Carousel — full width + auto-scroll left to right */}
      <Carousel
        plugins={[plugin.current]}
        className="w-full my-10"                    // ← full width
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {Category.map((category, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <Button
                variant="outline"
                className="w-full h-12 text-sm md:text-base font-medium border-2 text-purple-600 hover:bg-purple-50 hover:text-purple-900 transition-colors"
                onClick={() => searchjobHandler(category)}
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Keep arrows — user can still control manually */}
        <CarouselPrevious className="-left-4 md:-left-12" />
        <CarouselNext className="-right-4 md:-right-12" />
      </Carousel>
    </div>
  );
};


export default Categories;