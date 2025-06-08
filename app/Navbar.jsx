"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const svgStyle = { mixBlendMode: "normal" };
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(
        "https://open.firstory.me/rss/user/cl73fj8k80b7201z65r8bh7w7"
      );
      alert("RSS連結複製成功！");
    } catch (error) {
      console.error("複製失敗：", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-md sticky-top p-0">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <div className="navBarLogo">
            {/* <Image
              src="/asset/images/latenightloungepodcast_logo_with_text.png"
              id="navBarLogo"
              width={30}
              height={30}
              alt="Podcast Logo"
              style={{ width: "auto", height: "auto" }}
            /> */}
          </div>
        </Link>
        <Link
          href="https://open.firstory.me/user/latenightloungepodcast/platforms"
          className="nav-link active pt-0 pb-sm-0"
          id="navBarListenBadge"
        >
          點我聽Podcast！
        </Link>
        <button
          className="navbar-toggler border-0 "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon navbar-inverse" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-md-center">
            <li className="nav-item">
              <div className="btn navBarBtn">
                <Link
                  className="nav-link active pt-0 pb-sm-0"
                  aria-current="page"
                  href="/"
                >
                  首頁
                </Link>
              </div>
            </li>
            {/* <li className="nav-item">
              <div className="btn navBarBtn">
                <Link
                  className="nav-link active pt-0 pb-sm-0"
                  aria-current="page"
                  href="/about"
                >
                  關於
                </Link>
              </div>
            </li> */}
            <li className="nav-item">
              <div className="btn navBarBtn">
                <Link
                  className="nav-link active pt-0 pb-sm-0"
                  aria-current="page"
                  href="/episodeList"
                >
                  集數
                </Link>
              </div>
            </li>

            <li className="nav-item">
              <div className="btn navBarBtn">
                <Link
                  id="rssFeed"
                  className="nav-link active pt-0 pb-sm-0"
                  aria-current="page"
                  href="https://open.firstory.me/rss/user/cl73fj8k80b7201z65r8bh7w7"
                  onClick={handleCopy}
                >
                  RSS連結
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <div className="btn navBarBtn">
                <Link
                  id="rssFeed"
                  className="nav-link active pt-0 pb-sm-0"
                  aria-current="page"
                  href="https://www.instagram.com/latenightlounge_podcast/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0,0,256,256"
                  >
                    <g
                      fill="#f0ff48"
                      fillRule="nonzero"
                      stroke="none"
                      strokeWidth="1"
                      strokeLinecap="butt"
                      strokeLinejoin="miter"
                      strokeMiterlimit="10"
                      strokeDasharray=""
                      strokeDashoffset="0"
                      fontFamily="none"
                      fontWeight="none"
                      fontSize="none"
                      textAnchor="none"
                      style={svgStyle}
                    >
                      <g transform="scale(5.12,5.12)">
                        <path d="M16,3c-7.16752,0 -13,5.83248 -13,13v18c0,7.16752 5.83248,13 13,13h18c7.16752,0 13,-5.83248 13,-13v-18c0,-7.16752 -5.83248,-13 -13,-13zM16,5h18c6.08648,0 11,4.91352 11,11v18c0,6.08648 -4.91352,11 -11,11h-18c-6.08648,0 -11,-4.91352 -11,-11v-18c0,-6.08648 4.91352,-11 11,-11zM37,11c-1.10457,0 -2,0.89543 -2,2c0,1.10457 0.89543,2 2,2c1.10457,0 2,-0.89543 2,-2c0,-1.10457 -0.89543,-2 -2,-2zM25,14c-6.06329,0 -11,4.93671 -11,11c0,6.06329 4.93671,11 11,11c6.06329,0 11,-4.93671 11,-11c0,-6.06329 -4.93671,-11 -11,-11zM25,16c4.98241,0 9,4.01759 9,9c0,4.98241 -4.01759,9 -9,9c-4.98241,0 -9,-4.01759 -9,-9c0,-4.98241 4.01759,-9 9,-9z"></path>
                      </g>
                    </g>
                  </svg>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
