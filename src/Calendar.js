import React from 'react';
import { Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import  LoadingIndicator from  'react-loading-indicator';




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
                    <MonthDates month={this.state.month} year={this.state.year} daysInMonth={this.state.daysInMonth}
                     firstOfMonth={this.state.firstOfMonth} lastOfMonth={this.state.lastOfMonth}  daysInPrevMonth={this.state.daysInPrevMonth} startDay={this.state.startDay} onSelect={this.selectDate}
                      weekNumbers={this.state.weekNumbers} disablePast={this.state.disablePast} minDate={this.state.minDate} 
                      selectedDt={this.state.selectedDt} selectedYear={this.state.selectedYear} selectedMonth={this.state.selectedMonth}
                      selectedDate={this.state.selectedDate} events={this.state.events} trainers={this.state.trainers} currentEvent={this.state.currentEvent}/>
                                     
                </div>
            </div>
        );
    }
};

class Header extends React.Component{
    render() {
      return (<div className="rows head">
        <div className="prev" onClick={this.props.onPrev} role='button'>prev</div>
         <div className=" next" onClick={this.props.onNext} role='button'>next</div>
          <div className="title">{this.props.monthNames[this.props.month]} {this.props.year}</div>
      </div>)
    }
};

class WeekDays extends React.Component{
    render() {
      return (
      <div className="rows weekdays"> {this.props.dayNames.map(function(item){
        return <div className="day-cell" key={item}>{item}</div>
      } )}</div > 
     
      )
    }
};

class MonthDates extends React.Component{
 
  ready(){
    if(this.props.events) return true
      else return false
  }
    getTrainer(speakers){

        let thisEventTrainers = [];

        for(let i = 0; i < speakers.length; i++){

         let trainer = this.props.trainers.find(function(trainer){
            return trainer.id === speakers[i];
            });

         thisEventTrainers.push(trainer);
     }

    
                this.setState({ thisEventTrainers: thisEventTrainers})
            
    }

  constructor() {
    super();
    this.state = { 
     show: false,
     event:null,
     trainersForEventId:null, 
   };
  } 
    render() {
      let close = () => this.setState({ show: false});
      let that = this;
      let arr = [];
      for(let i = 1;i <= this.props.daysInMonth; i++) {
      arr.push(i);
      }

    let firstOfMonthDay = this.props.firstOfMonth.getDay();
    if(firstOfMonthDay === 0) firstOfMonthDay = 7;
    var arrPrevMonth = [];
    for(let i = 1; i < firstOfMonthDay; i++) arrPrevMonth.unshift(this.props.daysInPrevMonth + 1 - i);

    let lastOfMonthDay = this.props.lastOfMonth.getDay();
    if(lastOfMonthDay === 0) lastOfMonthDay = 7;

    var arrNextMonth = [];

    for(let i = 1; i <= 7 -  lastOfMonthDay; i++) arrNextMonth.push('0' + i)


        if(!this.ready()) return  <LoadingIndicator className="loadingIndicator" segmentLength={50} segmentWidth={20} spacing={20}/>;
      
      return (
        <div className="rows">
        {arrPrevMonth.map(function(item){
            let year = that.props.year;
            if(that.props.month === 0){
                year = that.props.year - 1
            }
            if(that.props.month === 11){
                year = that.props.year + 1
            }
            let month = that.props.month;

            if(that.props.month < 10){
                month = '0'+ (that.props.month )
            }

            if(that.props.month === 0){
                month = '12'
            }

            let thisDate = `${year}-${month}-${item}`;

            let eventt = that.props.events.find(function(event){
            return event.start.slice(0, 10) === thisDate})

            
            return <div className="modal-container" key={item} >

            <Button className="cells empty" key={item}
             onClick={function(){
            if(eventt){
                that.setState({ show: true, event: eventt});
                that.getTrainer(eventt.speakers) 
            }
        }}>
 <div className="cells" key={item} >
        <div className="day">{item}</div>

      
       <div className={`eventEvent ${(eventt) ? eventt.type : ""}`}> {(eventt) ? `${eventt.type}:`  : "" }
       <br/>
       {(eventt) ? eventt.title  : "" }
       </div>
</div>
        </Button> 

         </div>
            })}
      
        {arr.map(function(item) {


            let thisDate = `${that.props.year}-${(that.props.month < 9) ?
             '0'+ (that.props.month + 1) : that.props.month + 1}-${(item < 10) ? '0' + item : item}`;
        
            let eventt = that.props.events.find(function(event){
            return event.start.slice(0, 10) === thisDate;
                })

            return <div className="modal-container" key={item} >
         
        <Button className={(eventt) ? `${eventt.type} eventEvent` : ""}
          bsStyle="info"
          bsSize="large"
          onClick={function(){
            if(eventt){
                that.setState({ show: true, event: eventt});
                that.getTrainer(eventt.speakers);
            }
        }}
        >
          <div className="cells" key={item} onClick={that.props.onSelect.bind(that, that.props.year, that.props.month, item)}>
          <div className="day">{(item < 10) ? '0' + item : item}</div>
          
       <div > {(eventt) ? `${eventt.type}:`  : "" }
       <br/>
       {(eventt) ? eventt.title  : "" }
       </div>
          
         </div>
        </Button>

      </div>

     })}

{arrNextMonth.map(function(item){

            let year = that.props.year;
            if(that.props.month === 11){
                year = year + 1
            }
            
            let month = that.props.month + 2;

            if(month < 10){
                month = '0'+ month 
            }

            if(that.props.month === 11){
                month = '01'
            }

            let thisDate = `${year}-${month}-${item}`;

            let eventt = that.props.events.find(function(event){
            return event.start.slice(0, 10) === thisDate})
            
    return <div className="modal-container" key={item} >

    <Button className="cells empty" key={item}
       onClick={function(){
            if(eventt){
                that.setState({ show: true, event: eventt, trainersForEventId: eventt.speakers});
                that.getTrainer(eventt.speakers);
            }
        }}
    >
 <div className="cells" key={item} >
        <div className="day">{item}</div>

        <div className={`eventEvent ${(eventt) ? eventt.type : ""}`}> {(eventt) ? `${eventt.type}:`  : "" }
       <br/>
       {(eventt) ? eventt.title  : "" }
       </div>
 </div>        
        </Button> 
        
      

        </div>

})}

<Modal 
          show={that.state.show}
          onHide={close}
          container={that}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header className={(that.state.event) ? that.state.event.type : ""} closeButton>
            <Modal.Title id="contained-modal-title" >
            {(that.state.event) ? `${that.state.event.title}: ${that.state.event.type}`  : "" }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body><div>
        <h4 className={(that.state.event) ? `${that.state.event.type}-underline` : ""}>Start: </h4> 
           <p>{(that.state.event) ? `${that.state.event.start.slice(0, 10)}  ${that.state.event.start.slice(11, -1)}`  : "" }</p>
        
        <h4 className={(that.state.event) ? `${that.state.event.type}-underline` : ""}>Description: </h4> 
          <p> {(that.state.event) ? that.state.event.description  : "" }</p>
       
        <h4 className={(that.state.event) ? `${that.state.event.type}-underline` : ""}>Duration: </h4> 
           <p> {(that.state.event) ? that.state.event.duration : "" }</p>
        
       
        <h4 className={(that.state.event) ? `${that.state.event.type}-underline` : ""}>Trainers:</h4>
            <div>{(that.state.event) ? that.state.thisEventTrainers.map((trainer, i) => 
                <div className="trainers" key={i}>
                <div>{trainer.name}</div>
                <img  width="100" alt='' src={trainer.avatar} />
                </div> 
                ) : "" }
            </div>

        <h4 className={(that.state.event) ? `${that.state.event.type}-underline` : ""}>Location: </h4> 
            <p>{(that.state.event) ? that.state.event.location : "" }</p>
            

            <h4 className={(that.state.event) ? `${that.state.event.type}-underline` : ""}>Resources</h4>
            <ul>
            {(that.state.event) ? that.state.event.resources.map((resource, i) => 
                <li key={i}>
                <h4 className="resource-type">{resource.type}</h4>
                <div>{resource.description}</div>
                <div><a href={resource.resource} target="_blank" rel="noopener noreferrer" >Link</a></div>
                
                </li>

                ) 
                 : "" }
            </ul>
            <h3 className="message">Leave a message</h3>
                <Form horizontal>
    <FormGroup controlId="formHorizontalName">
      <Col componentClass={ControlLabel} sm={2}>
        Name
      </Col>
      <Col sm={4}>
        <FormControl type="text" placeholder="Name" />
      </Col>
    </FormGroup>
    <FormGroup controlId="formControlsTextarea">
      <Col componentClass={ControlLabel} sm={2}>
       Message
      </Col>
      <Col sm={8}>
        <FormControl componentClass="textarea" placeholder="textarea" />
      </Col>
    </FormGroup>

   <FormGroup>
      <Col smOffset={2} sm={10}>
        <Button type="submit">
          Send
        </Button>
      </Col>
    </FormGroup>
  </Form>

</div>
            </Modal.Body>
          <Modal.Footer>
            <Button onClick={close} className={(that.state.event) ? that.state.event.type : ""}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>
      )  
      
    }
};






export default Calendar;
