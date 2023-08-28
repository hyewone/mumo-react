//
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
// kakao map
import { Map, MapMarker } from "react-kakao-maps-sdk";


// ----------------------------------------------------------------------

KakaoMap.propTypes = {
    mapWidth: PropTypes.string,
};

const StyledMap = styled(Map)(({ mapWidth }) => ({
    width: mapWidth,
    height: "500px",
}));

export default function KakaoMap({ mapWidth }) {
    return (
        <StyledMap center={{ lat: 33.5563, lng: 126.79581 }} mapWidth={mapWidth}>
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }} />
            {/* <div style={{ color: "#000" }}>Hello World!</div> */}
        </StyledMap>
    );
}

