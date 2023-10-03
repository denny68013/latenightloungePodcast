"use client";
import React, { useEffect, useState } from "react";
// import SecondImg from "@components/SecondImg";
import "../../../node_modules/animate.css/animate.css";
import "@styles/globals.css";
import parse from "html-react-parser";
// import video from "../../../public/asset/videos/backgroundVideo.mp4";

const Episode = (req) => {
  let episodeId = req.params.episodeId;
  const [finLoading, setFinLoading] = useState(false);
  const [episode, setEpisode] = useState({});
  const [contentDescription, setContentDesciption] = useState("");
  const [contentTimeline, setContentTimeline] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/episode");
        if (!response.ok) {
          throw new Error("Request failed with status " + response.status);
        }
        const data = await response.json();
        console.log(data["episodes"].find((e) => e.link === episodeId));
        setEpisode(data["episodes"].find((e) => e.link === episodeId));
        const htmlString = data["episodes"].find(
          (e) => e.link === episodeId
        ).content;
        const separator = "─ <br />【本集時間軸】 <br />";
        const parts = htmlString.split(separator);

        if (parts.length >= 2) {
          setContentDesciption(parts[0]);
          let timeline = parts[1];
          if (timeline.startsWith("<br/>")) {
            timeline = timeline.substring(5); // Remove the first <br/>
          }
          setContentTimeline(timeline);
        } else {
          setContentDesciption(htmlString);
        }
        console.log(contentTimeline);
        setFinLoading(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const secondImgStyle = {
    width: "100%",
    height: "300px",
    // background: episode.image
    //   ? `linear-gradient(90deg, #0e1115 0%, rgba(0, 0, 0, 0) 100%),linear-gradient(180deg,#0e1115 0%,rgba(8, 10, 12, 0.13) 20.31%,rgba(0, 0, 0, 0) 50%,rgba(7, 9, 11, 0.08) 82.29%,#0e1115 100%),url(${episode.image}),lightgray 50% / cover no-repeat`
    //   : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: "-1",
  };

  function replaceConsecutiveBrTags(htmlString) {
    // 使用正則表達式替換連續兩個 <br/> 為單個 <br/>
    return htmlString.replace(/(<br\s*\/?>\s*)+/g, "<br/>");
  }

  return (
    <div>
      <video className="videoTag" autoPlay loop muted>
        <source src="/asset/videos/backgroundVideo.mp4" type="video/mp4" />
      </video>
      {finLoading ? (
        <div className="animate__animated animate__fadeIn">
          <div className=" position-fixed" style={secondImgStyle}></div>
          <br />
          <div className=" container-fluid episodeContainer episodeSection text-start mt-5">
            <p className="thisEpisodeTitle text-center">{episode.title}</p>
            <p className="text-center thisEpisodeDateAndDuration">
              {episode.pubDate && (
                <>
                  {episode.pubDate.year}年{episode.pubDate.month}月
                  {episode.pubDate.day}日｜
                  {episode.hours ? `${episode.hours} 小時` : null}
                  {" " + episode.minutes + " 分鐘"}
                </>
              )}
            </p>
            <iframe
              src={`https://open.firstory.me/embed/story/${episodeId}`}
              height="180"
              width="100%"
              frameBorder="0"
              scrolling="no"
              className="mt-5 animate__animated animate__fadeIn"
            ></iframe>
          </div>
          <div className="container-fluid text-start episodeContainer mt-4 text-white ps-2 ps-md-5">
            <h3>【本集節目內容】</h3>
            <hr />
            <div className="episodeInfoText text-break">
              {" "}
              {parse(replaceConsecutiveBrTags(`${contentDescription}`))}{" "}
            </div>
            <br />
            {contentTimeline ? (
              <div>
                <h4>【本集時間軸】</h4>
                <hr />
                <div className="episodeTimelineText">
                  {" "}
                  {parse(replaceConsecutiveBrTags(`${contentTimeline}`))}{" "}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="container-fluid text-center episodeContainer mt-4 text-white ps-5 ">
          <h3>讀取中，請稍候</h3>
        </div>
      )}
    </div>
  );
};

export default Episode;
