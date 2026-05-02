import { useEffect,useState } from "react";

function Favourites(){
    const [favMovies, setFavMovies] = useState([]);
    const [favTracks, setFavTracks] = useState([]);

    useEffect(() => {
        const savedMovies = JSON.parse(localStorage.getItem('favMovies')) || [];
        const savedTracks = JSON.parse(localStorage.getItem('favTracks')) || [];
        setFavMovies(savedMovies);
        setFavTracks(savedTracks);
    }, []);

     return (
    <div className="px-8 py-10">
      <h1 className="text-3xl font-bold mb-10 text-center text-purple-400">❤️ Your Favourites</h1>

      <h2 className="text-2xl font-semibold mb-6">🎬 Movies</h2>
      {favMovies.length === 0 && <p className="text-gray-400 mb-8">No movies saved yet.</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {favMovies.map((movie) => (
          <div key={movie.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full" />
            <div className="p-3">
              <h3 className="font-semibold text-sm">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-6">🎵 Tracks</h2>
      {favTracks.length === 0 && <p className="text-gray-400">No tracks saved yet.</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favTracks.map((track) => (
          <div key={track.name} className="bg-gray-900 rounded-xl p-4 shadow-lg">
            <h3 className="font-semibold text-sm mb-1">{track.name}</h3>
            <p className="text-gray-400 text-xs">{track.artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Favourites;