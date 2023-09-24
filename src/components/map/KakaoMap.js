import {
    Skeleton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// kakao map
import { Map, MapMarker } from "react-kakao-maps-sdk";
import axios from 'axios';
import 'regenerator-runtime/runtime';


// ----------------------------------------------------------------------

KakaoMap.propTypes = {
    mapWidth: PropTypes.string,
    sgList: PropTypes.array,
};

const StyledMap = styled(Map)(({ mapWidth }) => ({
    width: mapWidth,
    height: "500px",
}));

export default function KakaoMap({ currIndex, setCurrIndex, isDesktop, setSideOpen, setIsListOpen, mapWidth, sgList, setSgList, mapMarkerList, setMapMarkerList, originSgList }) {

    const defaultLocation = { lat: 37.555008, lng: 126.971672 }
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(defaultLocation);

    const onClickMap = () => {
        console.log("onClickMap");
        setSgList(originSgList);
    }

    const onClickMarker = (mapMarkerInfo, index) => {
        setCurrIndex(index);

        const selMarkerLatLng = mapMarkerInfo.latlng;
        const filteredSgList = originSgList.filter((sg) => {
            return selMarkerLatLng.lat === sg.LatLng.lat && selMarkerLatLng.lng === sg.LatLng.lng;
        });

        setSgList(filteredSgList)

        if (isDesktop) {
            setSideOpen(true)
        } else {
            setIsListOpen(true)
        }
    }

    const setMapMarkerImage = () => {
        const updatedMapMarkerList = [...mapMarkerList];
        const image = {
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
            size: {
                width: 24,
                height: 35
            },
        }

        const targetIndex = updatedMapMarkerList.findIndex((mapMarker) => {
            console.log(mapMarker)
            return mapMarker.image?.src === image.src;
        });

        console.log(targetIndex)

        if (currIndex > -1) {
            updatedMapMarkerList[currIndex].image = image;
        }
        if (targetIndex !== -1) {
           delete updatedMapMarkerList[targetIndex].image
        }
        setMapMarkerList(updatedMapMarkerList);
    }

    useEffect(() => {
        getUserLocation();
    }, []);

    useEffect(() => {
        setMapMarkerImage();
    }, [currIndex]);


    // useEffect(() => {
    //     makeMapMarkers();
    // }, [sgList]);

    // 마커를 클릭하면  setSgList(data); data는 originSgList 중 해당 마커로 필터링된 데이터여야함

    const getUserLocation = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });
        } catch (error) {
            console.error('Error getting location:', error);
            setLocation(defaultLocation);
        }
        setIsLoading(false);
    };


    return (
        <>
            {
                isLoading ? (
                    <Skeleton sx={{ height: 500 }} animation="wave" variant="rectangular" />
                ) : (
                    <StyledMap center={location} mapWidth={mapWidth} level={9}
                        onClick={() => onClickMap()}
                    >
                        {/* <MapMarker position={location} /> */}

                        {mapMarkerList.map((mapMarkerInfo, index) => (
                            mapMarkerInfo.image ? (
                                <MapMarker
                                    key={`${mapMarkerInfo.title}-${mapMarkerInfo.latlng}`}
                                    position={mapMarkerInfo.latlng}
                                    image={mapMarkerInfo.image}
                                    title={mapMarkerInfo.title}
                                    onClick={() => onClickMarker(mapMarkerInfo, index)}
                                />
                            ) : (
                                <MapMarker
                                    key={`${mapMarkerInfo.title}-${mapMarkerInfo.latlng}`}
                                    position={mapMarkerInfo.latlng}
                                    title={mapMarkerInfo.title}
                                    onClick={() => onClickMarker(mapMarkerInfo, index)}
                                />
                            )

                        ))}
                    </StyledMap>
                )
            }
        </>
    );
}

