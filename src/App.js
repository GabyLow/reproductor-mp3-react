import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: "Locked Out of Heaven",
    songArtist: "Bruno Mars",
    songSrc: ".Assets/songs/Bruno-Locked.mp3",
    songAvatar: "./Assets/Images/Brunomars.jpg",
    songLyrics: "./Assets/Lyrics/Lyric-bruno.jpg",
  });

  //UseStates Variables
  const [audioProgress, setAudioProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState("00 : 00");
  const [musicCurrentTime, setMusicCurrentTime] = useState("00 : 00");
  const [volume, setVolume] = useState(50);

  const currentAudio = useRef();

  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };

  //Change Avatar Class
  let avatarClass = ["objectFitCover", "objectFitContain", "none"];
  const [avatarClassIndex, setAvatarClassIndex] = useState(0);
  const handleAvatar = () => {
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0);
    } else {
      setAvatarClassIndex(avatarClassIndex + 1);
    }
  };

  //Change Lyrics Class
  let lyricsClass = ["objectFitCover", "objectFitContain", "none"];
  const [lyricsClassIndex, setLyricsClassIndex] = useState(0);
  const handleLyrics = () => {
    if (lyricsClassIndex >= lyricsClass.length - 1) {
      setLyricsClassIndex(0);
    } else {
      setLyricsClassIndex(lyricsClassIndex + 1);
    }
  };

  //Play Audio Function

  const handleAudioPlay = () => {
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true);
    } else {
      currentAudio.current.pause();
      setIsAudioPlaying(false);
    }
  };
 
  //Audio Controls

const handleNextSong = () => {
  if (musicIndex >= musicAPI.length - 1) {
    let setNumber = 0;
    setMusicIndex(setNumber);
    updateCurrentMusicDetails(setNumber);
  } else {
    let setNumber = musicIndex + 1;
    setMusicIndex(setNumber);
    updateCurrentMusicDetails(setNumber);
  }
};

const handlePrevSong = () => {
  if (musicIndex === 0) {
    let setNumber = musicAPI.length - 1;
    setMusicIndex(setNumber);
    updateCurrentMusicDetails(setNumber);
  } else {
    let setNumber = musicIndex - 1;
    setMusicIndex(setNumber);
    updateCurrentMusicDetails(setNumber);
  }
};

const updateCurrentMusicDetails = (number) => {
  let musicObject = musicAPI[number];
  currentAudio.current.src = musicObject.songSrc;
  currentAudio.current.play();
  setCurrentMusicDetails({
    songName: musicObject.songName,
    songArtist: musicObject.songArtist,
    songSrc: musicObject.songSrc,
    songAvatar: musicObject.songAvatar,
    songLyrics: musicObject.songLyrics,
  });
  setIsAudioPlaying(true);
};

const handleAudioUpdate = () => {
  //Input total length of the audio
  let minutes = Math.floor(currentAudio.current.duration / 60);
  let seconds = Math.floor(currentAudio.current.duration % 60);
  let musicTotalLength0 = `${minutes < 10 ? `0${minutes}` : minutes} : ${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
  setMusicTotalLength(musicTotalLength0);

  //Input Music Current Time
  let currentMin = Math.floor(currentAudio.current.currentTime / 60);
  let currentSec = Math.floor(currentAudio.current.currentTime % 60);
  let musicCurrentT = `${currentMin < 10 ? `0${currentMin}` : currentMin} : ${
    currentSec < 10 ? `0${currentSec}` : currentSec
  }`;
  setMusicCurrentTime(musicCurrentT);

  const progress = parseInt(
    (currentAudio.current.currentTime / currentAudio.current.duration) * 100
  );
  setAudioProgress(isNaN(progress) ? 0 : progress);
};

//Volume Mute
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    currentAudio.current.muted = !isMuted;
  };

//Media API
const musicAPI = [
  {
    songName: "Locked Out of Heaven",
    songArtist: "Bruno Mars",
    songSrc: "./Assets/songs/Bruno-Locked.mp3",
    songAvatar: "./Assets/Images/Brunomars.jpg",
    songLyrics: "./Assets/Lyrics/Lyric-bruno.jpg",
  },
  {
    songName: "Viva la vida",
    songArtist: "Coldplay",
    songSrc: "./Assets/songs/Coldplay-Viva.mp3",
    songAvatar: "./Assets/Images/Coldplay.jpg",
    songLyrics: "./Assets/Lyrics/Lyric-cold.jpg",
  },
  {
    songName: "Get Lucky",
    songArtist: "Daft Punk",
    songSrc: "./Assets/songs/Daft Punk-Get lucky.mp3",
    songAvatar: "./Assets/Images/DaftP.jpg",
    songLyrics: "./Assets/Lyrics/Lyric-daft.jpg",
  },
  {
    songName: "Shape of you",
    songArtist: "Ed Sheeran",
    songSrc: "./Assets/songs/Ed-Shape.mp3",
    songAvatar: "./Assets/Images/Edsheeran.jpg",
    songLyrics: "./Assets/Lyrics/Lyric-ed.jpg",
  },
];

//Video Background


return (
 <>
  
  <div className="container">
    <audio src='./Assets/songs/Bruno-Locked.mp3' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
    <div className="music-Container">
      <p className='musicPlayer'>Now Playing</p>
      <p className='music-Head-Name'>{currentMusicDetails.songName}</p>
      <p className='music-Artist-Name'>{currentMusicDetails.songArtist}</p>
    <img src={currentMusicDetails.songAvatar} className={avatarClass[avatarClassIndex]} onClick={handleAvatar} alt="song Avatar" id='songAvatar'/>
    <div className="musicTimerDiv">
      <p className='musicCurrentTime'>{musicCurrentTime}</p>
      <p className='musicTotalLenght'>{musicTotalLength}</p>
    </div>
    <input type="range" name="musicProgressBar" className='musicProgressBar' value={audioProgress} onChange={handleMusicProgressBar} />
    <div className="musicControlers">
      <i className='fa-solid fa-backward musicControler' onClick={handlePrevSong}></i>
      <i className={`fa-solid ${isAudioPlaying? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
      <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>
    </div>
    <i className={`fa-solid ${isMuted ? "fa-volume-off" : "fa-volume-up"} volumeToggler`} onClick={toggleMute}></i>
      <input type="range" min="0" max="100" value={volume} onChange={(e) => {setVolume(e.target.value);currentAudio.current.volume = e.target.value / 100; }} className="volumeSlider"/>
      </div>
      <div>
       <img src={currentMusicDetails.songLyrics} className={lyricsClass[lyricsClassIndex]} onClick={handleLyrics} alt="song Lyrics" id='songLyrics'/>
      </div>
    </div>
    </>
  );
}

export default App;
