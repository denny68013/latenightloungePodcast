import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Card = (props) => {
  const [isAnimateEnd, setIsAnimateEnd] = useState(false);

  const handleAnimationEnd = () => {
    console.log("OK");
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
              src={props.image}
              className="card-img-top episodeCardImage"
              alt="..."
              width={3000}
              height={3000}
              quality={100}
            />
          ) : null}
        </Link>
        {/* <div className="card-body textCard d-flex flex-column">
            <h5 className="card-text lh-base">{props.title}</h5>
            <p className="text-body-secondary mb-0 mt-auto">
              {props.pubDate && (
                <>
                  {props.pubDate.year}年{props.pubDate.month}月
                  {props.pubDate.day}日｜
                  {props.hours + " "}
                  小時
                  {" " + props.minutes + " "}
                  分鐘
                </>
              )}
            </p>
            <a
              href="./episodePage/episode_01.html"
              className="stretched-link"
            />
          </div> */}
      </div>
    </div>
  );
};

export default Card;

{
  /* <div className="col-xs-12 col-sm-6 mb-4 d-flex">
        <div className="card episodeCard flex-grow-1">
          <Image
            src="./img/二十趴沈.jpeg"
            className="card-img-top episodeCardImage"
            alt="..."
            fill
          />
          <div className="card-body textCard d-flex flex-column">
            <h5 className="card-text">二十趴沈｜蛙化現象</h5>
            <p className="text-body-secondary mb-0 mt-auto">
              2023年6月12日｜24分鐘
            </p>
            <a
              href="./episodePage/episode_02.html"
              className="stretched-link"
            />
          </div>
        </div>
      </div> */
}
