import Moodcard from "../components/MoodCard";
import { moodData } from "../utils/moodData";
import {useNavigate} from "react-router-dom";
import { useState } from "react";

function Home(){
    const navigate = useNavigate();
    const [language, setLanguage] = useState("en")
    return(
         <div className="flex flex-col items-center py-16 px-8">
      <h1 className="text-4xl font-bold mb-4">How are you feeling?</h1>
      <p className="text-gray-400 mb-12">Pick a mood and we'll find the perfect movies and music for you</p>
      <select
  value={language}
  onChange={(e) => setLanguage(e.target.value)}
  className="bg-gray-800 text-white px-6 py-2 rounded-full mb-8 border border-gray-600 focus:outline-none focus:border-purple-400"
>
  <option value="en">🎬 Hollywood (English)</option>
  <option value="hi">🎥 Bollywood (Hindi)</option>
  <option value="ko">🎬 Korean</option>
  <option value="es">🎬 Spanish</option>
  <option value="fr">🎬 French</option>
  <option value="ja">🎬 Japanese</option>
</select>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
            {moodData.map((mood) => (
                <Moodcard
                    key={mood.name}
                    name={mood.name}
                    emoji={mood.emoji}
                    color={mood.color}
                    onClick={() => navigate('/results', { state: { mood: mood.name,language } })}
                />
            ))}
        </div>
        </div>
    )
}
export default Home