import { useState } from "react";

const LazyImage = ({ src, alt, className = "" }) => {

  const [loaded, setLoaded] = useState(false);

  const tinySrc = src.replace("w342", "w92");

  return (
    <div className="absolute inset-0">

      {/* 🔴 BLURRED LOW QUALITY IMAGE */}
      <img
        src={tinySrc}
        alt="blur"
        className={`
          absolute inset-0 w-full h-full object-cover
          blur-md scale-110
          transition-opacity duration-700
          ${loaded ? "opacity-0" : "opacity-100"}
        `}
      />

      {/* 🟢 HD IMAGE */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-700 ease-in-out
          ${loaded ? "opacity-100" : "opacity-0"}
          ${className}
        `}
      />

    </div>
  );
};

export default LazyImage;