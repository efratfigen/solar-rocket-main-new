import { Box, CardMedia, Container, Typography } from "@mui/material";
import { ForecastDays } from "../graphql/schema";
import moment from 'moment';


const WeatherDay = (data: any): JSX.Element => {
    const day: ForecastDays = data.day;


    return(
        <>
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign:"center", padding: '10px' }}>
            <p>{moment(day.date).format('ddd DD/MM')}</p>
            <CardMedia
                component="img"
                sx={{ width: 50, margin:'0 auto' }}
                image={day.day.condition.icon}
                alt={day.day.condition.text} />
            <Typography variant="h4">
                {day.day.avgtemp_c} &deg;
            </Typography>
        </Box>
        </>
    )
}

export default WeatherDay;