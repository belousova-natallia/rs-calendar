import React from 'react';

class Header extends React.Component{
    render() {
      return (<div className="rows head">
        <div className="prev" onClick={this.props.onPrev} role='button'>prev</div>
         <div className=" next" onClick={this.props.onNext} role='button'>next</div>
          <div className="title">{this.props.monthNames[this.props.month]} {this.props.year}</div>
      </div>)
    }
};

export default Header;
