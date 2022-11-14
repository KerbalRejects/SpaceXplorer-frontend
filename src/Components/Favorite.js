import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';


const favorite = () => {
    const {user} = useAuth0();
    const postConfig = {
        email: `${user.email}`,
        isFavorited: true,
        favorites: {
            location: `${this.state.locations[0][0].locationName}`,
            date: `${this.state.locations[0][0].cacheDate}`,
            astroData: {
                    astroMap: `${this.state.locations[2].imageUrl}`,
                    lat: `${this.state.locations[0][0].locationLat}`, 
                    lon: `${this.state.locations[0][0].locationLon}`,
                    },
            weather: {
                    desc: `${this.state.locations[3][0].description}`, 
                    lowTemp: `${this.state.locations[3][0].min_temp}`, 
                    highTemp: `${this.state.locations[3][0].high_temp}`
                    },
            comment: ''
        }
      } 
    console.log(postConfig)
    return postConfig
}

export default favorite;