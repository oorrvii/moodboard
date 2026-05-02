import axios from 'axios';

export const fetchTracksByMood = async (mood, language = "en") => {
    const tagMap = {
    en: mood.toLowerCase(),
  hi: "bollywood",
  ko: "k-pop",
  es: "latin",
  fr: "french pop",
  ja: "j-pop",
    }
    const tag = tagMap[language] || mood.toLowerCase()
    const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tag}&api_key=${import.meta.env.VITE_LASTFM_API_KEY}&format=json`;
    const response = await axios.get(url);
    return response.data.tracks.track;
};