function Moodcard({name,emoji,color,onClick}){
    return (
        <div onClick={onClick} 
        style={{backgroundColor: color}}
        className="cursor-pointer rounded-2xl p-8 flex flex-col items-center gap-3 hover:scale-105 transition-transform shadow-lg"
        >
            <span className="text-5xl">{emoji}</span>
            <p className="text-xl font-semibold text-white">{name}</p>
        </div>
    )
}
export default Moodcard;