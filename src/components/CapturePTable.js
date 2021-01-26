import React, {dataState,dataEffect, useState} from "react";
import { ButtonToolbar , Button } from "react-bootstrap"
import {withRouter} from 'react-router-dom';
import "../styles.css";
import axios from "axios";
import {} from "jquery.cookie";

import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import "react-tabulator/lib/styles.css";
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; 

import { ReactTabulator } from "react-tabulator"

const CapturePtableColumns = [
  {formatter:"rowSelection", titleFormatter:"rowSelection", headerHozAlign:"center",hozAlign:"center",width:50, headerSort:false,selectable:true, cellClick:function(e, cell){
    cell.getRow().toggleSelect()
    console.log(cell.getRow())
  }},
  {
    title: "storageDisplayName",
    field: "storageDisplayName",
    width: 100,
    headerFilter: "input"
  },
  {
    title: "Date",
    field: "date",
    width: 150,
    hozAlign: "center",
    headerFilter: "input",
    editorParams: { format: "MM/DD/YYYY" }
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
    title: "rating",
    field: "rating",
    width: 100,
    hozAlign: "center",
    formatter: "input",
  },
  {
    title: "folderName",
    field: "folderName",
    hozAlign: "center",
    headerFilter: "input"
  },
  {
    title: "uuid",
    field: "uuid",
    hozAlign: "center",
    headerFilter: "input"
  },
  {
    title: "status",
    field: "status",
    width: 100,
    hozAlign: "center",
    formatter: "input",
  },
];

class Capture extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data: [],
      // selectedRow: "",
      selectedRound:"",
      selectedCapture: "",
      selecteduuid:""
    };
  }
  ref = null;
  
  componentDidMount() {
    // const search  = queryString.parse(this.props.location.search);
    }
  goToDetailPage = () => {
    this.props.history.push(`/contentmanagement/capturep/detail?${this.state.selecteduuid}`);
    // this.props.history.push(`/`);
  }

  rowClick = (e, row) => {
    console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
    console.log(`rowClick id: \${row.getData().id}`, row._row.data, e);
    console.log(`rowClick data: \${row.getData().data}`, row, e);
    this.setState({selectedRound:row._row.data.Rounds, selectedCapture:row._row.data.Capture,selecteduuid:row._row.data.uuid});
    row.getElement().style.backgroundColor = "#A6A6DF"; 
  };
  setData = (e) => {
    this.setState({ e });
  };

  clearData = () => {
    this.setState({ data: [] });
  };

  render() {
    const options = {
      // height: 450,
      ajaxURL: '../api/admin/contents/capturep/all',
      headers: {
        "Content-type": 'application/json; charset=utf-8', //set specific content type
      },
      ajaxResponse: function (url, params, response) {
          return response.capturePList; //return the response data rerrrrto tabulator
      },
      ajaxError: function (error) {
          console.log('ajaxError', error);
      }
    };
    return (
      <div id="capture-table">
        <ReactTabulator
          ref={(ref) => (this.ref = ref)}
          columns={CapturePtableColumns}
          data={this.state.data}
          rowClick={this.rowClick}
          options={options}
          data-custom-attr="test-custom-attribute"
          footerElement={<span>Footer</span>}
        />
        {/* <p>
          <a href="https://github.com/ngduc/react-tabulator" target="_blank">
            Back to: Github Repo: react-tabulator
          </a>
        </p> */}
        <ButtonToolbar>
              <Button
              // onClick={()=>{window.location.href =`/contentmanagement/capturep/detail?${this.state.selectedRound}&${this.state.selectedCapture}`}}
              onClick={this.goToDetailPage}

              variant="primary"
              style={{marginRight:"20px"}}
            >
             지도로 보기
            </Button>
          </ButtonToolbar>
      </div>
    );
  }
}

export default withRouter(Capture);
