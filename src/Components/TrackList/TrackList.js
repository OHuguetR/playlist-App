import React from "react";
import "./TrackList.css";
import Track from "../Track/Track.js";

export default function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
  return (
    <div className="TrackList">
      {tracks.map((track) => {
        return (
          <Track
            key={track.id}
            track={track}
            onAdd={onAdd}
            isRemoval={isRemoval}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
}
