//import dotenv from 'dotenv';
//dotenv.config();
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./header";
import Footer from "./footer";
import Slider from "./slider";
import { Link } from "react-router-dom"
import Navbarclient from './navbarclient';
import { Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
// Accès aux variables d'environnement définies dans le fichier .env
//const host = process.env.host;  || 'http://localhost:5000/'

function Clientpage() {
  const [Podcasts, setPodcasts] = useState([]);
//verifier si un utlisateur connecte ou non *********

const [isFilterVisible, setIsFilterVisible] = useState(false);
const toggleFilter = () => setIsFilterVisible(!isFilterVisible);
const [dateFilter, setDateFilter] = useState('');
const [themeFilter, setThemeFilter] = useState('');
const [results, setResults] = useState([]);

const [profile, setProfile] = useState(null);
const [error, setError] = useState(null);

useEffect(() => {
  axios
    .get('http://localhost:5000/users/user/profile', {
      withCredentials: true,
    })
    .then((result) => {
      if (result.data.success) {
        setProfile(result.data.user);
      } else {
        setError('Failed to get profile');
      }
    })
    .catch((err) => {
      console.error(err);
      setError('Failed to get profile');
    });
}, []);
const handleDateFilterChange = (event) => {
  setDateFilter(event.target.value);
};

const handleThemeFilterChange = (event) => {
  setThemeFilter(event.target.value);
};

const handleSearch = () => {
  axios.get(`http://localhost:5000/podcast/search/${dateFilter}/${themeFilter}`)
    .then((response) => {
      setPodcasts(response.data);
      console.log(response.data)
      
    })
    .catch((error) => {
      console.log(error);
    });
};





  useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts') // `${host}podcast/podcasts`
      .then(response => {
        setPodcasts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); 
  if (error) {
    // Rediriger l'utilisateur vers la page d'accueil s'il y a une erreur
    return <Navigate to="/" />;
  }

  if (!profile) {
    // Si l'utilisateur n'a pas encore été chargé, on affiche un message de chargement
    return <div>Loading...</div>;
  }
 
    return (
    <div>
        <Navbarclient/>
        

<section className='topic_section'>
<h2>Best podcast topics</h2>
  <div className="topic_links">
    <Link to='/allPodcasts/News & Politics'>News & Politics</Link>
    <Link to='/allPodcasts/Economy and Business'>Economy and Business</Link>
    <Link to='/allPodcasts/Technologie'>Technologie</Link>
    <Link to='/allPodcasts/Start-up'>Start-up</Link> 
    <Link to='/allPodcasts/Government'>Government</Link>
    <Link to='/allPodcasts/History'>History</Link>
    <Link to='/allPodcasts/Educational'>Educational</Link>
    <Link to='/allPodcasts/Sport And Leisur'>Sport And Leisur</Link>
    <Link to='/allPodcasts/History'>Health And Wellness</Link>
    <Link to='/allPodcasts/Companies And Tunisia'>Companies And Tunisia</Link>
    <Link to='/allPodcasts/Arts & Culture'>Arts & Culture</Link>
    <Link to='/allPodcasts/Tv & Films'>Tv & Films</Link>
    <Link to='/allPodcasts/Society & Culture'>Society & Culture</Link>
    <Link to='/allPodcasts/Religion & Spirituality'>Religion & Spirituality</Link>
    <Link to='/allPodcasts/Other'>Other</Link>
    <Link to='/imageUploader'>test</Link>
      
    <FontAwesomeIcon icon={faList}  style={{marginLeft:"10px",marginTop:"20px",fontSize:"25px",cursor:'pointer'}} onClick={toggleFilter} />
         
         
         {isFilterVisible &&
       <div className="filter-box">
       <div className="filter-group">
         <p className="filter-title"> Filter By Date</p>
         <div className="radio-buttons">
           <label className="radio-label">
             <input type="radio" name="dateFilter" value="last_day" checked={dateFilter === 'last_day'} onChange={handleDateFilterChange} />
             <span className="radio-text">Last Day</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="dateFilter" value="one_week" checked={dateFilter === 'one_week'} onChange={handleDateFilterChange} />
             <span className="radio-text"> One Week ago</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="dateFilter" value="one_month" checked={dateFilter === 'one_month'} onChange={handleDateFilterChange} />
             <span className="radio-text">One Month ago</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="dateFilter" value="one_year" checked={dateFilter === 'one_year'} onChange={handleDateFilterChange} />
             <span className="radio-text">One Year ago</span>
           </label>
         </div>
       </div>
       <div className="filter-group">
         <p className="filter-title">Filter by Topic</p>
         <div className="radio-buttons-topic">
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Economy and Business" checked={themeFilter === 'Economy and Business'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Sports</span>
           </label>
           <label className="radio-label">
            <input type="radio" name="themeFilter" value="News & Politics" checked={themeFilter === 'News & Politics'} onChange={handleThemeFilterChange} />
            <span className="radio-text">News & Politics</span>
            </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Technologie" checked={themeFilter === 'Technologie'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Technologie</span>
           </label>

           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Start-up" checked={themeFilter === 'Start-up'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Start-up</span>
           </label>

           <label className="radio-label">
             <input type="radio" name="themeFilter" value="History" checked={themeFilter === 'History'} onChange={handleThemeFilterChange} />
             <span className="radio-text">History</span>
           </label>

           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Government" checked={themeFilter === 'Government'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Government</span>
           </label>

           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Educational" checked={themeFilter === 'Educational'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Educational</span>
           </label>

           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Arts & Culture" checked={themeFilter === 'Arts & Culture'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Arts & Culture</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Health And Wellness" checked={themeFilter === 'Health And Wellness'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Health And Wellness</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Companies And Tunisia" checked={themeFilter === 'Companies And Tunisia'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Companies And Tunisia</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Tv & Films" checked={themeFilter === 'Tv & Films'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Tv & Films</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Society & Culture" checked={themeFilter === 'Society & Culture'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Society & Culture</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Religion & Spirituality" checked={themeFilter === 'Religion & Spirituality'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Religion & Spirituality</span>
           </label>
           <label className="radio-label">
             <input type="radio" name="themeFilter" value="Other" checked={themeFilter === 'Other'} onChange={handleThemeFilterChange} />
             <span className="radio-text">Other</span>
           </label>
           
         </div>
        
       </div>
       <button id="btnSearch" onClick={handleSearch}>Search</button>
     </div>
     
     }
  </div>   
</section>

<section className='podcast_section'>

  <h2>News & Politics</h2>
    <div className='podcast_container'>
      {Podcasts.filter(podcast => podcast.topic === 'News & Politics').slice(0, 6).map(podcast => (
        <div className='podcast' key={podcast.id}> 
          <Link to={`/podcast/${podcast.id}`}>
            <img src={podcast.imageUrl} />
            <h4>{podcast.title}</h4>
          </Link>
          <p>{podcast.author}</p>  
        </div>  
      ))}
    </div>

  <h2>Economy and Business</h2>
  <div className='podcast_container'>
      {Podcasts.filter(podcast => podcast.topic === 'Economy and Business').slice(0, 6).map(podcast => (
        <div className='podcast' key={podcast.id}> 
          <Link to={`/podcast/${podcast.id}`}>
            <img src={podcast.imageUrl} />
            <h4>{podcast.title}</h4>
          </Link>
          <p>{podcast.author}</p>  
        </div>  
      ))}
    </div>

    <h2>Technology</h2>
    <div className='podcast_container'>
      {Podcasts.filter(podcast => podcast.topic === 'Technologie').slice(0, 6).map(podcast => (
        <div className='podcast' key={podcast.id}> 
          <Link to={`/podcast/${podcast.id}`}>
          <img src={podcast.imageUrl} />
            <h4>{podcast.title}</h4>
          </Link>
          <p>{podcast.author}</p>  
        </div>  
      ))}
    </div>

    <h2>Start-up</h2>
    <div className='podcast_container'>
      {Podcasts.filter(podcast => podcast.topic === 'Start-up').slice(0, 6).map(podcast => (
        <div className='podcast' key={podcast.id}> 
          <Link to={`/podcast/${podcast.id}`}>
            <img src={podcast.imageUrl} />
            <h4>{podcast.title}</h4>
          </Link>
          <p>{podcast.author}</p>  
        </div>  
      ))}
    </div>

    <h2>Government</h2>
    <div className='podcast_container'>
      {Podcasts.filter(podcast => podcast.topic === 'Government').slice(0, 6).map(podcast => (
        <div className='podcast' key={podcast.id}> 
          <Link to={`/podcast/${podcast.id}`}>
            <img src={podcast.imageUrl} />
            <h4>{podcast.title}</h4>
          </Link>
          <p>{podcast.author}</p>  
        </div>  
      ))}
    </div>

    <h2>History</h2>
    <div className='podcast_container'>
      {Podcasts.filter(podcast => podcast.topic === 'History').slice(0, 6).map(podcast => (
        <div className='podcast' key={podcast.id}> 
          <Link to={`/podcast/${podcast.id}`}>
            <img src={podcast.imageUrl} />
            <h4>{podcast.title}</h4>
          </Link>
          <p>{podcast.author}</p>  
        </div>  
      ))}
    </div>
  
</section>

      <Footer/>
    </div>
   
    )
}
export default Clientpage;