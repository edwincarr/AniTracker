<div id="top"></div>


<br />
<div align="center">

<h3 align="center">Ani-Tracker</h3>

  <p align="center">
    Ani-Tracker is a Social-cataloging website to track previously watched or planning to watch anime inspired by Anilist.co
    <br />
    <a href="https://github.com/edwincarr/AniTracker/wiki"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://ani-tracker.herokuapp.com/">View Demo</a>
    ·
    <a href="https://github.com/edwincarr/AniTracker/issues">Report Bug</a>
    ·
    <a href="https://github.com/edwincarr/AniTracker/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Screenshot 2022-05-21 164546](https://user-images.githubusercontent.com/69633370/169668433-841c32af-0efb-4566-b03a-6c145978d369.png)

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img src="https://icongr.am/devicon/python-plain.svg?size=128&color=ffffff" height=40/><img src="https://icongr.am/devicon/docker-original.svg" height=50/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=50/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/>

### API

<img src="https://play-lh.googleusercontent.com/fJbHIg6QrqzVD18nUvHXDHA-l3X9FVz5qUNhESnKKRdCspaUnXt4L83eD7nnWZZyzw" height=40/>
<a href="https://kitsu.docs.apiary.io/#">Kistsu Anime API</a>

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:edwincarr/AniTracker.git
   ```
   
2. Install Dependencies in the root folder
   ```sh
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```
   
3. Install NPM packages inside of the react-app folder
   ```sh
   npm install
   ```
   
4. Create a PSQL user with CREATEDB PASSWORD
   ```js
   CREATE USER <name> WITH CREATEDB PASSWORD <'password'>;
   ```
   
5. Create a PSQL Database with the user in the last step as the owner
   ```js
   CREATE DATABASE <name> WITH OWNER <user>;
   ```
6. Create a .env file to access the backend based on the .env.example within the respective directory
      - input desired information into .env

7. Get into Pipenv
   ```sh
   pipenv shell
   ```

8. Migrate and seed models.
   ```sh
   flask db upgrade
   flask seed all
   ```
   
9. Start the backend in the backend directory
   ```sh
   flask run
   ```
   
10. Start the frontend in the frontend directory, this should open the project in your default browser. If not, navigate to http://localhost:3000
    ```sh
    npm start
    ```
   
11. From here you can create and sign in as a user and begin using Ani-Tracker


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/edwincarr/AniTracker](https://github.com/edwincarr/AniTracker)
