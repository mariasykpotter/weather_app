import React from 'react'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {MapPage} from './pages/MapPage'
import {MainPage} from './pages/MainPage'
import 'materialize-css'
import './font/Rimouski.css'
import './index.css'
import {Map, TileLayer} from "react-leaflet";

const API_key = "2050604e9f3fe6c87cc830e26c8f53dc";
const KELVIN = 273.15;
let scale = '°C';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            longitude: undefined,
            latitude: undefined,
            description: '',
            temp: undefined,
            pressure: undefined,
            humidity: undefined,
            city: undefined,
            country: undefined,
            sunrise: undefined,
            sunset: undefined,
            wind: undefined,
            num_clouds: undefined,
            icon: undefined,
            scale: '°C'
        })
    }

    ChangetoCelsius = () => {
        if (scale === '°K') {
            this.setState({temp: Math.round(((this.state.temp - KELVIN) * 100)) / 100});
        } else if (scale === '°F') {
            this.setState({temp: Math.round(((this.state.temp - 32) / 1.8) * 100) / 100});
        }
        scale = '°C'
    }

    ChangetoKelvin = () => {
        if (scale === '°C') {
            this.setState({temp: Math.round((this.state.temp + KELVIN) * 100) / 100});
        } else if (scale === '°F') {
            this.setState({temp: Math.round(((this.state.temp + 459.67) / 1.8) * 100) / 100});
        }
        scale = '°K'
    }

    ChangetoFahrenheit = () => {
        if (scale === '°C') {
            this.setState({temp: Math.round(((this.state.temp * 1.8 + 32) * 100)) / 100});
        } else if (scale === '°K') {
            this.setState({temp: Math.round(((this.state.temp * 1.8) - 459.67) * 100) / 100});
        }
        scale = '°F'
    }

    ConvertUnixtoTime(value) {
        var t = new Date(value * 1000);
        var formatted = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2);
        return formatted;
    }

    weatherMethod = async () => {
        if (this.state.city.length === 5 && Number.parseInt(this.state.city) + '' === this.state.city) {
            this.searchMethod = 'zip';
        } else {
            this.searchMethod = 'q';
        }
        const url = `https://api.openweathermap.org/data/2.5/weather?${this.searchMethod}=${this.state.city}&appid=${API_key}`;
        try {
            const response = await fetch(url)
                .then((res) => {
                    return res.json()
                }).then((data) => {
                    this.setState({
                        longitude: data.coord.lon,
                        latitude: data.coord.lat,
                        description: data.weather[0].description,
                        temp: Math.round(((data.main.temp - KELVIN) * 100)) / 100,
                        pressure: data.main.pressure,
                        humidity: data.main.humidity,
                        city: data.name,
                        country: data.sys.country,
                        sunrise: data.sys.sunrise,
                        sunset: data.sys.sunset,
                        wind: data.wind.speed,
                        icon: data.weather[0].icon,
                        num_clouds: data.clouds.all
                    })
                });
        } catch {
            alert('The city or zip code entered are incorrect')
        }
        console.log(this.state)
    }

    render() {
        return (
            <Router>
                <Route exact path="/">
                    <form style={{marginTop: 10}}>
                        <input style={{height: 35}}
                               placeholder="Enter city or zip-code"
                               id="city"
                               type="city"
                               name="city"
                               className="my-input"
                               onChange={e => this.setState({city: e.target.value})}
                               value={this.props.value}
                        />
                        <button
                            type={"button"}
                            className="my-button"
                            onClick={() => this.weatherMethod()}
                        >Search
                        </button>
                        <Link className="linka" to="/map">Look at map</Link>
                    </form>

                    <MainPage
                        sunrise={this.ConvertUnixtoTime(this.state.sunrise)}
                        sunset={this.ConvertUnixtoTime(this.state.sunset)}
                        num_clouds={this.state.num_clouds}
                        pressure={this.state.pressure}
                        wind={this.state.wind}
                        humidity={this.state.humidity}
                        temp={this.state.temp}
                        min_temp={this.state.min_temp}
                        max_temp={this.state.max_temp}
                        scale={scale}
                        Celsius={() => this.ChangetoCelsius()}
                        Kelvin={() => this.ChangetoKelvin()}
                        Fahrenheit={() => this.ChangetoFahrenheit()}
                        icon={this.state.icon}
                        description={this.state.description}
                    />
                </Route>
                <Route exact path="/map">
                    <MapPage longtitude={this.state.longitude} latitude={this.state.latitude}
                             description={this.state.description}/>
                </Route>
            </Router>
        )
    }
}

export default App
