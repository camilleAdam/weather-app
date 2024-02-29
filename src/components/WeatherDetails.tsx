import React from "react";
import Container from "./Container";
import { LuEye, LuDroplet } from "react-icons/lu";
import { GiWindsock } from "react-icons/gi";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { FiWind } from "react-icons/fi";

type Props = {}

export interface WeatherDetailsProps {
    visibility : string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function WeatherDetails(props : WeatherDetailsProps) {
    return (
        <>
        <SingleWeatherDetails information={"Visibilité"} icon={<LuEye/>} value={props.visibility}></SingleWeatherDetails>
        <SingleWeatherDetails information={"Humidité"} icon={<LuDroplet/>} value={props.humidity}></SingleWeatherDetails>
        <SingleWeatherDetails information={"Vitesse du vent"} icon={<FiWind />} value={props.windSpeed}></SingleWeatherDetails>
        <SingleWeatherDetails information={"Pression de l'air"} icon={<ImMeter />} value={props.airPressure}></SingleWeatherDetails>
        <SingleWeatherDetails information={"Lever du soleil"} icon={<FiSunrise/>} value={props.sunrise}></SingleWeatherDetails>
        <SingleWeatherDetails information={"Coucher du soleil"} icon={<FiSunset/>} value={props.sunset}></SingleWeatherDetails>
        </>
    )
}

export interface SingleWeatherDetailsProps {
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDetails(props: SingleWeatherDetailsProps) {
    return (
        <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
            <p className="whitespace-nowrap">{props.information}</p>
            <div className="text-3xl">{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}