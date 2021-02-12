import {Component, OnInit} from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import OSM from 'ol/source/OSM';
import Point from 'ol/geom/Point';
import Select from 'ol/interaction/Select';
import SourceVector from 'ol/source/Vector';
import Geolocation from 'ol/Geolocation';
import LayerVector from 'ol/layer/vector';
import {fromLonLat, transform} from 'ol/proj';
import {click} from 'ol/events/condition';
import TileLayer from 'ol/layer/Tile';
import Overlay from 'ol/Overlay';
import {Attribution, defaults as defaultControls} from 'ol/control';
import {ResizedEvent} from 'angular-resize-event';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Modify} from 'ol/interaction';
import {toStringHDMS} from 'ol/coordinate';
import {BackendService} from '../shared/backend.service';
import {Busdaten} from '../shared/busdaten';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import Icon from 'ol/style/Icon';


@Component({
  selector: 'bvg-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  busse: Busdaten[];
  map: Map;
  attribution: Attribution;
  // select: Select;
  view: View;
  iconFeature = [];
  zoom = 12;

  constructor(
    private cs: BackendService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    await this.readAll();

    for (const bus of this.busse) {
      if (bus.Pruefer == null) {
        const posLng = bus.Start_lng;
        const posLat = bus.Start_lat;
        const pos = fromLonLat([posLng, posLat]);
        const iconFeature = new Feature({
          geometry: new Point(pos),
          name: 'BusNr ' + bus.BusNr + ' Linie ' + bus.Buslinie,
        });
        this.iconFeature.push(iconFeature);
      }
    }

    const hbf = fromLonLat([13.36952418521105, 52.524976355769006]);
    this.view = new View({
      projection: 'EPSG:3857',
      center: hbf,
      zoom: this.zoom
    });

    const geolocation = new Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true,
      },
      tracking: true,
      projection: this.view.getProjection(),
    });

    const positionFeature = new Feature();
    positionFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'https://img.icons8.com/plasticine/65/000000/place-marker.png'
        }),
      }),
    );

    this.iconFeature.push(positionFeature);

    geolocation.on('change:position', (e) => {
      const coordinates = geolocation.getPosition();
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
      positionFeature.set('name', 'Meine Position');
    });

    const iconLayerSource = new SourceVector({
      features: this.iconFeature,
    });

    const iconLayer = new LayerVector({
      source: iconLayerSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: 'https://img.icons8.com/plasticine/65/000000/bus--v1.png'
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
      view: this.view,
    });

    const small = this.map && this.map.getSize() ? this.map.getSize()[0] < 1800 : true;
    if (this.attribution) {
      this.attribution.setCollapsible(small);
      this.attribution.setCollapsed(small);
    }


    const selectClick = new Select({
      condition: click,
      layers: [iconLayer]
    });
    selectClick.on('select', (e) => {
      console.log('click: selected features : ', e.target.getFeatures());
      if (e.target.getFeatures().array_.length > 0) {
        console.log(e.target.getFeatures().array_[0].geometryChangeKey_.target.flatCoordinates);
        console.log('----------');
        const coordinate = e.target.getFeatures().array_[0].geometryChangeKey_.target.flatCoordinates;
        const name = e.target.getFeatures().array_[0].values_.name;
        console.log(coordinate);
        const coordinateLoLa = transform(coordinate, 'EPSG:3857', 'EPSG:4326');
        console.log(coordinate);
        console.log(coordinateLoLa);

        const hdms = toStringHDMS((coordinate));
        console.log(hdms);
        content.innerHTML = '<p>' + name + '</p><code>' + hdms + '</code>';
        overlay.setPosition(coordinate);
      }
    });
    this.map.addInteraction(selectClick);

    const target = document.getElementById('map');

    const modify = new Modify({
      hitDetection: iconLayer,
      source: iconLayerSource,
    });
    modify.on(['modifystart', 'modifyend'], (evt) => {
      target.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
    });
    const overlaySource = modify.getOverlay().getSource();
    overlaySource.on(['addfeature', 'removefeature'], (evt) => {
      target.style.cursor = evt.type === 'addfeature' ? 'pointer' : 'pointer';
    });

    this.map.addInteraction(modify);

    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');
    const button = document.getElementById('popup-button');
    const button2 = document.getElementById('popup-button2');
    // jetzt click-Ereignis für Prüfen-Button
    if (button) {
      button.addEventListener('click', (e) => {
        console.log(content.innerHTML);
        const info = content.firstChild.textContent;
        const info1 = info.split(' ');
        const BusNr = parseInt(info1[1], 10);
        if (this.auth.isLoggedIn()) {
          const PrueferNr = this.auth.getPersonalNr();
          console.log(PrueferNr);
          console.log(BusNr);
          this.cs.setPrueferBus(PrueferNr, {BusNr}).subscribe(result => {
            console.log(result);
            closer.click();
          }, error => {
            console.log(error);
          });

        } else {
          console.log('nicht eingelogged');
          content.innerHTML = '<p>Sie müssen sich zunächst einloggen, um die Busse zur Meiner Liste hinzuzufügen!' +
            'Klicken Sie auf den Login-Button, um zur Login-Seite zu gelangen.</p>';
          button.classList.remove('btn-success');
          button.classList.add('btn-danger');
          button.innerText = 'Login';
          button.addEventListener('click', (e1) => this.toLogin());
        }

      });
    }
    if (button2) {
      button2.onclick = (evt) => {
        overlay.setPosition(undefined);
        button2.blur();
        return false;
      };
    }

    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    this.map.addOverlay(overlay);


    if (closer) {
      closer.onclick = (evt) => {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
      };
    }
  }

  checkSize(): void {
    const small = this.map ? this.map.getSize()[0] < 1800 : true;
    if (this.attribution) {
      this.attribution.setCollapsible(small);
      this.attribution.setCollapsed(small);
    }
  }

  onResize(event: ResizedEvent): void {
    // console.log('fired');
    this.checkSize();
  }

  readAll(): Promise<Observable<Busdaten[]>> {
    return new Promise(resolve => {
      let r: any;
      this.cs.getAll().subscribe(
        (response: Busdaten[]) => {
          // console.log(response);
          this.busse = response;
          r = response;
          // console.log(this.busse);
        },
        error => {
          console.log(error);
        },
        () => { resolve(r); }
      );  // subscribe ende
    }); // promise ende
  }

  toLogin(): void {
    console.log('toLogin() clicked');
    this.router.navigate(['../login'], { relativeTo: this.route });
  }
}
