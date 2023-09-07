import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeadCard = () => {
  const coverStyle = {
    width: "100%",
    height: "500px",
    background:
      'linear-gradient(180deg,#0e1115 0%,rgba(0, 0, 0, 0) 50%,#0e1115 100%),url("/asset/images/latenightloungepodcast_extend.jpg"),lightgray -47.578px -397.038px / 107.347% 223.06% no-repeat',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const secondImgStyle = {
    width: "100%",
    height: "500px",
    background:
      'linear-gradient(90deg, #0e1115 0%, rgba(0, 0, 0, 0) 100%),linear-gradient(180deg,#0e1115 0%,rgba(8, 10, 12, 0.13) 20.31%,rgba(0, 0, 0, 0) 50%,rgba(7, 9, 11, 0.08) 82.29%,#0e1115 100%),url("/asset/images/latenightloungepodcast_city.png"),lightgray 50% / cover no-repeat',
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div>
      <div className="container-fluid text-center">
        <div className="img-fluid" alt="Podcast Cover" style={coverStyle} />
      </div>

      <div className="container-fluid">
        <div className="text-center">
          <Image
            src="/asset/images/節目LOGO.png"
            className="img-fluid "
            alt="Podcast Logo Text"
            width={300}
            height={0}
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeadCard;
