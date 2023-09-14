import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faForward,
  faBackward,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const CardPicked = (props) => {
  const [audioProgress, setAudioProgress] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState("99:99:99");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00:00:00");
  const [isPlaying, setIsPlaying] = useState(false);
  const currentAudio = useRef();
  // const [pubDate, setPubDate] = useState({ year: 2023, month: 9, day: 0 });

  // useEffect(() => {
  //   setPubDate(props.pubDate);
  //   console.log(props.pubDate);
  // }, []);
  const imageLoader = ({ src }) => {
    return `https://d3mww1g1pfq2pt.cloudfront.net/Image/${src}`;
  };

  const [isAnimateEnd, setIsAnimateEnd] = useState(false);

  const handleAnimationEnd = () => {
    setIsAnimateEnd(true);
  };
  let animateClass = !isAnimateEnd ? ` animate__fadeInUp` : ``;

  const handlePlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsPlaying(false);
    }
  };
  const handleMusicProgressor = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };

  const handleAudioUpdate = () => {
    // 計算音樂總長度
    let hours = Math.floor(currentAudio.current.duration / 60 / 60);
    let minutes = Math.floor((currentAudio.current.duration / 60) % 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let thisMusicTotalLength = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;

    setMusicTotalLength(thisMusicTotalLength);

    // 計算當前長度
    let curentHours = Math.floor(currentAudio.current.currentTime / 60 / 60);
    let currentMinutes = Math.floor(
      (currentAudio.current.currentTime / 60) % 60
    );
    let currentSeconds = Math.floor(currentAudio.current.currentTime % 60);
    let thisMusicCurrentTime = `${
      curentHours < 10 ? `0${curentHours}` : curentHours
    }:${currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes}:${
      currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds
    }`;

    setMusicCurrentTime(thisMusicCurrentTime);

    const progress = parseInt(
      (currentAudio.current.currentTime / currentAudio.current.duration) * 100
    );
    setAudioProgress(isNaN(progress) ? 0 : progress);
  };
  const handleBackward = () => {
    currentAudio.current.currentTime -= 5;
  };

  const handleForward = () => {
    currentAudio.current.currentTime += 5;
  };
  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={`mb-4 d-flex  animate__animated ${animateClass} text-center container-fluid flex-column flex-md-row `}
      style={{ "--speed": `${props.speed}ms` }}
    >
      <div className="card episodeCardPicked flex-grow-2 border-0 rounded-0 w-50 align-self-md-center mb-5 mb-md-0">
        {props.finLoading ? (
          <div>
            <Link href={`/episode/${props.link}`}>
              {props.image ? (
                <Image
                  loader={imageLoader}
                  src={props.image.split("/Image/")[1]}
                  className="episodeCardImage animate__animated "
                  alt="..."
                  width={282}
                  height={282}
                  quality={100}
                />
              ) : null}
            </Link>
          </div>
        ) : null}

        {/* <div className="card-body textCard d-flex flex-column "></div> */}
      </div>

      <audio
        src={props.audioLink}
        ref={currentAudio}
        onTimeUpdate={handleAudioUpdate}
      ></audio>
      {props.pubDate ? (
        <div className="row w-100 ms-0 ms-sm-3">
          <p className="cardPlayerTitle text-start mb-0">{props.title}</p>

          <p className="cardPlayerPubDateAndDuration text-start mb-sm-3">{`${props.pubDate.year}年${props.pubDate.month}月${props.pubDate.day}日｜${props.hours}小時${props.minutes}分鐘`}</p>

          <div className=" col-4 col-md-3 text-center justify-content-around d-flex align-self-center mt-auto">
            <FontAwesomeIcon
              icon={faBackward}
              size="xl"
              style={{ color: "#eaff00" }}
              className="playButton"
              onClick={handleBackward}
            />
            <FontAwesomeIcon
              icon={!isPlaying ? faPlay : faPause}
              size="xl"
              style={{ color: "#eaff00" }}
              className="playButton"
              onClick={handlePlay}
            />
            <FontAwesomeIcon
              icon={faForward}
              size="xl"
              style={{ color: "#eaff00" }}
              className="playButton"
              onClick={handleForward}
            />
          </div>
          <div className=" col-8 col-md-9 mt-auto">
            <div className="d-flex justify-content-between">
              <p className="cardPlayerTime text-start d-inline-block">
                {musicCurrentTime}
              </p>

              <p className="cardPlayerTime text-start  d-inline-block">
                {props.finLoading
                  ? `${props.hours < 10 ? `0${props.hours}` : props.hours}:${
                      props.minutes < 10 ? `0${props.minutes}` : props.minutes
                    }:${
                      props.seconds < 10 ? `0${props.seconds}` : props.seconds
                    }`
                  : "99:99:99"}
              </p>
            </div>

            <input
              type="range"
              className="playerController w-100"
              value={audioProgress}
              onChange={handleMusicProgressor}
            />
          </div>

          {/* <div className="d-block d-sm-none col-4 col-md-3 text-center justify-content-around d-flex align-self-center mt-auto">
            <div className="d-flex justify-content-between">
              <p className="cardPlayerTime text-start d-inline-block">
                {musicCurrentTime}
              </p>
              <FontAwesomeIcon
                icon={faBackward}
                size="xl"
                style={{ color: "#eaff00" }}
                className="playButton"
                onClick={handleBackward}
              />
              <FontAwesomeIcon
                icon={!isPlaying ? faPlay : faPause}
                size="xl"
                style={{ color: "#eaff00" }}
                className="playButton"
                onClick={handlePlay}
              />
              <FontAwesomeIcon
                icon={faForward}
                size="xl"
                style={{ color: "#eaff00" }}
                className="playButton"
                onClick={handleForward}
              />
            </div>
            <p className="cardPlayerTime text-start  d-inline-block">
              {props.finLoading
                ? `${props.hours < 10 ? `0${props.hours}` : props.hours}:${
                    props.minutes < 10 ? `0${props.minutes}` : props.minutes
                  }:${props.seconds < 10 ? `0${props.seconds}` : props.seconds}`
                : "99:99:99"}
            </p>
          </div>

          <div className="d-block d-sm-none col-8 col-md-9 mt-auto">
            <input
              type="range"
              className="playerController w-100"
              value={audioProgress}
              onChange={handleMusicProgressor}
            />
          </div> */}
        </div>
      ) : null}
    </div>
  );
};

export default CardPicked;
