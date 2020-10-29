import React, { useState } from 'react';

/* API CALL
ADRESS:http://api.openweathermap.org/data/2.5/
API KEY: d3f3eaece78a48f16fe92c8928ccce6d

*/

const api = {
  key: 'd3f3eaece78a48f16fe92c8928ccce6d',
  adress: 'http://api.openweathermap.org/data/2.5/',
  lang: 'ru',
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({}); // Погода там объект поэтому пишем {} для масс вывода


  const search = event => {
    if (event.key === 'Enter') {
      fetch(`${api.adress}weather?q=${city}&lang=${api.lang}&units=metric&appid=${api.key}`) // через базу запрос по city (base - сервис, key - ключ)
        .then(res => res.json())  // перевод в json для преобразования объекта в строку и в случае необходимости пересылки по сети
        .then(result => {
          setWeather(result);
          setCity('');
          console.log(result);
        });
    }
  }

  const Today = (d) => {
    let months = 
    ['Январь', 'Февраль','Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август','Сентябрь','Октябрь', 'Ноябрь','Декабрь'];
    let days = 
    ['Воскресенье', 'Понедельник', 'Вторник','Среда', 'Четверг','Пятница','Суббота'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className='app'>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            onChange={event1 => setCity(event1.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>



        {(typeof weather.main != 'undefined') ? (
     
     <div>
          <div className='location-box'>
            <div className='location'>{weather.name}</div>
            <div className='date'>{Today(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {(weather.main.temp)}°c
            </div>
            <div className='weather'>{weather.weather[0].main}</div> 
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}


export default App;