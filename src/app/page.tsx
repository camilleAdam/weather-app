"use client"
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios"
import {format, parseISO} from "date-fns"
import {fr, enGB } from "date-fns/locale";
import Container from "@/components/Container";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import WeatherIcon from "@/components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import WeatherDetails from "@/components/WeatherDetails";
import { meterToKilometers } from "@/utils/meterToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import ForecastWeatherDetails from "@/components/ForcastWeatherDetails";
 

const locales = {fr, enGB};
export interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecast[];
  city: CityInfo;
}

export interface WeatherForecast {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface CityInfo {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export default function Home() {

  const { isLoading, error, data } = useQuery<WeatherData>("repoData", async() => 
    {
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=bois blancs&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=40&lang=fr`);
      return data;
    }
  )
    const firstData = data?.list[0]

    const uniquesDates = [
      ...new Set(
        data?.list.map(
          (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
        )
      )
    ];
    const firstDateForEachDate = uniquesDates.map((date) => {
      return data?.list.find((entry) => {
        const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
        const entryTime = new Date(entry.dt * 1000).getHours();
        return entryDate === date && entryTime >= 6;
      });
    });

    function convertTimeToHuman(date: number) {
      return date * 1000;
    }
    const timestampRise = data?.city.sunrise ? data.city.sunrise * 1000 : 1709102136;
    const timestampSet = data?.city.sunset ? data.city.sunset * 1000 : 1709141136;
    if(isLoading) {
      return (
        <div className="flex items-center min-h-screen justify-center">
          <p className="animate-bounce">Chargement...</p>
        </div>
      )
    }
  return (
  <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
    <Navbar {...(data)}/>
    <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
      {/* Today's data */}
      <section className="space-y-4">
        <div className="space-y-2">
          <h2 className="flex gap-1 text-2xl items-end">
            <p className="capitalize">{format(parseISO(firstData?.dt_txt ?? ''), 'EEEE', {locale: fr})}</p>
            <p className="text-lg">{format(parseISO(firstData?.dt_txt ?? ''), '(dd.MM.yyyy)', {locale: fr})}</p>
          </h2>
          <Container className=" gap-10 px-6 items-center">
            <div className=" flex flex-col px-4">
              <span className="text-5xl">
                {convertKelvinToCelsius(firstData?.main.temp ?? 0)}°
              </span>
              <p className=" text-xs space-x-1 whitespace-nowrap">
                <span> Ressenti </span>
                <span className="">
                {convertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°
              </span>
              </p>
              <p className="text-xs space-x-2">
                <span>
                  {convertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°↓ {" "}
                </span>
                <span>
                  {" "}
                  {convertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°↑
                </span>
              </p>
            </div>
            <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
              { data?.list.map((d, i)=> 
                <div key={i} className="flex flex-col justify-between gap-2 items-center text-xs font-semibold">
                  <p className="whitespace-nowrap">{format(parseISO(d.dt_txt), "H:mm", {locale: fr})}</p>  {/* h = 11am pm / H = 23*/}
                  <WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)}/>
                  <p>{convertKelvinToCelsius(d.main.temp ?? 0)}°</p>
                </div>
              )}
            </div>
          </Container>
        </div>
        <div className="flex gap-4 ">
          <Container className="w-fit justify-center flex-col px-4 items-center">
            <p className="capitalize text-center">{firstData?.weather[0].description}</p>
            <WeatherIcon iconName={getDayOrNightIcon(firstData?.weather[0].icon ?? '', firstData?.dt_txt ?? '')}/>
          </Container>
          <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
                <WeatherDetails 
                visibility={meterToKilometers(firstData?.visibility ?? 0)} 
                humidity={`${firstData?.main.humidity} %`} 
                windSpeed={convertWindSpeed(firstData?.wind.speed ?? 0)} 
                airPressure={`${firstData?.main.pressure} hPa`} 
                sunrise={format(timestampRise ?? 1702949452, "H:mm", {locale:fr})}
                sunset={format(timestampSet ?? 1702517657, "H:mm", {locale:fr})} />
          </Container>
        </div>
      </section>

      <section className="flex w-full flex-col gap-4">
        <p className="text-2xl">Prévisions (7 jours)</p>
        {firstDateForEachDate.map((d, i)=> (
          <ForecastWeatherDetails key={i}
            description = {d?.weather[0].description ?? ""}
            weatherIcon = {d?.weather[0].icon ?? "01d"}
            date = {format(parseISO(d?.dt_txt ?? ""), "dd.MM", {locale:fr})}
            day = {format(parseISO(d?.dt_txt ?? ""), "EEEE", {locale: fr})}
            feels_like= {d?.main.feels_like ?? 0}
            temp= {d?.main.temp ?? 0}
            temp_max= {d?.main.temp_max ?? 0}
            temp_min= {d?.main.temp_min ?? 0}
            airPressure= {`${d?.main.pressure} hPa`}
            humidity= {`${d?.main.humidity} %`}
            sunrise= {format(convertTimeToHuman(data?.city.sunrise ?? 1702949452), "H:mm")}
            sunset= {format(convertTimeToHuman(data?.city.sunset ?? 1702517657), "H:mm")}
            visibility= {`${meterToKilometers(d?.visibility ?? 0)}`}
            windSpeed= {`${convertWindSpeed(d?.wind.speed ?? 0)}`}
          />
        ))}
        
      </section>
    </main>
  </div>)
}
