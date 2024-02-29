import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import React from "react";
import Container from "./Container";
import WeatherDetails, { WeatherDetailsProps } from "./WeatherDetails";
import WeatherIcon from "./WeatherIcon";

export interface ForecastWeatherDetails extends WeatherDetailsProps {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
}

export default function ForecastWeatherDetails(props: ForecastWeatherDetails) {
    return (
        <Container className="gap-4">
            <section className="flex gap-4 items-center px-4">
                <div className="flex flex-col gap-1 items-center">
                    <WeatherIcon iconName={props.weatherIcon} />
                    <p>{props.date}</p>
                    <p className="text_sm capitalize">{props.day}</p>
                </div>
                <div className="flex flex-col px-4">
                    <span className="text-5xl">{convertKelvinToCelsius(props.temp ?? 0)}°</span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                        <span> Ressenti </span>
                        <span>{convertKelvinToCelsius(props.feels_like ?? 0)}°</span>
                    </p>
                    <p className="text-xs space-x-2">
                        <span>
                            {convertKelvinToCelsius(props?.temp_min ?? 0)}°↓ {" "}
                        </span>
                        <span>
                            {" "}
                            {convertKelvinToCelsius(props?.temp_max ?? 0)}°↑
                        </span>
                    </p>
                    <p className="capitalize">{props.description}</p>
                </div>
            </section>
            <section className="overflow-x-auto flex justify-between gap-4 px-4 w-full pr-10">
                <WeatherDetails {...props} />
            </section>
        </Container>
    )
}