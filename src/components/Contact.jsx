import {useEffect, useState} from "react";

const Contact = () => {
    const [contactPlanetInfo, setContactPlanetInfo] = useState([]);

    useEffect(() => {
        const infoPlanetsFromLocalStorage = localStorage.getItem('infoPlanetsFromLocalStorage');
        const _30days = 1000 * 60 * 60 * 24 * 30;
        const planetsCreationTime = localStorage.getItem('planetsCreationTime');
        const dateNow = Date.now();

        if (infoPlanetsFromLocalStorage && dateNow - planetsCreationTime - _30days <= 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setContactPlanetInfo(JSON.parse(infoPlanetsFromLocalStorage))
        }
        else {fetch('https://sw-info-api.herokuapp.com/v1/planets')
            .then(res => res.json())
            .then(data => {
                const arrPlanets = data.map(item => item.name)
                setContactPlanetInfo(arrPlanets)
                localStorage.setItem('infoPlanetsFromLocalStorage', JSON.stringify(arrPlanets))
                localStorage.setItem('planetsCreationTime', Date.now())
            })
            .catch(() => setContactPlanetInfo(['Error loading planets']))
        }
    }, [])

    return (
        <div className="containerContact">
            <form action="action_page.php">

                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>

                <label htmlFor="planet">Planet</label>
                <select id="planet" name="planet">
                    {contactPlanetInfo.map(planet => <option value={planet} key={planet}>{planet}</option>)}
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