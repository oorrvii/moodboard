import { useLocation } from 'react-router-dom'
import {useEffect,useState} from 'react'
import {fetchMoviesByMood} from '../utils/tmdbApi'
import { fetchTracksByMood } from '../utils/lastfmApi';

function Results() {
  const location = useLocation()
  const mood = location.state?.mood
  const language = location.state?.language || "en"
  const [movies,setmovies] = useState([])
  const[tracks,setTracks]= useState([])
  const [tab, setTab] = useState("movies")
  const[currpage,setcurrpage]=useState(1)
  const[totalpage,settotalpage]=useState(1)

 useEffect(() => {
  const getData = async () => {
    const movieData = await fetchMoviesByMood(mood,language,currpage);
    const trackData = await fetchTracksByMood(mood,language);
    const uniqueTracks = trackData.filter((track, index, self) => 
  index === self.findIndex(t => t.name === track.name)
)
    setmovies(movieData.results)
    settotalpage(movieData.totalPages)
    setTracks(uniqueTracks)
  };
  getData();
}, [mood,currpage]);

const saveToFavourites = (item, key) => {
  const existing = JSON.parse(localStorage.getItem(key)) || []
  const alreadyExists = existing.find(i => i.id === item.id)
  if(alreadyExists) return  // stop here, don't save again
  existing.push(item)
  localStorage.setItem(key, JSON.stringify(existing))
}

    return (
      
    <div className="px-8 py-10">
      <h1 className="text-3xl font-bold mb-10 text-center">Results for <span className="text-purple-400">{mood}</span></h1>
      
      <div className="flex gap-4 mb-8">
  <button
    onClick={() => setTab("movies")}
    className={`px-6 py-2 rounded-full font-semibold transition ${tab === "movies" ? "bg-purple-600" : "bg-gray-700"}`}
  >
    🎬 Movies
  </button>
  <button
    onClick={() => setTab("tracks")}
    className={`px-6 py-2 rounded-full font-semibold transition ${tab === "tracks" ? "bg-pink-600" : "bg-gray-700"}`}
  >
    🎵 Tracks
  </button>
</div>
      {tab === "movies" && (
        <div>
      <h2 className="text-2xl font-semibold mb-6">🎬 Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="w-full" />
            <div className="p-3">
              <h3 className="font-semibold text-sm mb-2">{movie.title}</h3>
              <button
                onClick={() => saveToFavourites(movie, 'favMovies')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs py-1 rounded-lg transition"
              >
                Save Movie
              </button>
            </div>
          </div>
        ))}
      </div>
    <div className="flex justify-center items-center gap-6 mt-8">
  <button
    onClick={() => setcurrpage(prev => prev - 1)}
    disabled={currpage === 1}
    className="px-6 py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
  >
    ← Previous
  </button>
  
  <span className="text-gray-400">Page {currpage} of {totalpage}</span>
  
  <button
    onClick={() => setcurrpage(prev => prev + 1)}
    disabled={currpage === totalpage}
    className="px-6 py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
  >
    Next →
  </button>
</div>

      </div>
      )}

      {tab === "tracks" && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">🎵 Tracks</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tracks.map((track) => (
              <div key={track.name} className="bg-gray-900 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform">
                <div 
                  className="w-full h-24 rounded-lg flex items-center justify-center text-4xl font-bold mb-3"
                  style={{ backgroundColor: `hsl(${track.name.charCodeAt(0) * 10}, 60%, 35%)` }}
                >
                  {track.artist.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-semibold text-sm mb-1">{track.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{track.artist.name}</p>
                <button
                  onClick={() => saveToFavourites(track, 'favTracks')}
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white text-xs py-1 rounded-lg transition"
                >
                  Save Track
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default Results