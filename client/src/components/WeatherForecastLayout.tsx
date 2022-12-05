import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import moment from 'moment';
import { ForecastCurrent, WeatherForecast, ForecastLocation, ForecastForecast } from "../graphql/schema";
import WeatherDay from "./WeatherDay";


const WeatherForecastLayout = (data: any): JSX.Element => {
    const weatherData: WeatherForecast = data.weatherData;
    const currentRes: ForecastCurrent  = weatherData.current;
    const locationRes: ForecastLocation = weatherData.location;
    const forecastRes: ForecastForecast = weatherData.forecast?.forecastday;

    return(
        <>
        <Card sx={{ width: 650, height: 270, display: 'flex', justifyContent:"space-between", margin: "40px auto"}}>
            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:"space-between" }}>
                <CardHeader
                    title={moment(locationRes?.localtime).format('llll')}
                    subheader= {locationRes?.name + ', '+  locationRes?.country}
                />
                <CardContent>
                    <Typography variant="h4" noWrap>{currentRes?.temp_c} &deg;C</Typography>
                    <Typography variant="h5" noWrap>{currentRes?.condition.text}</Typography>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 300, height: 300 }}
                image={currentRes?.condition.icon}
                alt={currentRes?.condition.text} />
        </Card>
            
        <Card sx={{ display: 'flex' ,justifyContent:"space-around", margin: "40px auto", width: 800}}>
            {forecastRes &&
                Object.entries(forecastRes).map(([key, _day]) => {
                    return (<WeatherDay day={_day} />);
                })
            }
        </Card> 
        </>
    )
}

export default WeatherForecastLayout;