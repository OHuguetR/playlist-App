let accessToken;
const clientId = "b1f6dbbc7a2f4c9dac2dc6c8b16845f2";
const redirectUri = "http://localhost:3000";
const Spotify = {
  initApp() {
    Spotify.getAccessToken();
  },
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    //check for aaccess token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); //Obtens la url d'una pàgina web
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },
  async search(term) {
    const accessToken = Spotify.getAccessToken();

    const request = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const jsonResponse = await request.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },
  async savePlayList(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const userIdRequest = await fetch("https://api.spotify.com/v1/me", {
      headers: headers,
    });
    const userIdJson = await userIdRequest.json();
    const userId = userIdJson.id;

    const newPlaylistRequest = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ name: name }),
      }
    );
    const newPlaylistParsedResponse = await newPlaylistRequest.json();
    const playListId = newPlaylistParsedResponse.id;

    try {
      await fetch(`https://api.spotify.com/v1/playlists/${playListId}/tracks`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ uris: trackUris }),
      });
    } catch (error) {
      throw alert;
    }
  },
};

export default Spotify;
