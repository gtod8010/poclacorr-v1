import React from "react";
import "../styles.css";

import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

// for React 16.4.x use: import { ReactTabulator } - example in github repo.
import { React15Tabulator, reactFormatter } from "react-tabulator"; // for React 15.x
import queryString from 'query-string';


const CaptureListColumns = [
  {formatter:"rowSelection", titleFormatter:"rowSelection", headerHozAlign:"center",hozAlign:"center",width:50, headerSort:false, cellClick:function(e, cell){
    cell.getRow().toggleSelect()
  }},
  {
    title: "roundName",
    field: "roundName",
    hozAlign: "center",
    formatter: "input",
    width: 150
  },
  {
    title: "date",
    field: "date",
    hozAlign: "center",
    // formatter: "input",
    width: 150
  },
  {
    title: "isEnabled",
    field: "isEnabled",
    width: 100,
    hozAlign: "center",
    formatter: "tickCross",
    editor: true
  },
  {
    title: "recordStartTime",
    field: "recordStartTime",
    hozAlign: "center",
    // formatter: "input",
    width: 150
  },
  {
    title: "recordEndTime",
    field: "recordEndTime",
    hozAlign: "center",
    // formatter: "input",
    width: 150
  },
  {
    title: "storage",
    field: "storage",
    hozAlign: "center",
    // formatter: "input",
    width: 150
  },
  {
    title: "uuid",
    field: "uuid",
    hozAlign: "center",
    // formatter: "input",
    width: 150
  },
  {
    title: "directory",
    field: "directory",
    hozAlign: "center",
    // formatter: "input",
    width: 150
  },
];

class CaptureDetailTable extends React.Component {
   state = {
      data: [],
      selectedName: "",	
      ref : null
    }


  componentDidMount() {
    // const search  = queryString.parse(this.props.location.search);
    }

  rowClick = (e, row) => {
    console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
    console.log(`rowClick id: \${row.getData().id}`, row, e);
    
    // this.setState({ data: row.getData().name });
  };

  setData = (e) => {
    this.setState({ e });
  };

  clearData = () => {
    this.setState({ data: [] });
  };

  render() {
    // const {search}  = props.location.search;
    console.log(this.props.uuid)
    console.log(this.props.uuid.substring(1))
    const options = {
      height: 300,
      ajaxURL: `../../api/admin/contents/capturep/one?id=${this.props.uuid.substring(1)}`,
      headers: {
        contentType: 'application/json; charset=utf-8',
        dataType: 'json', //set specific content type
      },
      ajaxResponse: function (url, params, response) {
        return Object.values(response); //return the response data to tabulator
      },
      ajaxError: function (error) {
          console.log('ajaxError', error);
      }
    };
    return (
      <div>
        <React15Tabulator 
          ref={(ref) => (this.ref = ref)}
          columns={CaptureListColumns}
          data={this.state.data}
          rowClick= {function(){
          }.bind(this)}    
          options={options}
          data-custom-attr="test-custom-attribute"
        />
        {/* <p>
          <a href="https://github.com/ngduc/react-tabulator" target="_blank">
            Back to: Github Repo: react-tabulator
          </a>
        </p> */}
       
      </div>
    );
  }
}

export default CaptureDetailTable;
