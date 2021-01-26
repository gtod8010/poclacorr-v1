import React from "react";
import ReactDOM from "react-dom";
import Tabulator from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet

class App extends React.Component {
  el = React.createRef();

  tabulator = null; //variable to hold your table
  tableData = []; //data for table to display

  componentDidMount() {
    //instantiate Tabulator when element is mounted
    this.tabulator = new Tabulator(this.el, {
      data: this.tableData, //link data to table
      reactiveData:true, //enable data reactivity
      columns: [], //define table columns
    });
  }

  //add table holder element to DOM
  render(){
    return (<div ref={el => (this.el = el)} />);
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);