import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// kakao map
import { MapMarker, Map } from "react-kakao-maps-sdk";
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

KakaoMap.propTypes = {
//   data: PropTypes.array,
};

export default function KakaoMap() {
      return (
        <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: "100%", height: "500px" }}>
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}/>
                {/* <div style={{ color: "#000" }}>Hello World!</div> */}
        </Map>
    );
    }

