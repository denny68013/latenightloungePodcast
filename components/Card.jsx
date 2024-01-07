import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Card = (props) => {
  const imageLoader = ({ src }) => {
    return `https://image.firstory-cdn.me/Image/${src}`;
  };
  const [isAnimateEnd, setIsAnimateEnd] = useState(false);

  const handleAnimationEnd = () => {
    setIsAnimateEnd(true);
  };
  let animateClass = !isAnimateEnd
    ? ` animate__fadeInUp animate__delay-${props.num}s`
    : null;

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={`col-sm-6 col-md-4 mb-4 d-flex cardContainer animate__animated ${animateClass}`}
    >
      <div className="card episodeCard flex-grow-2 border-0 rounded-0 mb-5">
        <Link href={`/episode/${props.link}`}>
          {props.image ? (
            <Image
              loader={imageLoader}
              src={props.image.split("/Image/")[1]}
              className="card-img-top episodeCardImage"
              alt="..."
              width={3000}
              height={3000}
              quality={100}
            />
          ) : null}
        </Link>
      </div>
    </div>
  );
};

export default Card;
