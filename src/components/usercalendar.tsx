'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect } from 'react';

const CalendarComp = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Specifically style the prev and next buttons */
            .fc-header-toolbar .fc-prev-button,
            .fc-header-toolbar .fc-next-button {
                background-color: #42603C !important;
                color: #E2E7E2 !important;
                font-size: 16px !important; /* Font size for the buttons */
                padding: 8px 12px !important; /* Button padding */
                border: none !important; /* Remove default border */
                border-radius: 4px !important; /* Rounded corners for the buttons */
                cursor: pointer !important; /* Pointer cursor on hover */
                transition: background-color 0.3s ease !important; /* Smooth background color transition */
            }

            /* Hover effect for prev and next buttons */
            .fc-header-toolbar .fc-prev-button:hover,
            .fc-header-toolbar .fc-next-button:hover {
                background-color: #283a24 !important; /* Darker green on hover */
            }

            /* This ensures the title is centered and properly aligned within the left section */
            .fc-header-toolbar .fc-toolbar-title {
                margin-left: 10px !important; /* Adds space between the title and the buttons */
                font-family: 'Verdana', sans-serif !important; /* Font family for the title */
                font-size: 25px !important; /* Font size for the title */
                color: #42603C !important; /* Dark gray color for the title */
                font-weight: bold !important; /* Bold title text */
            }
            .fc-daygrid-day {
                background-color: rgba(240, 245, 239, 0.7) !important;  /* Light gray background */
                border: 1px solid #ddd !important;      /* Light gray border */
                padding: 8px !important;                /* Padding inside the day cell */
                text-align: center !important;          /* Center the text */
                font-size: 20px !important;             /* Font size for the day number */
                color: #333 !important;                /* Dark text color */
                transition: background-color 0.3s ease, color 0.3s ease !important;
                font-family: 'Verdana', sans-serif !important;
            }
            .fc-header-toolbar {
              background-color: rgba(240, 245, 239, 0.7) !important;
            }
            .fc-daygrid-day.fc-day-today {
                background-color: rgb(218, 230, 215, 0.7) !important;  /* Yellow with some transparency */
                font-weight: bold !important;           /* Bold text for today */
                color: #000 !important;                /* Black text color for today */
            }
            .fc-col-header-cell {
                font-family: 'Verdana', sans-serif !important;
                font-size: 18px !important;
                color: #42603C !important; /* Darker color for the day names */
                font-weight: bold !important;
                text-align: center !important;
                padding: 10px 0 !important; /* Padding for better spacing */
                background-color: rgba(240, 245, 239) !important; /* Slight background for day names */
            }
        `;
    document.head.appendChild(style);

    const calendarGrid = document.querySelector('.fc-daygrid');

    if (calendarGrid) {
      calendarGrid.setAttribute(
        'style',
        'background-image: url("https://imgur.com/nkNSLL2.png"); background-size: cover; background-position: center; background-repeat: no-repeat;'
      );
    }

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev',
        center: 'title',
        right: 'next',
      }}
    />
  );
};

export default CalendarComp;
