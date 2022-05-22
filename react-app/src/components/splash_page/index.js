import { useHistory } from 'react-router-dom'
import './splash.css'
import { ReactComponent as Github} from './footer-icons/github.svg'
import { ReactComponent as Linkedin} from './footer-icons/linkedin.svg'

const Splash = () => {
  const history = useHistory()

  const onClick = () => {
    history.push(`/signup`)
  }
  return (
    <>
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
    <div className='footer-tech'>
      <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&amp;logo=javascript&amp;logoColor=%23F7DF1E"/>
      <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&amp;logo=python&amp;logoColor=ffdd54"/>
      <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&amp;logo=react&amp;logoColor=%2361DAFB"/>
      <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&amp;logo=css3&amp;logoColor=white"/>
      <img src="https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&amp;logo=redux&amp;logoColor=white"/>
      <img src="https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&amp;logo=heroku&amp;logoColor=white"/>
      <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&amp;logo=postgresql&amp;logoColor=white"/>
      <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&amp;logo=html5&amp;logoColor=white"/>
      <img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&amp;logo=flask&amp;logoColor=white"/>
      <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&amp;logo=docker&amp;logoColor=white"/>
    </div>
    <footer>
      <a href="https://github.com/edwincarr" target="_blank" >
        <Github />
      </a>
      <a href='https://www.linkedin.com/in/edwincarr/' target="_blank">
        <Linkedin/>
      </a>
    </footer>
    </div>
    </>
  )
}
export default Splash
