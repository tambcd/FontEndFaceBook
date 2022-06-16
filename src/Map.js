import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './css/map.css';
import Tooltip from './components/Tooltip';
import ReactDOM from 'react-dom';

mapboxgl.accessToken = 'pk.eyJ1IjoidHJhbnRhbSIsImEiOiJjbDFsd2k4ejAwMXk0M2ttemV0MmdiZnJhIn0.axnLnXJ3fkRN2KguxBTeuQ';

const Map = () => {
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [105.85, 21.0],
      zoom: 12.5
    });

    map.on('mouseenter', e => {
      if (e.features.length) {
        map.getCanvas().style.cursor = 'pointer';
      }
    });

    map.on('mouseleave', () => {
      map.getCanvas().style.cursor = '';
    });

    map.on('mousemove', e => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];

        const tooltipNode = document.createElement('div');
        ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map);
      }
    });

    return () => map.remove();
  }, []); 

  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;
