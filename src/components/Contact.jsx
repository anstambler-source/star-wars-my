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
        <div className="containerContact">
            <form action="action_page.php">

                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>

                <label htmlFor="planet">Planet</label>
                <select id="planet" name="planet">
                    {contactPlanetInfo?.map(planet => <option value={planet} key={planet}>{planet}</option>)}
                </select>

                <label htmlFor="subject">Subject</label>
                <textarea id="subject" name="subject" placeholder="Write something and may the Force be with you..."
                          style={{height: "200px"}}></textarea>

                <input type="submit" className={'btn btn-danger mx-1 border-warning'} value="Submit"/>

            </form>
        </div>
    )
}

export default Contact;