import { useEffect } from "react";
import { useMap } from "react-leaflet";

const FlyToMaker = ({ position, zoomLevel }: any) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            const zoom = zoomLevel ?? map.getZoom();
            map.flyTo(position, zoom, {
                duration: 1,
            });
        }
    }, [map, position, zoomLevel]); // if any of these value change, perform the side effects, i.e execute the funtion defined inside
    return null;
};


export default FlyToMaker;   