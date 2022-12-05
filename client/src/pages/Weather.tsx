import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import WeatherForecastLayout from "../components/WeatherForecastLayout";
import { WeatherForecast } from "../graphql/schema";
import { AppLayout } from "../layouts/AppLayout";

const Weather = (): JSX.Element => {

  const url = "http://api.weatherapi.com/v1/forecast.json";
  const key = "e27d0f69e46e4ed7930235636220312";


 
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState<WeatherForecast | {}>({});

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position: any) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await   fetch(`${url}?key=${key}&q=${lat},${long}&days=5`)
        .then(res => res.json())
        .then(result => {
          if(!result.error){
            setData(result);    
          }
        });
    }   
    fetchData();
  }, [lat,long])



  return (
    <AppLayout title="Weather">
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1">
          Weather
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:"center" }}>
          {(typeof data) ? (
            <WeatherForecastLayout weatherData={data}/>
          ): (
            <div></div>
          )}
        </Box>
      </Container>
    </AppLayout>
  );
};

export { Weather };
  function setErrMessage(arg0: string) {
    throw new Error("Function not implemented.");
}

