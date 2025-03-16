'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect } from 'react';
//import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
//import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CalendarComp = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
            .fc {
              background-color: background-color: rgba(240, 245, 239) !important;
            }    
    /* Specifically style the prev and next buttons */
           /* .fc-next-button::before{
              content: "\uE5C4";
              font-family: "Material Icons";
              font-size: 24px;
              color: #42603C;
            }

            .fc-prev-button::before{
              content: "\uE5C5";
              font-family: "Material Icons";
              font-size: 24px;
              color: #42603C;
            }*/
    
            .fc-header-toolbar .fc-prev-button,
            .fc-header-toolbar .fc-next-button {
                background: none !important;
                color: #42603C !important;
                font-size: 32px !important; /* Font size for the buttons */
                padding: 8px 12px !important; /* Button padding */
                border: none !important; /* Remove default border */
                border-radius: 4px !important; /* Rounded corners for the buttons */
                cursor: pointer !important; /* Pointer cursor on hover */
                transition: background-color 0.3s ease !important; /* Smooth background color transition */
            }

            /* This ensures the title is centered and properly aligned within the left section */
            .fc-header-toolbar .fc-toolbar-title {
                margin-left: 10px !important; /* Adds space between the title and the buttons */
                font-family: 'Verdana', sans-serif !important; /* Font family for the title */
                font-size: 25px !important; /* Font size for the title */
                color: #42603C !important; /* Dark gray color for the title */
                font-weight: bold !important; /* Bold title text */
                text-transform: uppercase !important;
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
                color: #E2E7E2 !important; /* Darker color for the day names */
                background-color: #42603C !important;
                font-weight: bold !important;
                text-align: center !important;
                padding: 10px 0 !important; /* Padding for better spacing */
                text-transform: uppercase !important;
            }
            .fc-daygrid-day-number {
                font-size: 20px !important;
                color: #333333 !important; /* Dark color for day numbers */
                padding: 5px;
                display: inline-block;
                background-color: rgb(218, 230, 215, 0.8) !important;
                width: 100%;
                height: 100%;
                text-align: left;
                line-height: 30px;
                transition: background-color 0.3s ease, color 0.3s ease;
            }
        `;
    document.head.appendChild(style);

    //const calendarGrid = document.querySelector('.fc-daygrid');

    /*if (calendarGrid) {
      calendarGrid.setAttribute(
        'style',
        'background-image: url("https://imgur.com/nkNSLL2.png"); background-size: cover; background-position: center; background-repeat: no-repeat;'
      );
    }*/

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
