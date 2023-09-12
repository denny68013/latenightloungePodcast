import { NextResponse } from "next/server";
const convert = require("xml-js");

export async function GET(request) {
  console.log(request.url);
  try {
    const response = await fetch(
      `https://open.firstory.me/rss/user/cl73fj8k80b7201z65r8bh7w7`
    );
    const xmlData = await response.text();

    const jsonData = convert.xml2json(xmlData, { compact: true, spaces: 4 });

    const episodesData = parseEpisodes(jsonData);

    return NextResponse.json({ episodes: episodesData });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      error: "An error occurred while fetching or processing the data.",
    });
  }
}

function parseEpisodes(xmlJson) {
  const episodes = [];
  const xmlObj = JSON.parse(xmlJson);

  if (xmlObj && xmlObj.rss && xmlObj.rss.channel && xmlObj.rss.channel.item) {
    const items = xmlObj.rss.channel.item;

    items.forEach((item) => {
      const title = item.title._cdata;
      const content = item.description._cdata;
      const image = item["itunes:image"]._attributes.href;
      const duration = extractDuration(item);
      const hours = duration.hours;
      const minutes = duration.minutes;
      const seconds = duration.seconds;
      const pubDate = formatDateToChinese(item.pubDate._text);
      const link = item["guid"]._text;
      let url = decodeURIComponent(item.enclosure._attributes.url).split(
        "url="
      )[1];
      const audioLink = url;
      episodes.push({
        title,
        content,
        image,
        hours,
        minutes,
        seconds,
        pubDate,
        link,
        audioLink,
      });
    });
  }

  return episodes;
}
function extractDuration(item) {
  const durationText = item["itunes:duration"]._text;
  const durationInSeconds = parseDurationString(durationText);
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  return {
    hours,
    minutes,
    seconds,
  };
}
function parseDurationString(durationText) {
  // 将形如 "577" 的字符串转换为秒
  return parseInt(durationText, 10);
}

function formatDateToChinese(dateString) {
  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return { year, month: months[month], day };
}
