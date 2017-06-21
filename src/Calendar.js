import React from 'react';
import { Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import  LoadingIndicator from  'react-loading-indicator';
import  Header from  './Header';
import  WeekDays from  './WeekDays';
import MonthDates from './MonthDates';


class Calendar extends React.Component{


    calc (year, month) {
        if (this.state.selectedElement) {
            if (this.state.selectedMonth !== month || this.state.selectedYear !== year) {
                this.state.selectedElement.classList.remove('selected');
            } else {
                this.state.selectedElement.classList.add('selected');
            }
        }
        return{
            firstOfMonth: new Date(year, month, 1),
            lastOfMonth: new Date(year, month + 1, 0),
            daysInMonth: new Date(year, month + 1, 0).getDate(),
            daysInPrevMonth: new Date(year, month, 0).getDate(),
          }
        
    };

    touchEvent(){
let that = this;
let calendar = document.getElementById("root");

calendar.addEventListener('touchstart', handleTouchStart, false);        
calendar.addEventListener('touchmove', handleTouchMove, false);

let xDown = null;                                                        
let yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                        
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    let xUp = evt.touches[0].clientX;                                    
    let yUp = evt.touches[0].clientY;
    

    let xDiff = xDown - xUp;
    let yDiff = yDown - yUp;


    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
          that.getNext()   
  }
     else {
         that.getPrev()   
        
}
        }                       
     
    /* reset values */
    xDown = null;
    yDown = null; 

                                          
};}



    getPrev() {
        let state = {};
        if (this.state.month > 0) {
            state.month = this.state.month - 1;
            state.year = this.state.year;
        } else {
            state.month = 11;
            state.year = this.state.year - 1;
        }

        Object.assign(state, this.calc.call(null, state.year, state.month));
        this.setState(state);
        

    };

    getNext() {
        let state = {};
        if (this.state.month < 11) {
            state.month = this.state.month + 1;
            state.year = this.state.year;
        } else {
            state.month = 0;
            state.year = this.state.year + 1;
        }

       Object.assign(state, this.calc.call(null, state.year, state.month));
        this.setState(state);
        
    };

    selectDate (year, month, date, element) {    
    if (this.state.selectedElement) {
            this.state.selectedElement.classList.remove('selected');
        }
        element.target.classList.add('selected');

        
        

        this.setState({
            selectedYear: year,
            selectedMonth: month,
            selectedDate: date,
            selectedDt: new Date(year, month, date),
            selectedElement: element.target,
           
        });

        };

        getEvents(){
         var _this = this;
    this.serverRequest = 
      axios
        .get("http://128.199.53.150/events/")
        .then(function(result) {    
          _this.setState({
            events: result.data
          });
          
        })
        }

         getTrainers(){
         var _this = this;
    this.serverRequest = 
      axios
        .get("http://128.199.53.150/trainers/")
        .then(function(result) {    
          _this.setState({
            trainers: result.data
          });
          
        })
        }
    
    componentWillMount() {
      
          this.setState(this.calc.call(null, this.state.year, this.state.month));
          
      };

    componentDidMount() {
this.getEvents();
this.getTrainers();
this.touchEvent();
}
    componentDidUpdate(prevProps, prevState) {
       if (this.props.onSelect && prevState.selectedDt !== this.state.selectedDt) {
            this.props.onSelect.call(this.getDOMNode(), this.state);
        }
    };
   
    constructor(props) {
    super(props);
    var date = new Date()
    this.state = { 
            events:null,
            trainers: null,
            currentEvent: null,
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
            selectedYear: null,
            selectedMonth: null,
            selectedDate: null,
            selectedDt: null,
            startDay: 1,
            weekNumbers: false,
            minDate: this.props.minDate ? this.props.minDate : null,
            disablePast: this.props.disablePast ? this.props.disablePast : false,
            dayNames: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat','Sun'],
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            monthNamesFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            firstOfMonth: null,
            lastOfMonth: null,
            daysInMonth: null,
            daysInPrevMonth: null,
        };
        this.calc = this.calc.bind(this);
        this.selectDate = this.selectDate.bind(this);
        this.getPrev = this.getPrev.bind(this);
        this.getNext = this.getNext.bind(this);
        this.getEvents = this.getEvents.bind(this);
    };

    render() {

        return (
            <div className="calendar">
                <div className="inner">
                    <Header monthNames={this.state.monthNamesFull} month={this.state.month} year={this.state.year} onPrev={this.getPrev} onNext={this.getNext} />
                    <WeekDays dayNames={this.state.dayNames} startDay={this.state.startDay} weekNumbers={this.state.weekNumbers} />
                    <MonthDates month={this.state.month} year={this.state.year} date={this.state.date} daysInMonth={this.state.daysInMonth}
                     firstOfMonth={this.state.firstOfMonth} lastOfMonth={this.state.lastOfMonth}  daysInPrevMonth={this.state.daysInPrevMonth} startDay={this.state.startDay} onSelect={this.selectDate}
                      weekNumbers={this.state.weekNumbers} disablePast={this.state.disablePast} minDate={this.state.minDate} 
                      selectedDt={this.state.selectedDt} selectedYear={this.state.selectedYear} selectedMonth={this.state.selectedMonth}
                      selectedDate={this.state.selectedDate} events={this.state.events} trainers={this.state.trainers} currentEvent={this.state.currentEvent}/>
                                     
                </div>
            </div>
        );
    }
};











export default Calendar;
