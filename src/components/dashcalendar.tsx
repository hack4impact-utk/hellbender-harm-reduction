'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventClickArg } from '@fullcalendar/core';
import { useEffect, useRef } from 'react';

// interfaces for event
interface DashEventData {
  title: string;
  start: Date;
  end: Date;
}

interface DashCalendarProps {
  events: DashEventData[];
  onEventClick?: (arg: EventClickArg) => void;
}

export default function DashCalendar({
  events,
  onEventClick,
}: DashCalendarProps) {
  // used with styling
  const calendarRef = useRef<any>(null);

  // full calendar styling, edit at your own risk
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
  
      /* styling for next/prev month buttons */
      .fc-header-toolbar .fc-prev-button,
      .fc-header-toolbar .fc-next-button {
          background: none !important;
          color: #42603C !important;
          font-size: 32px !important;
          border: none !important;
          border-radius: 4px !important;
          cursor: pointer !important;
          transition: background-color 0.3s ease !important;
      }
  
      /* calendar title styling */
      .fc-header-toolbar .fc-toolbar-title {
          font-family: 'Verdana', sans-serif !important;
          font-size: 30px !important;
          color: #42603C !important;
          font-weight: bold !important;
          text-transform: uppercase !important; 
      }
      
      /* styling for day box in calendar */
      .fc-daygrid-day {
          background-color: rgba(240, 245, 239, 0.7) !important;
          border: 1px solid #ddd !important;
          padding: 8px !important;
          text-align: center !important;
          font-size: 15px !important;
          color: #333 !important;
          transition: background-color 0.3s ease, color 0.3s ease !important;
          font-family: 'Verdana', sans-serif !important;
      }

      /* styling for today day box in calendar */
      .fc-daygrid-day.fc-day-today {
          background-color: rgb(218, 230, 215, 0.7) !important;
          font-weight: bold !important;
          color: #000 !important;
      }
      
      /* styling for weekday header */
      .fc-col-header-cell {
          font-family: 'Verdana', sans-serif !important;
          font-size: 18px !important;
          color: #E2E7E2 !important;
          background-color: #42603C !important;
          font-weight: bold !important;
          text-align: center !important;
          padding: 10px 0 !important;
          text-transform: uppercase !important;
      }
      
      /* styling for day numbers */
      .fc-daygrid-day-number {
          font-size: 15px !important;
          color: #333333 !important;
          padding: 2px;
          display: inline-block;
          width: 100%;
          height: 100%;
          text-align: left;
          line-height: 30px;
          transition: background-color 0.3s ease, color 0.3s ease;
      }
      
      /* overall styling for events */
      .fc-event {
        font-family: 'Verdana', sans-serif !important;
      }

      /* styling for event title */
      .fc-event-title {
        font-family: 'Verdana', sans-serif !important;
      }
    `;

    document.head.appendChild(style);

    // adds very slight delay to make sure that fullcalendar fully loads everything when you first open the page
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      setTimeout(() => {
        calendarApi.updateSize();
      }, 100);
    }
  }, []);

  // return actual calendar component
  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev',
        center: 'title',
        right: 'next',
      }}
      events={events}
      eventColor="#6E8569"
      eventClick={onEventClick}
    />
  );
}
