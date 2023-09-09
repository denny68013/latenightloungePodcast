import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CardPicked = (props) => {
  const imageLoader = ({ src }) => {
    return `https://d3mww1g1pfq2pt.cloudfront.net/Image/${src}`;
  };

  const [isAnimateEnd, setIsAnimateEnd] = useState(false);

  const handleAnimationEnd = () => {
    setIsAnimateEnd(true);
  };
  let animateClass = !isAnimateEnd ? ` animate__fadeInUp` : null;

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={`col-sm-6 col-lg-3 mb-4 d-flex cardPickedContainer  animate__animated ${animateClass}`}
      style={{ "--speed": `${props.speed}ms` }}
    >
      <div className="card episodeCardPicked flex-grow-2 border-0 rounded-0 ">
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
        <div className="card-body textCard d-flex flex-column ">
          <p className="mb-0 mt-2 recommendText">{props.word}</p>
        </div>
      </div>
    </div>
  );
};

export default CardPicked;
