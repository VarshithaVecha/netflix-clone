import React,{useEffect,useRef, useState} from 'react'
import './Titlecards.css'
import { Link } from 'react-router-dom';
//import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title,category}) => {
const [apiData,setApiData] = useState([]);
const cardsRef = useRef();
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYmQ4MWZmMTE5OWMwMGViZGVhZmQyYTNlZTdiZjEzYyIsIm5iZiI6MTc0NzI5MTAxOC40NzQsInN1YiI6IjY4MjU4YjhhMDBkZjJiZDJmNGExNzM4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0itl8yroeQleht0-Sg7JTZ8LXNWV67NfKIcERaYjy_E'
    }
  };
const handleWheel = (event)=>{
    event.preventDefault;
    cardsRef.current.scrollLeft += event.deltaY;
}
useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));
    cardsRef.current.addEventListener('wheel',handleWheel);
},[])
  return (
    <div className='titlecard'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index)=>{
            return <Link to={`/player/${card.id}`} className="card" key={index}>
                <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
