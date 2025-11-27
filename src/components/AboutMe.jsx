import {useEffect, useState} from "react";
import {base_url} from "../utils/constants.js";
import luke1 from '../assets/Luke1.jpg'
import Text from "./ui/Text.jsx";

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
                        'Name': data.name,
                        'Gender': data.gender,
                        'Skin color': data.skin_color,
                        'Hair color': data.hair_color,
                        'Height': data.height,
                        'Eye color': data.eye_color,
                        'Mass': data.mass,
                        'Birth year': data.birth_year
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

    if (typeof aboutMeInfo !== 'object') {
        return (<Text>Loading...</Text>)}

        return (
            <div className='flex justify-around mt-2'>
                <div>
                    {Object.entries(aboutMeInfo).map(value => <Text key={value}>{value[0]}: {value[1]}</Text>)}
                </div>
                <div>
                    <img src={luke1} alt='luke' className='w-3/4 rounded-[5%]'/>
                </div>
            </div>
        )
}

export default AboutMe;