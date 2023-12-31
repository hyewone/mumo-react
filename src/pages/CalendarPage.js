import {
  Card, Container, Grid, Stack, Typography
} from '@mui/material';
// @mui
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import BottomSheet from 'src/components/bottomSheet/BottomSheet';
import UseCalendar from 'src/components/calendar/UseCalendar';
import MapSideList from 'src/components/mapList/MapSideList';
// hooks
import { format } from 'date-fns';
import useResponsive from '../hooks/useResponsive';

// ----------------------------------------------------------------------

export default function CalendarPage() {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');

  const apiUrl = process.env.REACT_APP_API_URL

  const [originSgList, setOriginSgList] = useState([]);
  const [sgList, setSgList] = useState([]);
  const [calDataList, setCalDataList] = useState([]);
  const [isSideOpen, setSideOpen] = useState(true);
  const [isListOpen, setIsListOpen] = useState(false);

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

      await makeCalDatas(data);
      setOriginSgList(data);
      setSgList(data);
    } catch (error) {
      console.error('Error fetching stageGreetings:', error);
    }
  };

  const makeCalDatas = async (data) => {
    const newCalDatas = new Set();

    await Promise.all(
      data.map(async (sg, idx) => {
        const startEndDate = formatDateTime(sg.ShowDate, sg.ShowTime);
        const calData = {
          id: idx.toString(),
          calendarId: idx.toString(),
          title: `${sg.Movie.Name}`,
          category: 'time',
          start: startEndDate.start,
          end: startEndDate.end,
          location: `${sg.CinemaType} ${sg.Theater}`,
          attendees: sg.AttendeeName,
          backgroundColor: getColorByCinemaType(sg.CinemaType)
        };
        newCalDatas.add(JSON.stringify(calData));
      })
    );

    const calDataArray = Array.from(newCalDatas).map((jsonStr) => JSON.parse(jsonStr));
    setCalDataList(calDataArray);
  };

  const formatDateTime = (showDate, showTime) => {
    const dateParts = showDate.split('.');
    const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;

    const timeParts = showTime.split('~');
    const startTime = timeParts[0].trim();
    const endTime = timeParts[1].trim();

    const start = new Date(`${formattedDate}T${startTime}:00`);
    const end = new Date(`${formattedDate}T${endTime}:00`);

    return {
      start: format(start, 'yyyy-MM-dd\'T\'HH:mm:ss').toString(),
      end: format(end, 'yyyy-MM-dd\'T\'HH:mm:ss').toString(),
    };
  }

  const getColorByCinemaType = (cinemaType) => {
    switch (cinemaType) {
      case 'MEGABOX':
        return '#6f00ff';
      case 'CGV':
        return '#0080ff';
      case 'LOTTECINEMA':
        return '#ff0000';
      default:
        return '#808080';
    }
  }

  useEffect(() => {
    fetchAllData()
  }, []);

  useEffect(() => {
    // console.log(sgList)
  }, [sgList]);


  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          무대인사 캘린더
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
        />
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Container>
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2} ml={1}>
                <Typography variant="h4" gutterBottom>
                  무대인사 달력
                </Typography>
              </Stack>
              <Grid item xs={12} md={12} lg={12}>
                <Card>
                  <UseCalendar isDesktop={isDesktop} originSgList={originSgList} setOriginSgList={setOriginSgList} setSgList={setSgList} isSideOpen={isSideOpen} setSideOpen={setSideOpen} isListOpen={isListOpen} setIsListOpen={setIsListOpen} calDataList={calDataList} />
                  <MapSideList
                    sgList={sgList}
                    isDesktop={isDesktop}
                    isSideOpen={isSideOpen}
                    setSideOpen={setSideOpen}
                  />
                </Card>
              </Grid>
              {/* <Card>
                      <UseCalendar isDetailOpen={isDetailOpen} setDetailOpen={setDetailOpen} 
                                   isListOpen={isListOpen} setListOpen={setListOpen}
                                   sgDetail={sgDetail} setSgDetail={setSgDetail}
                                   sgDayList={sgDayList} setSgDayList={setSgDayList}
                                   isDesktop={isDesktop}
                      />
                  </Card> */}
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
