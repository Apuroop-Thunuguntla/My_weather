import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Sun from '../public/Sun.svg';
import Blah from '../public/Blah.svg';
import Freezing from '../public/Freezing.svg';
import Hell from '../public/Hell.svg';
import Typhoon from '../public/Typhoon.svg';


const getWeatherType = (temperature) => {
   if (temperature >= 130) {
    return 'Hells Kitchen';
  } else if (temperature >= 120) {
    return 'Hot & Sunny';
  } else if (temperature >= 110) {
    return 'Beach Day';
  } else if (temperature >= 80) {
    return 'Mostly Sunny';
  } else if (temperature >= 54) {
    return 'Typhoony';
  } else if (temperature >= 50) {
    return 'Kinda Blah';
  } else if (temperature >= 0) {
    return 'Cold';
  } else {
    return 'Freezing';
  }
};



const Weather = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);




  const getWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case 'Clear':
        return <Image width="50" height="50" src={Sun} alt="Clear" />;
      case 'Clouds':
        return <Image width="50" height="50" src={Blah} alt="Clouds" />;
      case 'Rain':
        return <Image width="50" height="50" src={Freezing} alt="Rain" />;
      case 'Thunderstorm':
        return <Image width="50" height="50" src={Hell} alt="Thunderstorm" />;
      case 'Wind':
        return <Image width="50" height="50" src={Typhoon} alt="Wind" />;
      default:
        return null;
    }


    return getWeatherIcon;
  };
  const getWeatherIconForDay = (weatherTypeForDay) => {
    switch (weatherTypeForDay) {
      case 'Clear':
        return <Image width="50" height="50" src={Sun} alt="Clear" />;
      case 'Clouds':
        return <Image width="50" height="50" src={Blah} alt="Clouds" />;
      case 'Rain':
        return <Image width="50" height="50" src={Freezing} alt="Rain" />;
      case 'Thunderstorm':
        return <Image width="50" height="50" src={Hell} alt="Thunderstorm" />;
      case 'Wind':
        return <Image width="50" height="50" src={Typhoon} alt="Wind" />;
      default:
        return null;
    }
    return getWeatherIconForDay;
  };

  const roundVisibility = (visibility) => {
    return Math.round(visibility / 1609);
  };

  const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  const weatherType = getWeatherType(data.main.temp);
const getNextDayOfWeek = (date, dayOfWeek) => {
    const resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + ((dayOfWeek + (7 - date.getDay())) % 7));
    return resultDate;
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const tomorrow = getNextDayOfWeek(new Date(), 1);

  return (
    
    <div className="flex flex-col items-center justify-start mt-8">
      {/* Top */}
      
      <div className="flex flex-col sm:flex-row items-start justify-center gap-8">
        <div className="flex items-center mt-10 ">
        
         {weatherType === 'Hot & Sunny' && <Image width="150" height="150" src={Sun} alt="" />}
          {weatherType === 'Beach Day' && <Image width="150" height="150" src={Sun} alt="" />}
          {weatherType === 'Mostly Sunny' && <Image width="150" height="150" src={Sun} alt="" />}
          {weatherType === 'Kinda Blah' && <Image width="150" height="150" src={Blah} alt="" />}
          {weatherType === 'Freezing' && <Image width="150" height="150" src={Freezing} alt="" />}
          {weatherType === 'Hells Kitchen' && <Image width="150" height="150" src={Hell} alt="" />}
          {weatherType === 'Typhoony' && <Image width="150" height="150" src={Typhoon} alt="" />}
          {weatherType === 'Cold' && <Image width="150" height="150" src={Freezing} alt="" />}
        </div>
        <div className="text-center">
         <p className='text-4xl text-center '>{data.name.toUpperCase()}</p>
        <p className='text-9xl text-center mb-2 pl-12'>{data.main.temp.toFixed(0)}&#176;</p>
        
        
        <p className='text-5xl text-center mb-4' >{getWeatherType(data.main.temp)}</p>
      
        <p className='text-1xl text-center'>updated{' '}
            {currentTime.toLocaleTimeString(undefined, timeOptions)} {/* Display current time */}
          </p>
          
          <br></br>
          <div>
        <p className='text-1xl text-center'>
            Feels Like {data.main.feels_like.toFixed(0)}&#176;  | Wind {data.wind.speed.toFixed(0)}mph |Visibility {roundVisibility(data.visibility)}mi
          </p>
          </div>
        </div>
      </div>
      {/* Bottom */}
<div>
<p className='text-2xl '>Daily Forecast</p>
<div class="flex flex-col sm:flex-row">
{daysOfWeek.slice(2).map((day, index) => {
            const nextDay = getNextDayOfWeek(tomorrow, index + 2);
            const temperatureForDay =60;
            const weatherTypeForDay = getWeatherType(temperatureForDay); 
            const weatherIconForDay = getWeatherIconForDay(weatherTypeForDay);
            const dayOptions = { day: 'numeric' };
            const formattedDate = nextDay.toLocaleDateString('en-US', dayOptions);
            
            return(
    <ul key={index} class="list-none mx-auto my-12 flex flex-col sm:flex-row items-center gap-8">
        <li class="w-2/3 sm:w-5/6 flex flex-col items-center border border-solid border-slate-900 dark:border-black-100 bg-white py-6 px-2 rounded-3xl shadow-xl">
            <h2 class="text-black"><strong>{day},{formattedDate}</strong></h2>
            <div className="flex items-center mt-10 ">
        
         {weatherType === 'Hot & Sunny' && <Image width="150" height="150" src={Sun} alt="" />}
          {weatherType === 'Beach Day' && <Image width="150" height="150" src={Sun} alt="" />}
          {weatherType === 'Mostly Sunny' && <Image width="150" height="150" src={Sun} alt="" />}
          {weatherType === 'Kinda Blah' && <Image width="150" height="150" src={Blah} alt="" />}
          {weatherType === 'Freezing' && <Image width="150" height="150" src={Freezing} alt="" />}
          {weatherType === 'Hells Kitchen' && <Image width="150" height="150" src={Hell} alt="" />}
          {weatherType === 'Typhoony' && <Image width="150" height="150" src={Typhoon} alt="" />}
          {weatherType === 'Cold' && <Image width="150" height="150" src={Freezing} alt="" />}
        </div>
            <p className='text-5xl text-center mb-2 '>{data.main.temp.toFixed(0)}&#176;</p>
                        <p className='text-3xl text-center mb-4' >{getWeatherType(data.main.temp)}</p>
            
        </li>
    </ul>
            );
})}
</div>
</div>

    </div>
    
  );
};

export default Weather;
