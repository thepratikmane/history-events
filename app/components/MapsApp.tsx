"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import eventsData from "../historyEvents";
import React from "react";

const defaultPosition: [number, number] = [51.505, -0.09];

const emptyStar = <i className="fa-regular fa-star"></i>;
const fullStar = (
  <i
    className="fa-solid fa-star"
    style={{
      color: "#fdc401",
    }}
  ></i>
);

export interface HistoricalEvent {
  id: number;
  title: String;
  description: String;
  position: [number, number];
  category: String;
}

function MapsApp() {
  const icon: Icon = new Icon({
    iconUrl: "marker.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="content">
      <div className="flex flex-col w-full h-full">
        <div className="h-12"></div>
        <MapContainer
          className="map-container"
          center={defaultPosition}
          zoom={13}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={defaultPosition} icon={icon}>
            {eventsData.map((event) => {
              return (
                <Marker position={event.position} key={event.id} icon={icon}>
                  <Popup className="popup">
                    <div className="popup-inner">
                      <h2 className="popup-inner_title">{event.title}</h2>
                      <p className="popup-inner_description">
                        {event.description}
                      </p>
                      <button className="popup-inner_button">
                        <span>{emptyStar}</span>Favorite
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default MapsApp;
