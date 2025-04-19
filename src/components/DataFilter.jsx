// src/components/DateFilter.js
import React from 'react';

const DateFilter = ({ date, onChange }) => {
  const handleDateChange = (e) => {
    onChange(new Date(e.target.value));
  };

  return (
    <div className="date-filter">
      <label>Filter by Month:</label>
      <input
        type="month"
        value={`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateFilter;
