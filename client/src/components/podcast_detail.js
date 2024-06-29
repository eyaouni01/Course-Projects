import React, { useState, useEffect ,useRef, useCallback} from 'react';
import axios from 'axios';
import Header from "./header";
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import AudioPlayer from './react-audio-player';
import Navbarclient from './navbarclient';
import ReportPopup from './reportPopUp';

function Podcast_detail() {
    const { podcast_id } = useParams(); // variable pour stocker l'id cliqué
    
    const audioRef = useRef(null);
    const [Tracks, setTracks] = useState([]);
    const [podcastID, setpodcastID] = useState([]); // contient les donnée du podcast
  
    const [profile,setProfile]=useState(undefined); //pour verifier si un utlisateur est connecte ou nn 
    const [clickedTrack, setClickedTrack] = useState(null);     
   const [numViews, setNumViews] = useState(0);  // Ajouter un nouveau state pour stocker le nombre de vues
   const [startTime, setStartTime] = useState(null);
   const [endTime, setEndTime] = useState(null);


   const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);

  const handleReportClick = () => {
    setIsReportPopupOpen(true);
  };

  const handleReportClose = () => {
    setIsReportPopupOpen(false);
  };
   

   
   



     const handlePlay = useCallback((trackId) => {
      axios.get(`http://localhost:5000/track/${trackId}`)
        .then(response => {
          console.log(response, "seccuesssssssssss")
           setClickedTrack(response.data.id);
          
        })
        .catch(error => {
          console.log(error);
        });
       setStartTime(Date.now());
    
    }, []); // empty dependency array to memoize the function

    
   // requete post du temps ecoute 
 
   console.log(clickedTrack,"clicked track")

   //lorsque le player est mis en pause 
    const handlePause = () => {
   // setEndTime(Date.now());
    const end=Date.now()
     console.log(startTime,"startTime");
     console.log(end,"endTime");
    //const timeListened = (endTime - startTime) / 1000; // convert to seconds
    const timeListened = ((end - startTime) / (1000 )).toFixed(1); 
    console.log(timeListened,"timelistened");
    axios.post('http://localhost:5000/track/timelistned', {
      trackId: clickedTrack,
      listeningTime: timeListened
    }).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    });
  };
  console.log(endTime,"end time");

    useEffect(()=>{
        axios.get('http://localhost:5000/users/user/profile',{
            withCredentials: true,
          }).then((result)=>{console.log(result.data);setProfile(result.data.user)}).catch((err)=>{console.log(err,12)});
    },[])

  console.log(profile);

    

     // Envoyer une demande POST pour enregistrer le nombre de vues à chaque fois que la page est chargée
    useEffect(() => {
      axios.post(`http://localhost:5000/podcast/podcasts/${podcast_id}/view`)
          .then(response => {
              setNumViews(response.data.numViews);
          })
          .catch(error => {
              console.log(error);
          });
  }, [podcast_id]);





    //recuperer les data du podcast cliqué
    useEffect(() => {
      axios.get(`http://localhost:5000/podcast/podcast/${podcast_id}`)
        .then(response => {
            setpodcastID(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, [podcast_id]);
     //recuperer tous les tracks 
    useEffect(() => {
      axios.get('http://localhost:5000/track/tracks') // `${host}track/tracks`
        .then(response => {
          setTracks(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []); 

        
  
    
    const tracksData = Tracks.filter(track => track.podcastId === parseInt(podcast_id)).map(track => {
      return {
        title: track.title,
        author: podcastID.author,
        trackUrl: track.trackUrl,
        id: track.id
      };
    });
    
    return (
      <div>
          {profile === undefined ? (
        // afficher la balise header
        <Header/>
        
      ) : (
        // afficher la balise navbar
        <Navbarclient/>
       
      )}


        
        <div className='links_id'>
          <img  src='/hero_id.jpg' id='hero_id' />
          <Link to='/Podcasts'>Podcasts </Link>
          <span>{podcastID.title}</span>
        </div>

        <section className='podcast_id_container'>   
          <img src={podcastID.imageUrl} id='image_id' />
          <div className='podcast_id'>
              <div id='title_id'>{podcastID.title}</div>
              <div id='author_id'>{podcastID.author}</div>
              <div id='description_id'>{podcastID.description}</div>
              <img  src='/play1.jpg'  id='play_id' />
              
              <p id='share_id' >Share this podcast</p>
              <span className='reseau_sociaux_id'>
              
                <img src='/fb.jpg' id='fb_id' style={{cursor:"pointer"}} />
                <img src='/twitter.jpg' id='twitter_id'/>
              </span>
              <button  id="signupbutton"  style={{marginLeft:"100px"}}     onClick={handleReportClick}>Report this podcast</button>
          </div> 
          {isReportPopupOpen && <ReportPopup onClose={handleReportClose} podcastId={podcastID} />}             
        </section>

        <section className='tracks_section'>
          <h3>All Tracks</h3>
          <Link to={`/newTrack/${podcast_id}`}>Import track</Link>
          <div>
            {Tracks.filter(track => track.podcastId === parseInt(podcast_id)).map(track => {
              const date = new Date(track.created_at);
              const options = { year: 'numeric', month: 'long', day: 'numeric' };
              const formattedDate = date.toLocaleDateString('en-US', options);
              return (
                <div className='track' key={track.id}>
                    <div className='theline'></div>

                    <div className="track_container">
                      <span>
                        <img src='/micro1.jpg' id='mic_icon_track'/>
                      </span> 

                      <span className='track_info'>
                        <h4>{track.title}</h4>
                        <p>{formattedDate}</p>
                        <p>{track.description}</p>
                      </span>

                      <span>
                        
                          <img src='/play1.jpg' id='play_track'/>
                        <audio controls  ref={audioRef} onPlay={() => handlePlay(track.id)} onPause={handlePause}  >
                          <source src={track.trackUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                        
                        {
                          /*<AudioPlayer tracks={tracksData} />*/

                        }
                      </span> 
                    </div>
                </div>
              );
            })}
          </div>

        </section>
      </div>
    );
}

export default Podcast_detail;  