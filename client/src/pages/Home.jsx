import BakingVideo from '../images/BakingVideo.mp4'


const Home = () =>{
  return(
    <div id='home'>
    <h1>Home</h1>
     <video controls width='600'><source src={BakingVideo} type='video/mp4' /></video>
    </div>
  )
}

export default Home