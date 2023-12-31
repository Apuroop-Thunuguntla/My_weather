import Head from 'next/head';
import axios from 'axios';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Weather from '../components/Weather';
import Spinner from '../components/Spinner';
import DailyForecast from '../components/DailyForecast'; // Import your DailyForecast component here

export default function Home() {
  const [zipcode, setZipcode] = useState('');
  const [countryCode, setCountryCode] = useState('us');
  const [weather, setWeather] = useState({});
  const [dailyForecast, setDailyForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Fetch current weather data
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},${countryCode}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      const currentWeatherResponse = await axios.get(currentWeatherUrl);
      setWeather(currentWeatherResponse.data);

      // Fetch daily forecast data
      const dailyForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?zip=${zipcode},${countryCode}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      const dailyForecastResponse = await axios.get(dailyForecastUrl);
      setDailyForecast(dailyForecastResponse.data.list); // Store daily forecasts

      console.log(currentWeatherResponse.data);
      // console.log(dailyForecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setZipcode('');
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={{ background: '#e6e6e6', color: '#000000', height: '100vh' }}>
        <Head>
          <title>Weather Today</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        {/* Navigation bar */}
        <nav style={{ background: '#202854', color: '#ffffff', padding: '10px' }}>
          <div className='relative flex justify-between  max-w-[500px] w-full m-auto pt-4 px-4 text-white '>
            <p className="text-4xl mr-7">My&nbsp;Weather</p>
            <form
              onSubmit={fetchWeather}
              className='flex w-full max-w-[400px] m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl '
              style={{ background: '#ffffff' }}
            >
              <div className="flex-grow">
                <input
                  onChange={(e) => setZipcode(e.target.value)}
                  className='bg-transparent border-none text-black focus:outline-none text-2xl w-full'
                  type='text'
                  placeholder='Enter Zipcode'
                />
              </div>
              <button type='submit' style={{ background: '#ffffff' }}>
                <BsSearch size={-1} style={{ color: '#000000' }} />
              </button>
            </form>
          </div>
        </nav>

        {/* Weather */}
        {weather.main && <Weather data={weather} />}
        
        {/* Daily Forecast */}
        {dailyForecast.length > 0 && <DailyForecast data={dailyForecast} />}
       
      </div>
    );
  }
}
