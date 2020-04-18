import React, {Component} from "react";
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {Link} from "react-router-dom";

export class MapPage extends Component {
    constructor(props) {
        super(props);
        this.coordinates = [50.505, -29.09]
    }

    render(props) {
        if (this.props.latitude && this.props.longtitude) {
            return (
                <div className='map-container'>
                    <Link className="backlink" to="/">Back to main</Link>
                    <Map center={[this.props.latitude, this.props.longtitude]} zoom={5}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        <Marker position={[this.props.latitude, this.props.longtitude]}>
                            <Popup>{this.props.description}</Popup>
                        </Marker>
                    </Map>
                </div>
            )
        } else {
            return (
                <div className='map-container'>
                    <Link className="backlink" to="/">Back to main</Link>
                    <Map center={this.coordinates} zoom={2.4}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                    </Map>
                </div>
            )
        }
    }
}