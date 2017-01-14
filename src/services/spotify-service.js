
spotifyService.$inject = ['$http', 'apiUrl'];

export default function spotifyService ($http, apiUrl) {

  const type = '&type=artist';
  const jaRule = '1J2VVASYAamtQ3Bt8wGgA6';

  function getJa () {
    return $http.get(`${apiUrl}/spotify/artists/${jaRule}`)
      .then(res => res.data);
  }

  function search (string) {
    return $http.get(`${apiUrl}/spotify/search?q=${string}&${type}`)
      .then(res => res.data);
  }

  function getArtistAlbums (id) {
    return $http.get(`${apiUrl}/spotify/artists/${id}`)
      .then(res => res.data);
  }

  function getAlbumTracks (id) {
    return $http.get(`${apiUrl}/spotify/albums/${id}`)
      .then(res => res.data);
  }

  return {
    getJa,
    search,
    getArtistAlbums,
    getAlbumTracks
  };
}