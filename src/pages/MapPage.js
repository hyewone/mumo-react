import { ConstructionOutlined } from '@mui/icons-material';
import {
  Card, Container, Grid, Stack, Typography
} from '@mui/material';
// @mui
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import BottomSheet from 'src/components/bottomSheet/BottomSheet';
import KakaoMap from 'src/components/map/KakaoMap';
import MapSideList from 'src/components/mapList/MapSideList';
// hooks
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------

export default function MapPage() {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');

  const apiUrl = process.env.REACT_APP_API_URL
  const KAKAO_API_KEY = process.env.REACT_APP_OAUTH_CLIENT_ID_KAKAO

  const [originSgList, setOriginSgList] = useState([]);
  const [sgList, setSgList] = useState([]);
  const [mapMarkerList, setMapMarkerList] = useState([]);
  const [isSideOpen, setSideOpen] = useState(true);
  const [isListOpen, setIsListOpen] = useState(false);
  const [kakaoMapWidth, setKakaoMapWidth] = useState('calc(100% * 7 / 12)'); // 초기 너비 설정
  const [currIndex, setCurrIndex] = useState(-1);

  const getApiUrl = (request) => {
    return apiUrl + request
  }

  const fetchAllData = async () => {
    fetchSgList()
  }

  const fetchSgList = async () => {
    try {
      const response = await axios.get(getApiUrl('/api/v1/stageGreetings'));
      let data = response.data.stageGreetings
      data = data == null ? [] : data

      const latLngResult = await makeMapMarkers(data);

      setOriginSgList(latLngResult);
      setSgList(latLngResult);
    } catch (error) {
      console.error('Error fetching stageGreetings:', error);
    }
  };

  const makeMapMarkers = async (data) => {
    const newMapMarkers = new Set();
    // const uniqueLatLngs = new Set();
    await Promise.all(
      data.map(async (sg) => {
        const latLng = await getLatLng(`${sg.CinemaType} ${sg.Theater}`);
        if (!(latLng.lat === 0 && latLng.lng === 0)) {
          const mapMarker = {
            title: `${sg.CinemaType} ${sg.Theater}`,
            latlng: latLng,
          };
          // newMapMarkers.push(mapMarker);
          newMapMarkers.add(JSON.stringify(mapMarker));
          sg.LatLng = latLng;
        }
      })
    );
    const mapMarkerArray = Array.from(newMapMarkers).map((jsonStr) => JSON.parse(jsonStr));
    
    console.log(mapMarkerArray)
    setMapMarkerList(mapMarkerArray);

    return data;
  };

  const getLatLng = async (theater) => {
    // const apiUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(theater)}`;
    const apiUrl = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(theater)}`;

    let latitude = 0;
    let longitude = 0;

    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    });

    const data = response.data;

    if (data.documents.length > 0) {
      // 결과에서 첫 번째 위치 정보를 가져옴
      const location = data.documents[0];
      latitude = location.y;
      longitude = location.x;

      // MapMarker 데이터에 넣어준다.
      // console.log(`주소: ${theater}`);
      // console.log(`위도: ${latitude}`);
      // console.log(`경도: ${longitude}`);
    } else {
      console.log('주소를 찾을 수 없습니다.');
    }
    return { lat: latitude, lng: longitude }
  }


  useEffect(() => {
    fetchAllData()
  }, []);

  // useEffect(() => {
  // makeMapMarkers();
  // }, [originSgList]);

  useEffect(() => {
    console.log(sgList)
  }, [sgList]);

  useEffect(() => {
    const newWidth = isSideOpen ? 'calc(100% * 7 / 12)' : '100%';
    setKakaoMapWidth(newWidth);
  }, [isSideOpen]);


  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          무대인사 지도
        </Typography> */}

        <BottomSheet
          originSgList={originSgList}
          sgList={sgList}
          setSgList={setSgList}
          isDesktop={isDesktop}
          isSideOpen={isSideOpen}
          setSideOpen={setSideOpen}
          isListOpen={isListOpen}
          setIsListOpen={setIsListOpen}
          setCurrIndex={setCurrIndex}
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Container>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} ml={1}>
                <Typography variant="h4" gutterBottom>
                  무대인사 지도
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} ml={1}>
                <Typography variant="h4" gutterBottom>
                  필터
                </Typography>
              </Stack>
              <Grid item xs={12} md={12} lg={12}>
                <Card
                // style={{ border: '0.7px solid rgba(0, 0, 0, 0.2)' }}
                >
                  <KakaoMap width={kakaoMapWidth}
                    currIndex={currIndex}
                    setCurrIndex={setCurrIndex}
                    originSgList={originSgList}
                    isDesktop={isDesktop}
                    setSideOpen={setSideOpen}
                    setIsListOpen={setIsListOpen}
                    sgList={sgList}
                    setSgList={setSgList}
                    mapMarkerList={mapMarkerList}
                    setMapMarkerList={setMapMarkerList} />
                  <MapSideList
                    sgList={sgList}
                    isDesktop={isDesktop}
                    isSideOpen={isSideOpen}
                    setSideOpen={setSideOpen}
                  />
                </Card>
              </Grid>
            </Container>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Item Orders" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
