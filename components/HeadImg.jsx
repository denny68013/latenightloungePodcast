import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeadImg = () => {
  const coverStyle = {
    width: "100%",
    height: "500px",
    background:
      'linear-gradient(180deg,#0e1115 0%,rgba(0, 0, 0, 0) 50%,#0e1115 100%),url("/asset/images/世界盡頭深夜酒館_封面擴增.jpg"),lightgray -47.578px -397.038px / 107.347% 223.06% no-repeat',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const secondImgStyle = {
    width: "100%",
    height: "500px",
    background:
      'linear-gradient(90deg, #0e1115 0%, rgba(0, 0, 0, 0) 100%),linear-gradient(180deg,#0e1115 0%,rgba(8, 10, 12, 0.13) 20.31%,rgba(0, 0, 0, 0) 50%,rgba(7, 9, 11, 0.08) 82.29%,#0e1115 100%),url("/asset/images/世界盡頭深夜酒館_城市圖.png"),lightgray 50% / cover no-repeat',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div>
      <div className="container-fluid text-center animate__animated animate__fadeIn">
        <div className="img-fluid" alt="Podcast Cover" style={coverStyle} />
      </div>

      <div className="container-fluid">
        <div className="text-center">
          <Image
            src="/asset/images/節目LOGO.png"
            className="img-fluid animate__animated animate__fadeInUp"
            alt="Podcast Logo Text"
            width={300}
            height={0}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>
      <div className="container-fluid text-center mt-4 titleContainer">
        <div className="row">
          <div className="col">
            <h1 className="text-center mb-4 title animate__animated animate__fadeInUp animate__delay-1s">
              &nbsp;&nbsp;這些東西太好了，不能只有我知道。
            </h1>
            <h3 className="text-center mb-4 titleSecond animate__animated animate__fadeInUp animate__delay-1s">
              &nbsp;&nbsp;想把那些我們覺得很棒的，分享給你。
            </h3>
          </div>
        </div>
      </div>
      <div className="container-fluid text-center mt-4 ">
        <Link
          className="listenButton"
          id="followHostBadge"
          href="https://open.firstory.me/user/latenightlounge_podcast/platforms"
        >
          <h2 className="badge rounded-0 fs-5 fs-md-3 listenBadge p-3 px-4 animate__animated animate__fadeInUp animate__delay-1s">
            點我聽Podcast！
          </h2>
        </Link>
      </div>
      <br></br>
      <div
        className=" position-relative animate__animated animate__fadeInUp animate__delay-1s"
        style={secondImgStyle}
      >
        <div className="secondSection position-absolute text-end animate__animated animate__fadeInUp animate__delay-1s">
          <h3>「坦誠分享，永遠都很有趣。」</h3>
          <h5>— 《男孩、鼴鼠、狐狸與馬》</h5>
          <div className="position-absolute ">
            <p className="mt-3 text-start ">
              我們試著每個禮拜輪流出題給對方，嘗試新的想法、新的東西，發現日常中，那些不一樣的生活體驗。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadImg;
