import {DateTime} from "luxon"
import config from './config'

const API_KEY = config.API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({...searchParams,appid:API_KEY});


    return fetch(url).then((res) => res.json()).then((data) => data);
};

const formatCurrentWeather = (data) => {
    const {
        coord: {lat,lon},
        main: {temp,feels_like, temp_min,temp_max,humidity},
        name,
        dt,
        sys: {country, sunrise, sunset},
        weather,
        wind: {speed}
    } = data

    const {main: details, icon} = weather[0]

    return {lat,lon,temp,feels_like,temp_min,temp_max,humidity,name,dt,country,sunrise,sunset,details,icon,speed};
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams
    ).then(formatCurrentWeather);

    return formattedCurrentWeather
};

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy' | Local Time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode};