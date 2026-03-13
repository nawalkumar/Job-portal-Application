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

  const plugin = React.useRef(
    Autoplay({
      delay: 2500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
      rootNode: (root) => root.parentElement,
    })
  );

  return (
    <div>
      <div>
        <h1 className="text-4xl mt-3 font-bold text-center text-emerald-700">
          Categories
        </h1>

        <p className="text-center text-2xl mt-3 text-emerald-600">
          Explore our extensive job market.
        </p>
      </div>

      <Carousel
        plugins={[plugin.current]}
        className="w-full my-10"
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
                className="w-full h-12 text-sm md:text-base font-medium border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                onClick={() => searchjobHandler(category)}
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="-left-4 md:-left-12 text-emerald-700 border-emerald-500 hover:bg-emerald-50" />
        <CarouselNext className="-right-4 md:-right-12 text-emerald-700 border-emerald-500 hover:bg-emerald-50" />
      </Carousel>
    </div>
  );
};

export default Categories;