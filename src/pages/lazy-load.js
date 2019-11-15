import React, { useEffect } from "react";

import Layout from "../components/layout";

const images = [
  "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1484100356142-db6ab6244067?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499532744860-fb7526b66e7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
];

const Image = ({ src }) => (
  <div className="my-4" style={{ width: "800px" }}>
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88x8AAt0B7bEE+qwAAAAASUVORK5CYII="
      data-src={src}
      alt="A Beautiful Image from Unsplash"
      className="lazy w-full h-auto"
    />
  </div>
);

const ImageList = ({ images }) =>
  images.map((image, i) => <Image key={i} src={image} />);

const LazyLoad = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(lazyLoad, {
      // where in relation to the edge of the viewport, we are observing
      rootMargin: "100px",

      // how much of the element needs to have intersected
      // in order to fire our loading function
      threshold: 1.0
    });

    function lazyLoad(elements) {
      elements.forEach(element => {
        if (element.intersectionRatio > 0) {
          // set the src attribute to trigger a load
          element.target.src = element.target.dataset.src;

          // stop observing this element. Our work here is done!
          observer.unobserve(element.target);
        }
      });
    }

    // Tell our observer to observe all img elements with a "lazy" class
    const lazyImages = document.querySelectorAll("img.lazy");
    lazyImages.forEach(img => {
      observer.observe(img);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-center text-xl text-gray-dark font-semibold mb-4">
          Lazy Loading Images
        </h1>
        <div className="flex flex-wrap justify-center">
          <ImageList images={images} />
        </div>
      </div>
    </Layout>
  );
};

export default LazyLoad;
