/* eslint-disable no-console */
// import './app.css';
import TZDate from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import Calendar from '@toast-ui/react-calendar';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { theme } from './theme';


const today = new TZDate();
// const today = new Date();
const viewModeOptions = [
  {
    title: 'Monthly',
    value: 'month',
  },
  {
    title: 'Weekly',
    value: 'week',
  },
  {
    title: 'Daily',
    value: 'day',
  },
];

UseCalendar.propTypes = {
  isDesktop: PropTypes.bool,
  isSideOpen: PropTypes.bool,
};

export default function UseCalendar({ isDesktop, isSideOpen, setSideOpen, isListOpen, setIsListOpen, calDataList, originSgList, setOriginSgList, setSgList }) {

  const view = "month"
  const calendarRef = useRef(null);
  const [selectedDateRangeText, setSelectedDateRangeText] = useState('');
  const [selectedView, setSelectedView] = useState(view);
  const initialCalendars = [
    {
      id: '0',
      name: 'Private',
      backgroundColor: '#9e5fff',
      borderColor: '#9e5fff',
      dragBackgroundColor: '#9e5fff',
    },
    {
      id: '1',
      name: 'Company',
      backgroundColor: '#00a9ff',
      borderColor: '#00a9ff',
      dragBackgroundColor: '#00a9ff',
    },
  ];
  const initialEvents = [
    {
      id: '1',
      calendarId: '0',
      title: 'TOAST UI Calendar Study',
      category: 'time',
      start: '2023-09-28T15:00:00',
      end: '2023-09-29T15:30:00',
    },
    // ... Other initial events ...
  ];


  const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), []);

  const updateRenderRangeText = useCallback(() => {
    // ... Function body remains the same ...
  }, [getCalInstance]);

  useEffect(() => {
    if (!isSideOpen) {
      const calendarInstance = calendarRef.current.getInstance();
      calendarInstance.clearGridSelections();
    }
  }, [isSideOpen]);

  useEffect(() => {
    if (!isListOpen) {
      const calendarInstance = calendarRef.current.getInstance();
      calendarInstance.clearGridSelections();
    }
  }, [isListOpen]);

  useEffect(() => {
    setSelectedView(view);
  }, [view]);

  useEffect(() => {
    updateRenderRangeText();
  }, [selectedView, updateRenderRangeText]);

  const onSelectDateTime = (res) => {
    const formattedDate = getDateToString(res.start);
    const filteredSgList = originSgList.filter((sg) => {
      return formattedDate === sg.ShowDate;
    });

    setSgList(filteredSgList);

    if (isDesktop) {
      setSideOpen(true)
    } else {
      setIsListOpen(true)
    }
  };
  const clickSchedule = (res) => {

    console.log('MouseEvent : ', res.nativeEvent);
    console.log('Event Info : ', res.event);
    console.log('Event Info res : ', res);


  };

  const onClickEvent = (res) => {
    // console.group('onClickEvent');
    console.log('MouseEvent : ', res.nativeEvent);
    console.log('Event Info : ', res.event);
    console.log(res);

    const formattedDate = getDateToString(res.event.start.d);
    const filteredSgList = originSgList.filter((sg) => {
      return formattedDate === sg.ShowDate;
    });

    setSgList(filteredSgList);

    if (isDesktop) {
      setSideOpen(true)
    } else {
      setIsListOpen(true)
    }

    // const calendarInstance = calendarRef.current.getInstance();
    // // calendarInstance.clearGridSelections();

    // calendarInstance.updateSchedule(res.event.id, res.event.calendarId, {
    //   isFocused: true,
    // });
  };

  const onBeforeUpdateEvent = (res) => {
    console.log('MouseEvent : ', res.nativeEvent);
    console.log('Event Info : ', res.event);
    console.log('Event Info res : ', res);
  };

  const onBeforeCreateEvent = (res) => {
    console.log('MouseEvent : ', res.nativeEvent);
    console.log('Event Info : ', res.event);
    console.log('Event Info res : ', res);
  };

  const onAfterRenderEvent = (event) => {
    console.log("onAfterRenderEvent")
  };

  const onChangeSelect = (event) => {
    console.log("onChangeSelect")
  };

  const onClickNavi = (event) => {
    console.log("onClickNavi")
  };

  const onClickSchedule = (event) => {
    console.log("handleDaySelect")
  };

  const isDateActive = (currDate, cellDate) => {
    return currDate.getDate() === cellDate.getDate()
      && currDate.getMonth() === cellDate.getMonth()
      && currDate.getFullYear() === cellDate.getFullYear();
  }

  const getDateToString = (date) => {
    const inputDate = new Date(date);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }

  // const onChangeSelect = (event) => {
  //     console.log("onChangeSelect")
  // // setSelectedView(ev.target.value as ViewType);
  // };  

  // Other event handler functions ...

  return (
    <div
      style={{ width: isSideOpen && isDesktop ? 'calc(100% * 7 / 12)' : '100%' }}>
      {/* <h1>🍞📅 TOAST UI Calendar + React.js</h1> */}
      <div>
        {/* <select onChange={onChangeSelect} value={selectedView}>
          {viewModeOptions.map((option, index) => (
            <option value={option.value} key={index}>
              {option.title}
            </option>
          ))}
        </select> */}
        {/* <span>
          <button
            type="button"
            className="btn btn-default btn-sm move-today"
            data-action="move-today"
            onClick={onClickNavi}
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm move-day"
            data-action="move-prev"
            onClick={onClickNavi}
          >
            Prev
          </button>
          <button
            type="button"
            className="btn btn-default btn-sm move-day"
            data-action="move-next"
            onClick={onClickNavi}
          >
            Next
          </button>
        </span> */}
        <span className="render-range">{selectedDateRangeText}</span>
      </div>
      <Calendar
        ref={calendarRef}
        height="500px"
        // width={isSideOpen ? '10px' : '100%'}
        calendars={initialCalendars}
        month={{
          // startDayOfWeek: 0,
          visibleWeeksCount: 5,
        }}
        scrollToNow
        events={calDataList}
        // template={}
        theme={theme}
        timezone={{
          zones: [
            {
              timezoneName: 'Asia/Seoul',
              displayLabel: 'Seoul',
              tooltip: 'UTC+09:00',
            },
            // ... Other timezones ...
          ],
        }}
        useDetailPopup={false}
        useFormPopup={false}
        view={selectedView}
        week={{
          showTimezoneCollapseButton: true,
          timezonesCollapsed: false,
          eventView: true,
          taskView: true,
        }}
        gridSelection={{
          enableDblClick: false,
          enableClick: true,
        }}
        onAfterRenderEvent={onAfterRenderEvent}
        // onBeforeDeleteEvent={onBeforeDeleteEvent}
        clickSchedule={clickSchedule}
        onClickEvent={onClickEvent}
        onSelectDateTime={onSelectDateTime}
        // onClickTimezonesCollapseBtn={onClickTimezonesCollapseBtn}
        onBeforeUpdateEvent={onBeforeUpdateEvent}
        onBeforeCreateEvent={onBeforeCreateEvent}
      />
    </div>
  );
}