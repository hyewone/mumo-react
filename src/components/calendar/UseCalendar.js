/* eslint-disable no-console */
// import './app.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Calendar from '@toast-ui/react-calendar';
import TZDate from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import { theme } from './theme';
// import { addDate, addHours, subtractDate } from './utils';

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

export default function UseCalendar({ isDetailOpen, setDetailOpen, isListOpen, setListOpen, sgDetail, setSgDetail, sgDayList, setSgDayList}) {
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
        start: '2023-08-28T15:00:00',
        end: '2023-08-29T15:30:00',
    },
    // ... Other initial events ...
  ];

  const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), []);

  const updateRenderRangeText = useCallback(() => {
    // ... Function body remains the same ...
  }, [getCalInstance]);

  useEffect(() => {
    setSelectedView(view);
  }, [view]);

  useEffect(() => {
    updateRenderRangeText();
  }, [selectedView, updateRenderRangeText]);

  const onSelectDateTime = (res) => {
    console.group('onSelectDateTime');
    console.log('MouseEvent : ', res.nativeEvent);
    console.log('Event Info : ', res.event);
    console.groupEnd();
    setListOpen(true)
  };

  const onClickEvent = (res) => {
    console.group('onClickEvent');
    console.log('MouseEvent : ', res.nativeEvent);
    console.log('Event Info : ', res.event);
    console.groupEnd();
    setDetailOpen(true)
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
    // const onChangeSelect = (event) => {
    //     console.log("onChangeSelect")
    // // setSelectedView(ev.target.value as ViewType);
    // };  

  // Other event handler functions ...

  return (
    <div>
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
        height="900px"
        calendars={initialCalendars}
        month={{ startDayOfWeek: 1 }}
        scrollToNow
        events={initialEvents}
        template={{
          // ... Milestone and allday templates ...
        }}
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
        ref={calendarRef}
        onAfterRenderEvent={onAfterRenderEvent}
        // onBeforeDeleteEvent={onBeforeDeleteEvent}
        // onClickDayname={onClickEvent}
        onClickEvent={onClickEvent}
        onSelectDateTime={onSelectDateTime}
        // onClickTimezonesCollapseBtn={onClickTimezonesCollapseBtn}
        // onBeforeUpdateEvent={onBeforeUpdateEvent}
        // onBeforeCreateEvent={onBeforeCreateEvent}
      />
    </div>
  );
}