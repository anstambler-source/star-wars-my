import {base_url} from "../utils/constants.js";
import {useEffect, useState} from "react";

const OpeningCrawl = () => {

    const [openingCrawl, setOpeningCrawl] = useState();

    useEffect(() => { // srabotaet posle togo kak komponent budet smontirovan
        const episode = Math.floor(Math.random() * 6) + 1
        fetch(`${base_url}/v1/films/${episode}`)
            .then(res => res.json())
            .then(data => setOpeningCrawl(data.opening_crawl))
            .catch(() => setOpeningCrawl('Error loading opening crawl'));
        // return () => console.log('Component OpeningCrawl unmounted'); // 4to delaem pri razmontirovanii komponenta
    }, []) // deps: [] - massiv zavisimosti, esli on pustoy to useEffect srabativaet odin raz posle montirovaniya komponentov(posle pervogo rendera)

    if (openingCrawl) {
        return (
            <p className="far-galaxy">{openingCrawl}</p>
        );
    } else {
        return (
            <p className="far-galaxy">
                <span className={'spinner-border sm spinner-border'}></span>
                <span className={'spinner-grow spinner-grow-sm'}>Loading</span>
            </p>
        )
    }


};

export default OpeningCrawl;