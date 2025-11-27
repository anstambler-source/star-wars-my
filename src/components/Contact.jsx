import {useEffect, useState} from "react";
import Label from "./ui/Label.jsx";
import Button from "./ui/Button.jsx";

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

        <form className="flex flex-col gap-4" onSubmit={e => {
            e.preventDefault();
        }}>
            <Label inside={<input className='ml-10 brightness-200' type="text" name='fname' placeholder='Your first name...'/>}>First
                name</Label>
            <Label inside={<input className='ml-12 brightness-200' type="text" name='lname' placeholder='Your last name...'/>}>Last
                name</Label>
            <Label
                inside={<select className='ml-18 brightness-200' name="planet">{contactPlanetInfo?.map(planet => <option className='bg-gray-400' value={planet}
                                                                                                          key={planet}>{planet}</option>)}</select>}>Planets</Label>

            <Label inside={<textarea className='ml-18 brightness-200' name="subject"
                                     placeholder="Write something..."></textarea>}>Subject</Label>
            <Button classname={'w-fit mb-2 px-[12px] py-[20px] '}>Submit</Button>
        </form>
    )
}

export default Contact;