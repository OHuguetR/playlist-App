import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";
import Spotify from "../../util/Spotify";
import { useEffect } from "react";

export default function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playListName, setPlayListName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  useEffect(() => {
    Spotify.initApp();
  }, [])
  
  async function search(term) {
    const searches = await Spotify.search(term);
    setSearchResults(searches);
  }

  function addTrack(track) {
    let tracks = [...playlistTracks];
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    setPlaylistTracks(tracks);
  }

  function removeTrack(track) {
    let tracks = [...playlistTracks];
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    setPlaylistTracks(tracks);
  }

  function updatePlaylistName(name) {
    setPlayListName(name);
  }

  async function savePlaylist(e) {
    const trackUris = playlistTracks.map((track) => track.uri);
    await Spotify.savePlayList(playListName, trackUris);
    setPlayListName("New Playlist");
    setPlaylistTracks([]);
  }

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playListName={playListName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}
