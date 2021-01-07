import {Component, OnInit} from '@angular/core';
import Geolocation from 'ol/Geolocation';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import OSM from 'ol/source/OSM';
import Point from 'ol/geom/Point';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import SourceVector from 'ol/source/Vector';
import LayerVector from 'ol/layer/vector';
import {fromLonLat} from 'ol/proj';
import Overlay from 'ol/Overlay';
import TileLayer from 'ol/layer/Tile';
import {Attribution, defaults as defaultControls} from 'ol/control';
import {ResizedEvent} from 'angular-resize-event';

@Component({
  selector: 'bvg-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: Map;
  attribution: Attribution;

  constructor() {
  }

  ngOnInit(): void {
    // const goerli = fromLonLat([13.373245, 52.553791]);
    const osloerStr = fromLonLat([13.373245, 52.556889]);
    const iconFeature1 = new Feature({
      geometry: new Point(osloerStr),
      name: 'Osloer Straße',
    });
    const flughafenTxl = [13.292312, 52.553791];
    const iconFeature2 = new Feature({
      geometry: new Point(fromLonLat(flughafenTxl)),
      name: 'Berlin Flughafen TXL'
    });
    const berlinerStr = [13.46668, 52.55933];
    const iconFeature3 = new Feature({
      geometry: new Point(fromLonLat(berlinerStr)),
      name: 'Berliner Allee'
    });
    const geradeStr = [13.428722297990495, 52.45219280171561];
    const iconFeature4 = new Feature({
      geometry: new Point(fromLonLat(geradeStr)),
      name: 'Gerade Straße'
    });
    const iconLayerSource = new SourceVector({
      features: [iconFeature1, iconFeature2, iconFeature3, iconFeature4]
    });
    const iconLayer = new LayerVector({
      source: iconLayerSource,
      // style for all elements on a layer
      style: new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'https://openlayers.org/en/v5.3.0/examples/data/icon.png'
        })
      })
    });
    this.attribution = new Attribution({
      collapsible: false,
    });
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        iconLayer
      ],
      controls: defaultControls({attribution: false}).extend([this.attribution]),
      target: 'map',
      view: new View({
        projection: 'EPSG:3857',
        center: osloerStr,
        zoom: 13
      })
    });
    console.log(this.map);
  }

  checkSize(): void {
    const small = this.map.getSize()[0] < 1800;
    this.attribution.setCollapsible(small);
    this.attribution.setCollapsed(small);
  }

  onResize(event: ResizedEvent): void {
    console.log('fired');
    this.checkSize();
  }

}
