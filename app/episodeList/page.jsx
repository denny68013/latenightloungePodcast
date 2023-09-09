"use client";
import React from "react";
import "../../node_modules/animate.css/animate.css";
import "@styles/globals.css";
import HeadCard from "@components/HeadCard";
import Card from "@components/Card";
import { useState, useEffect } from "react";

const EpisodeList = () => {
  const [finLoading, setFinLoading] = useState(false);
  const [episode, setEpisode] = useState([]);
  const [episodeLoaded, setEpisodeLoaded] = useState([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [hasSearchResult, setHasSearchResult] = useState(true);
  const [episodeLoadedFin, setEpisodeLoadedFin] = useState(false);
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
        setEpisodeLoaded(data["episodes"].slice(0, 12));
        setFinLoading(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  const handleChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      // setHasSearchResult(false);
      setFilteredEpisodes(episodeLoaded);
      setFinLoading(true);
    } else {
      const newFilteredEpisodes = episode.filter((episode) => {
        const titleMatch = episode.title.includes(e.target.value);
        const descriptionMatch = episode.content.includes(e.target.value);
        return titleMatch || descriptionMatch;
      });
      console.log(newFilteredEpisodes);
      setFilteredEpisodes(newFilteredEpisodes);
      if (newFilteredEpisodes.length === 0) {
        console.log("0");
        setHasSearchResult(false);
        setFinLoading(true);
      } else {
        console.log("NOT 0");
        setHasSearchResult(true);
        setFinLoading(false);
      }
    }
  };
  const handleLoadingMore = () => {
    const i = episodeLoaded.length;
    if (i !== episode.length) {
      setEpisodeLoaded(episode.slice(0, i + 9));
    } else {
      setEpisodeLoadedFin(true);
    }
  };

  return (
    <div>
      <HeadCard />
      <br />
      <h2 className="mt-3 mb-5 recommendTitle animate__animated animate__fadeInUp text-center">
        所有集數
      </h2>
      <div className="animate__animated animate__fadeInUp ">
        <div className="row groupForm mb-5 text-center">
          <div className="col-12 ">
            <input
              className="border-0 border-bottom episodeSearchInput d-inline-block text-center"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="container-fluid text-start episodeContainer mt-4 ">
        {finLoading ? (
          <div className="row mt-3  gx-5 ">
            {hasSearchResult ? null : (
              <div>
                <h2 className="mt-3 mb-5 recommendTitle animate__animated animate__fadeInUp text-center">
                  抱歉，沒找到您要的結果！以下是所有集數
                </h2>
                <hr className="text-white" />
              </div>
            )}
            {episodeLoaded.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                image={item.image}
                hours={item.hours}
                minutes={item.minutes}
                pubDate={item.pubDate}
                num={index}
                link={item.link}
              />
            ))}
            <div className="text-center ">
              <div
                className="badge rounded-0 fs-5 fs-md-3 loadingBadge p-3 px-4  w-25"
                onClick={handleLoadingMore}
              >
                {!episodeLoadedFin ? "載入更多" : "已經是第一集了！"}
              </div>
            </div>
          </div>
        ) : (
          <div className="row mt-3  gx-5 ">
            {filteredEpisodes.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                image={item.image}
                hours={item.hours}
                minutes={item.minutes}
                pubDate={item.pubDate}
                num={index}
                link={item.link}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodeList;
