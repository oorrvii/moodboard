import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-gray-900 shadow-lg">
      <h1 className="text-2xl font-bold text-purple-400">🎭 Moodboard</h1>
      <div className="flex gap-6">
      <Link to="/" className="hover:text-purple-400 transition">Home</Link>
      <Link to="/favourites" className="hover:text-purple-400 transition">Favourites</Link>
      </div>
    </nav>
  )
}

export default Navbar