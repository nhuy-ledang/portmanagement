import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function PortScheduler() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDateTime(date);
    const formattedDateTime = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
    };

    console.log(JSON.stringify(formattedDateTime));
  }

  return (
    <div>
      <DateTimePicker
        onChange={handleDateChange}
        value={selectedDateTime}
        clearIcon={null}
      />
    </div>
  );
}
