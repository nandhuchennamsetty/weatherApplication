import React from "react";
import { FaArrowDown, FaArrowUp, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";
import "./description.css";

const Description = ({ weather, units }) => {

  const tempUnit = units === "metric" ? "°C" : "°F";
  const windUnit = units === "metric" ? "m/s" : "m/h";
  const cards = [
    {
      id: 1,
      icon: <FaArrowDown />,
      title: "min",
      data: weather.temp_min !== undefined ? weather.temp_min.toFixed() : "N/A",
      unit: tempUnit,
    },
    {
      id: 2,
      icon: <FaArrowUp />,
      title: "max",
      data: weather.temp_max !== undefined ? weather.temp_max.toFixed() : "N/A",
      unit: tempUnit,
    },
    {
      id: 3,
      icon: <BiHappy />,
      title: "feels like",
      data:
        weather.feels_like !== undefined ? weather.feels_like.toFixed() : "N/A",
      unit: tempUnit,
    },
    {
      id: 4,
      icon: <MdCompress />,
      title: "pressure",
      data: weather.pressure !== undefined ? weather.pressure : "N/A",
      unit: "hpa",
    },
    {
      id: 5,
      icon: <MdOutlineWaterDrop />,
      title: "humidity",
      data: weather.humidity !== undefined ? weather.humidity : "N/A",
      unit: "%",
    },
    {
      id: 6,
      icon: <FaWind />,
      title: "wind speed",
      data: weather.speed !== undefined ? weather.speed.toFixed() : "N/A",
      unit: windUnit,
    },
  ];
  return (
    <div className="section section__description">
      {cards.map(({ id, icon, title, data, unit }) => (
        <div key={id} className="card">
          <div className="discription__card-icon">
            {icon}
            <small>{title}</small>
          </div>
          <h2>{`${data} ${unit}`}</h2>
        </div>
      ))}
    </div>
  );
};

export default Description;
