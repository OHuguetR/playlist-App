import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

export default function Playlist({
  playlistTracks,
  onRemove,
  onNameChange,
  onSave,
}) {
  function handleNameChange(e) {
    const value = e.target.value;
    onNameChange(value);
  }

  return (
    <div className="Playlist">
      <input defaultValue={"New Playlist"} onChange={handleNameChange} />
      {
        <TrackList
          tracks={playlistTracks}
          onRemove={onRemove}
          isRemoval={true}
        />
      }
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
}
