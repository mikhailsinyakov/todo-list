import React from 'react';
import '../stylesheets/Month.css';

const Month = props => {
  const { year, month, days, getDoneStepsByDate,
          chooseDate, chosenDate } = props;
  const monthWidth = 350;
  const monthHeight = 200;
  const padding = 10;
  const monthStyle = {
    width: monthWidth + padding + 'px',
    height: monthHeight + padding + 'px'
  };
  const weeks = days[days.length - 1].week;
  const isToday = day => {
    const now = new Date();
    if (year === now.getFullYear() &&
        month === now.getMonth() &&
        day === now.getDate()) {
      return true;
    }
    return false;
  };
  const isChosenDate = date => {
    if (!chosenDate) return false;
    if (chosenDate.year === date.year &&
        chosenDate.month === date.month &&
        chosenDate.day === date.day) {
      return true;
    }
    return false;
  };

  return (
    <div className="month" style={monthStyle}>
      {
        days.map(day => {
          const width = monthWidth / 7;
          const height = monthHeight / weeks;
          const dayStyle = {
            width: width + 'px',
            height: height + 'px',
            top: (day.week - 1) * height + padding / 2 + 'px',
            left: (day.weekDay - 1) * width + padding / 2 + 'px',
            lineHeight: height + 'px',
            borderColor: isChosenDate({year, month, day: day.dayNum}) ?
              'blue' :
              isToday(day.dayNum) ?
                'green' :
                'transparent'
          };
          const doneSteps = getDoneStepsByDate({year, month, day: day.dayNum});
          const cross = !!doneSteps.length;
          return (
            <div
              key={day.dayNum}
              className={`day ${cross ? 'cross' : ''}`}
              style={dayStyle}
              onMouseOver={() => chooseDate(year, month, day.dayNum)}
            >
              {day.dayNum}
            </div>
          );
        })
      }
    </div>
  );
}

export default Month;
