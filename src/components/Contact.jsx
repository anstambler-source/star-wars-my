import '../Contact.css'
import {useEffect, useState} from "react";

const Contact = () => {
    const [contactPlanetInfo, setContactPlanetInfo] = useState(() => {
        if (localStorage.getItem("Contact")) {
            const planets = JSON.parse(localStorage.getItem('Contact'))
            const dateNow = Date.now();
            const _30days = 1000 * 60 * 60 * 24 * 30;

            if (dateNow - planets.timestamp <= _30days) {
                return planets.payload;
            }
        }
    });

    useEffect(() => {
        if (!contactPlanetInfo) {        
            fetch('https://sw-info-api.herokuapp.com/v1/planets')
            .then(res => res.json())
            .then(data => {
                const arrPlanets = data.map(item => item.name)
                setContactPlanetInfo(arrPlanets)
                localStorage.setItem('Contact', JSON.stringify({
                    payload: arrPlanets,
                    timestamp: Date.now(),
                }))
            })
            .catch(() => setContactPlanetInfo(['Error loading planets']))
        }
    }, [contactPlanetInfo])

    return (

    <form className="container" onSubmit={e => {
        e.preventDefault();
    }}>
        <label>First Name
            <input type="text" name="firstname" placeholder="Your name.."/>
        </label>
        <label>Last Name
            <input type="text" name="lastname" placeholder="Your last name.."/>
        </label>
        <label>Planet
            <select name="planet">
                {contactPlanetInfo?.map(planet => <option value={planet} key={planet}>{planet}</option>)}            </select>
        </label>

        <label>Subject
            <textarea name="subject" placeholder="Write something.."></textarea>
        </label>
        <button type="submit">Submit</button>
    </form>
    )
}

export default Contact;