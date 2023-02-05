/* eslint-disable jsx-a11y/iframe-has-title */
import {useRef, useState } from "react";
import { StandaloneSearchBox, LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import {TextField, Box, Card, CardContent, Typography} from '@mui/material';


const GoogleMapComponent = () => {
    const inputRef = useRef();
    const [placeData, setPlaceData ] = useState({});

    const handlePlaceChanged = () => { 
        const [ place ] = inputRef.current.getPlaces();
        if(place) { 
            setPlaceData(place)
            console.log(place, "place")
            console.log(place.geometry.location.lat())
            console.log(place.geometry.location.lng())
        } 
    }
    return (
        <Box sx={{ width: 1 }}>
        <LoadScript googleMapsApiKey='AIzaSyCcQEeSiAI7R13jWkb3fRi_Mh6zTdc7_tQ' libraries={["places"]}>
                <StandaloneSearchBox
                    onLoad={ref => inputRef.current = ref}
                    onPlacesChanged={handlePlaceChanged}
                >
                    <Box m='1rem'>
                    <TextField
                        type="text"
                        className="form-control"
                        placeholder="Enter Location"
                        style={{width: '560px'}}
                    />
                    </Box>
                </StandaloneSearchBox>
        </LoadScript>
        <Box display='flex'>
            <Box sx={{ width: 0.5 }} >
            <Card mt='2rem'>
            <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Location
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                   {placeData?.formatted_address}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {placeData?.name}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    <a href={placeData?.website} target="_blank" rel="noreferrer">{placeData?.website}</a>
            </Typography>
            </CardContent>
            </Card>
            </Box>
            <Box sx={{ width: 0.5 }} >
            <iframe src={placeData?.url} width="100%" height="500" frameborder="0"></iframe>
            </Box>
            </Box>
        </Box>
    );
};

export default GoogleMapComponent;
