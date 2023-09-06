"use client";
import React from "react";
import "@styles/globals.css";
import HeadImg from "@components/HeadImg";

import CardPicked from "@components/CardPicked";
import { useState, useEffect, useRef } from "react";

const Home = () => {
  const recommendWord = [
    "意外發現寶藏的具體實現！",
    "你真的很喜歡說自己「老了」嗎？",
    "「身為導演就應該選自己喜歡的片」這句話我依舊印象深刻",
    "這個節目出發的起點",
  ];
  const targetDivRef = useRef();

  const [finLoading, setFinLoading] = useState(false);

  const [episode, setEpisode] = useState({});
  const [episodePicked, setEpisodePicked] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/episode");
        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }
        const data = await response.json();
        console.log(data["episodes"]);
        setEpisode(data["episodes"]);
        setEpisodePicked([
          data["episodes"].find((e) => e.link === "clj01j9ss05vx01vo3prt6fbt"),
          data["episodes"].find((e) => e.link === "cl87hg6z703qo01wmdlaucmqj"),
          data["episodes"].find((e) => e.link === "clgq2d0e500eb01tb9e8terft"),
          data["episodes"].find((e) => e.link === "cl74na45s000n01te14xn3syb"),
        ]);
        // setFinLoading(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const [containerVisible, setContainerVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // 视口可见度达到 10% 时触发回调
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("OK");
        setFinLoading(true);
        observer.unobserve(targetDivRef.current);
      }
    }, options);

    if (targetDivRef.current) {
      observer.observe(targetDivRef.current);
    }
  }, [episodePicked]);

  const handleSubmit = async () => {
    console.log(targetDivRef);
    console.log(episodePicked);
  };

  return (
    <div className="allContainer">
      <HeadImg />

      <div ref={targetDivRef} className=" text-center m-5">
        {finLoading ? (
          <div className="inner">
            {" "}
            <h2 className="mb-4 recommendTitle animate__animated animate__fadeInUp">
              我們的推薦
            </h2>
            <br />
            <div className="wrapper  d-flex row justify-content-center  animate__animated animate__fadeInUp ">
              {episodePicked.map((item, index) => (
                <CardPicked
                  key={index}
                  title={item.title}
                  image={item.image}
                  hours={item.hours}
                  minutes={item.minutes}
                  pubDate={item.pubDate}
                  num={index}
                  link={item.link}
                  className="episodeCardImage"
                  speed={5000}
                  word={recommendWord[index]}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* <button type="button" onClick={handleSubmit}>
        Click
      </button> */}
    </div>
  );
};

export default Home;
