import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Favourites from './pages/Favourites'
import Home from './pages/Home'
import Results from './pages/Results'

  function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </div>
  )
}
export default App
