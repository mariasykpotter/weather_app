import React, {Component} from 'react'
import '../font/Rimouski.css'
import '../index.css';

export class MainPage extends Component {
    render(props) {
        if (this.props.icon && this.props.temp) {
            return (
                <div className="container">
                    <div className="app-title">
                        <p>Weather</p>
                    </div>
                    <button className="but" onClick={this.props.Celsius}>Celsius</button>
                    <button className="but" onClick={this.props.Kelvin}>Kelvin</button>
                    <button className="but" onClick={this.props.Fahrenheit}>Fahrenheit</button>
                    <div className="weather-container">
                        <div className="weather-icon">
                            <img src={this.props.icon + '.png'} alt='weather icon'/>
                        </div>
                        <div className="temperature-value">
                            <p>{this.props.temp}<span>{this.props.scale}</span></p>
                        </div>
                        <br/>
                        <div className="temperature-description">
                            <p>{this.props.description}</p>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col-xs-3 weather-info">
                                <span>Wind</span>
                                <br/>
                                <span>m/s</span>
                                <h2>{this.props.wind}</h2>
                            </div>
                            <div className="col-xs-3 weather-info">
                                <span>Pressure</span>
                                <br/>
                                <span>millibar</span>
                                <h2>{this.props.pressure}</h2>
                            </div>
                            <div className="col-xs-3 weather-info">
                                <span>Humidity</span>
                                <br/>
                                <span>%</span>
                                <h2>{this.props.humidity}</h2>
                            </div>
                            <div className="col-xs-3 weather-info">
                                <span>Clouds</span>
                                <br/>
                                <span>number</span>
                                <h2>{this.props.num_clouds}</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-6 weather-info">
                                <span>Sunrise</span>
                                <br/>
                                <span>{this.props.sunrise}</span>
                            </div>
                            <div className="col-xs-6 weather-info">
                                <span>Sunset</span>
                                <br/>
                                <span>{this.props.sunset}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="app-title">
                        <p>Weather</p>
                    </div>
                    <div className="weather-container">
                        <div className="weather-icon">
                            <img src='unknown.png' alt='unknown weather'/>
                        </div>
                        <div className="temperature-value">
                            <p>-°<span>C</span></p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}