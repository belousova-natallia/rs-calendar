import React from 'react';
class WeekDays extends React.Component{
    render() {
      return (
      <div className="rows weekdays"> {this.props.dayNames.map(function(item){
        return <div className="day-cell" key={item}>{item}</div>
      } )}</div > 
     
      )
    }
};

export default WeekDays;
