import {useEffect, useState} from "react";
import {base_url} from "../utils/constants.js";
import luke1 from '../assets/Luke1.jpg'

const AboutMe = () => {

    const [aboutMeInfo, setAboutMe] = useState(() => {
        if (localStorage.getItem('AboutMe')) {
            const hero = JSON.parse(localStorage.getItem('AboutMe'))
            const dateNow = Date.now();
            const _30days = 1000 * 60 * 60 * 24 * 30;

            if (dateNow - hero.timestamp <= _30days) {
                return hero.payload
            }
        }
    });

    useEffect(() => {
        if (!aboutMeInfo) {
            fetch(`${base_url}/v1/peoples/1`)
            .then(res => res.json())
            .then(data => {
                const info = {
                    name: data.name,
                    gender: data.gender,
                    skin_color: data.skin_color,
                    hair_color: data.hair_color,
                    height: data.height,
                    eye_color: data.eye_color,
                    mass: data.mass,
                    birth_year: data.birth_year
                }
                setAboutMe(info)
                localStorage.setItem('AboutMe', JSON.stringify({
                    payload: info,
                    timestamp: Date.now(),
                }));
            })
            .catch(() => setAboutMe('Error loading about me'));
        }
    }, [aboutMeInfo])

    if (typeof aboutMeInfo === 'object') {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='far-galaxy col-sm-7'>
                        <p>Name: {aboutMeInfo.name}</p>
                        <p>Gender: {aboutMeInfo.gender}</p>
                        <p>Skin color: {aboutMeInfo.skin_color}</p>
                        <p>Hair color: {aboutMeInfo.hair_color}</p>
                        <p>Height: {aboutMeInfo.height}</p>
                        <p>Eye color: {aboutMeInfo.eye_color}</p>
                        <p>Mass: {aboutMeInfo.mass}</p>
                        <p>Birth year: {aboutMeInfo.birth_year}</p>
                    </div>
                    <div className='col-sm-5'>
                        <img src={luke1} alt='luke' style={{ width: '300px', height: 'auto', borderRadius: '5%' }}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className={'far-galaxy'}>
                <span className={'spinner-border sm spinner-border'}></span>
                <span className={'spinner-grow spinner-grow-sm'}>Loading</span>
                <p>{aboutMeInfo}</p>
            </div>
        )
    }


}

export default AboutMe;