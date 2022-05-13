import { useHistory } from 'react-router-dom'
import './splash.css'

const Splash = () => {
  const history = useHistory()

  const onClick = () => {
    history.push(`/signup`)
  }
  return (
    <div className='splash-body'>
      <div className='splash-container'>
        <div className='splash-text'>
          <h1>The next-generation anime platform</h1>
          <h4>{`Track, share, and discover your favorite \n anime and manga with Ani-Tracker.`}</h4>
        </div>
        <div className='splash-grid'>
          <div className='splash-card-container'>
            <img src='https://anilist.co/img/landing/stats.svg' height='80px' alt='svg'/>
            <div>
              <h4>Discover your obsessions</h4>
              <p>What are your highest rated genres or most watched voice actors? Follow your watching habits over time with in-depth statistics.</p>
            </div>
          </div>
          <div className='splash-card-container'>
            <img src='https://anilist.co/img/landing/apps.svg' height='80px' alt='svg'/>
            <div>
              <h4>Bring Anilist anywhere</h4>
              <p>Keep track of your progress on-the-go with one of many AniList apps across iOS, Android, macOS, and Windows.</p>
            </div>
          </div>
          <div className='splash-card-container'>
            <img src='https://anilist.co/img/landing/social.svg' height='80px' alt='svg'/>
            <div>
              <h4>Join the conversation</h4>
              <p>Share your thoughts with our thriving community, make friends, socialize, and receive recommendations.</p>
            </div>
          </div>
          <div className='splash-card-container'>
            <img src='https://anilist.co/img/landing/custom.svg' height='80px' alt='svg'/>
            <div>
              <h4>Tweak it to your liking</h4>
              <p>Customize your scoring system, title format, color scheme, and much more! Also, we have a dark mode.</p>
            </div>
          </div>
        </div>
        <div className='splash-button' onClick={onClick}>Join Now</div>
      </div>
    </div>
  )
}
export default Splash
