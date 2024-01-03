"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import eventsData from "../historyEvents";
import React, { useState } from "react";
import FlyToMaker from "./FlyToMaker";
import Filter from "./Filter";
// import { useRef } from "react";




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

  // favourites : The key in localStorage whose value is array of ids of favourited elements
  // the function (the initial state) defiend in useState get executed immediately
  // when the page is loaded, but only for once
  // the returned value i.e savedFavourties gets saved in the variable favourites
  const [favourites, setFavourites] = useState<Number[]>(() => {
    const savedFavourites = localStorage.getItem("favourites");
    return savedFavourites ? JSON.parse(savedFavourites) : [];
  });

  const [activeHistoricalEvent, setActiveHistoricalEvent] = useState<HistoricalEvent | null>();
  // const handleMarkerClick = (event: HistoricalEvent) => {
  //   setActiveHistoricalEvent(event);
  // };

  const [selectedCategory, setSelectedCategory] = useState<String | null>(null)


  // const mapRef = useRef<any>(null);
  // const handleMarkerClick = (event: HistoricalEvent) => {
  //   setActiveHistoricalEvent(event);
  //   if (mapRef.current) {
  //     mapRef.current.flyTo(event.position, 13, {
  //       duration: 1,
  //     });
  //   }
  // };

  const handleFavouriteClick = (eventId: number) => {
    let updatedFavourites = favourites.filter((id) => id !== eventId); // if id already exits in the favs, remove it

    if (!favourites.includes(eventId)) {
      // if id doesn't exit in favs, include in the beginning of it.
      updatedFavourites = [eventId, ...favourites];
    }

    setFavourites(updatedFavourites); // this new updated list of favs now need to be set in favs variable...duhh.

    localStorage.setItem("favourites", JSON.stringify(updatedFavourites)); // also set this new favs list in local storage
  };

  const handleListItemClick = (eventId: number) => {
    const event = eventsData.find((event) => event.id === eventId);

    if (event) {
      setActiveHistoricalEvent(event);
    }
  }






  return (
    <div className="content">
      <div className="map-content flex flex-col gap-6 h-full">
        {/* <div className="h-12"></div> */}
        <Filter setSelectedCategory={setSelectedCategory} />
        <MapContainer
          className="map-container"
          center={defaultPosition}
          zoom={4}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {/* <Marker position={defaultPosition} icon={icon} /> */}
          {eventsData.filter((event) => !selectedCategory || event.category === selectedCategory).map((event) => {
            return (
              <Marker
                position={event.position}
                key={event.id}
                icon={icon}
                // onClick={() => handleMarkerClick}
                eventHandlers={{
                  click: () => setActiveHistoricalEvent(event),
                }}
              />
            );
          })}

          {/**. If activeHistoricalEvent is truthy (i.e., not null or undefined), the content inside the parentheses (here popup element) will be rendered; otherwise, nothing will be rendered. */}
          {activeHistoricalEvent && (
            <Popup position={activeHistoricalEvent.position} className="popup">
              <div className="popup-inner">
                <h2 className="popup-inner_title">
                  {activeHistoricalEvent.title}
                </h2>
                <p className="popup-inner_description">
                  {activeHistoricalEvent.description}
                </p>
                <button
                  className="popup-inner_button"
                  onClick={() => handleFavouriteClick(activeHistoricalEvent.id)}
                >
                  {favourites.includes(activeHistoricalEvent.id) ? (
                    <span>{fullStar} Unfavourite</span>
                  ) : (
                    <span>{emptyStar} Favourite</span>
                  )}
                </button>
              </div>
            </Popup>
          )}

          {activeHistoricalEvent && (
            <FlyToMaker position={activeHistoricalEvent.position} zoomLevel={15} />
          )}

        </MapContainer>
      </div>

      <div className="liked-events">
        <h1 className="liked-events_title">
          {fullStar}Favourtie Events
        </h1>
        {favourites
          .map((id) => eventsData.find((event) => event.id === id))
          .filter((event) => event !== undefined)
          .map((event) => (
            <ul>
              <li key={event?.id} className="liked-events_event" onClick={() => handleListItemClick(event?.id as number)}>
                <h3>{event?.title}</h3>
              </li>
            </ul>

          ))}
      </div>
    </div>
  );
}

export default MapsApp;
