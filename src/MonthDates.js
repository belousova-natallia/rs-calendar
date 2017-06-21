import React from 'react';
import  LoadingIndicator from  'react-loading-indicator';
import { Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

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

            let eventtArr = [];
             that.props.events.forEach(function(event){ 
                if(event.start.slice(0, 10) === thisDate){
                eventtArr.push(event)
             }}  )

            
            return <div className="modal-container" key={item} >

            {(eventtArr.length === 0)? <Button className="cells" key={item}> <div className='cells empty' key={item} onClick={that.props.onSelect.bind(that, that.props.year, that.props.month, item)}>
          <div className="day">{(item < 10) ? '0' + item : item}</div>
                   
         </div></Button>
         : eventtArr.map(function(eventt, i){
                  return <Button key={i} style={{height: `${100/eventtArr.length}%` }} className={(eventt) ? `${eventt.type} eventEvent empty` : "empty"}
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
          <div className="day">{i<1 ? ((item < 10) ? '0' + item : item) : ""}</div>
          
       <div > {(eventt) ? eventt.type  : "" }
       <br/>
       
       </div>
          
         </div>
        </Button> 
         })

     }

      </div>

            })}
      
        {arr.map(function(item) {


            let thisDate = `${that.props.year}-${(that.props.month < 9) ?
             '0'+ (that.props.month + 1) : that.props.month + 1}-${(item < 10) ? '0' + item : item}`;

             let eventtArr = [];
             that.props.events.forEach(function(event){ 
                if(event.start.slice(0, 10) === thisDate){
                eventtArr.push(event)
             }}  )
        
            

            return <div className="modal-container" key={item} >

            {(eventtArr.length === 0)? <Button bsStyle="info"
          bsSize="large" key={item} className={(item === that.props.date && thisDate.slice(0, 4) == new Date().getFullYear() && thisDate.slice(5, 7) == new Date().getMonth() + 1)
           ? "today" : ""}> <div className="cells" key={item} onClick={that.props.onSelect.bind(that, that.props.year, that.props.month, item)}>
          <div className="day">{(item < 10) ? '0' + item : item}</div>
                   
         </div></Button>
         : eventtArr.map(function(eventt, i){
                  return <Button key={i} style={{height: `${100/eventtArr.length}%` }} className={`${eventt.type} eventEvent 
                  ${(item === that.props.date && thisDate.slice(0, 4) == new Date().getFullYear() && thisDate.slice(5, 7) == new Date().getMonth() + 1)
           ? "today" : ""}`}
          bsStyle="info"
          bsSize="large"
          onClick={function(){
            if(eventt){
                that.setState({ show: true, event: eventt});
                that.getTrainer(eventt.speakers);
            }
        }}
        >
          <div className="cells"  key={item} onClick={that.props.onSelect.bind(that, that.props.year, that.props.month, item)}>
          <div className="day">{i<1 ? ((item < 10) ? '0' + item : item) : ""}</div>
          
       <div > {(eventt) ? eventt.type  : "" }
       <br/>
       
       </div>
          
         </div>
        </Button> 
         })

     }


         



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

            
            let eventtArr = [];
             that.props.events.forEach(function(event){ 
                if(event.start.slice(0, 10) === thisDate){
                eventtArr.push(event)
             }}  )

            
            return <div className="modal-container" key={item} >

            {(eventtArr.length === 0)? <Button className="cells" key={item}> <div className='cells empty' key={item} onClick={that.props.onSelect.bind(that, that.props.year, that.props.month, item)}>
          <div className="day">{item}</div>
                   
         </div></Button>
         : eventtArr.map(function(eventt, i){
                  return <Button key={i} style={{height: `${100/eventtArr.length}%` }} className={(eventt) ? `${eventt.type} eventEvent empty` : "empty"}
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
          <div className="day">{i<1 ? item : ""}</div>
          
       <div > {(eventt) ? eventt.type  : "" }
       <br/>
       
       </div>
          
         </div>
        </Button> 
         })

     }

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
export default MonthDates;
