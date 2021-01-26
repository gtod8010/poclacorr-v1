import React from "react";
import { ButtonToolbar , Button } from "react-bootstrap";
import "../styles.css";

import DateEditor from "react-tabulator/lib/editors/DateEditor";
import MultiValueFormatter from "react-tabulator/lib/formatters/MultiValueFormatter";
// import MultiSelectEditor from "react-tabulator/lib/editors/MultiSelectEditor";

import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

// for React 16.4.x use: import { ReactTabulator } - example in github repo.
import { React15Tabulator, reactFormatter } from "react-tabulator"; // for React 15.x

function SimpleButton(props) {
  const rowData = props.cell._cell.row.data;
  const cellValue = props.cell._cell.value || "Edit | Show";
  return <button onClick={() => alert(rowData.name)}>{cellValue}</button>;
}

const data = [
  {
    Storage: '101NAS',
    Rounds: "round[{YYYYMMDDhhmmss}_{seq3}] caputre[{seq2}]",
    RawCapture: " caputre[03]",
    date: "01/01/1980",
    rating: 5,
    Status: ["todo", "doing"],
    Equipment: "v101",
    passed: true,

  },
  {
    Storage: '101NAS',
    Rounds: "round[{YYYYMMDDhhmmss}_{seq3}] caputre[{seq2}]",
    RawCapture: " caputre[04]",
    date: "12/05/1989",
    Status: ["todo"],
    Equipment: "v101",
    passed: true,

  },
  {
    Storage: '102NAS',
    Rounds: "round[{YYYYMMDDhhmmss}_{seq3}] caputre[{seq2}]",
    RawCapture: " caputre[05]",
    date: "10/05/2020",
    Status: ["todo"],
    Equipment: "v101",
    passed: true,

  },
  {
    Storage: '123NAS',
    Rounds: "round[{YYYYMMDDhhmmss}_{seq3}] caputre[{seq2}]",
    RawCapture: " caputre[06]",
    date: "11/08/2020",
    Status: ["todo"],
    Equipment: "v102",
    passed: false,

  },
  {
    Storage:'155NAS',
    Rounds: "round[{YYYYMMDDhhmmss}_{seq3}] caputre[{seq2}]",
    RawCapture: " caputre[07]",
    date: "07/01/2020",
    Status: ["doing"],
    Equipment: "v102",
    passed: false,

  },
  {
    Storage: '123NAS',
    Rounds: "round[{YYYYMMDDhhmmss}_{seq3}]",
    RawCapture: " caputre[01]",
    date: "01/10/2021",
    rating: 4,
    Status: ["doing"],
    Equipment: "v102",
    passed: false,
  },
  {
    Storage: '101NAS',
    Rounds: "round[{YYYYMMDDhhmmss}_{seq3}] caputre[{seq2}]",
    RawCapture: " caputre[02]",
    date: "12/10/2020",
    rating: 4,
    Status: ["doing"],
    Equipment: "v102",
    passed: false,
  }
];

// Editable Example:
const colorOptions = {
  "": "&nbsp;",
  red: "red",
  green: "green",
  yellow: "yellow"
};
const petOptions = [
  { id: "cat", name: "cat" },
  { id: "dog", name: "dog" },
  { id: "fish", name: "fish" }
];
const rawtableColumns = [
  {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center",width:50, headerSort:false, cellClick:function(e, cell){
    cell.getRow().toggleSelect()
  }},
  {
    title: "Storage",
    field: "Storage",
    width: 100,
    headerFilter: "input"
  },
  {
    title: "Rounds",
    field: "Rounds",
    width: 400,
    hozAlign: "center",
    formatter: "input",
  },
  {
    title: "RawCapture",
    field: "RawCapture",
    headerFilter: "input"
  },
  {
    title: "Status",
    field: "Status",
    sorter: (a, b) => a.toString().localeCompare(b.toString()),
    // editor: MultiSelectEditor,
    editorParams: { values: petOptions },
    formatter: MultiValueFormatter,
    formatterParams: { style: "PILL" }
  },
  {
    title: "Date",
    field: "date",
    width: 150,
    headerFilter: "input",
    editorParams: { format: "MM/DD/YYYY" }
  },
  {
    title: "Equipment",
    field: "Equipment",
    width: 100,
    editor: "input",
    headerFilter: "input"
  },
  {
    title: "Passed?",
    field: "passed",
    hozAlign: "center",
    formatter: "tickCross",
    editor: true
  }
];

class Raw extends React.Component {
  state = {
    data: [],
    selectedName: ""
  };
  ref = null;

  // columns = [
  //   { title: "Name", field: "name", width: 150 },
  //   { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
  //   { title: "Favourite Color", field: "color" },
  //   { title: "Date Of Birth", field: "dob" },
  //   { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
  //   {
  //     title: "Passed?",
  //     field: "passed",
  //     hozAlign: "center",
  //     formatter: "tickCross"
  //   },
  //   {
  //     title: "Custom",
  //     field: "custom",
  //     hozAlign: "center",
  //     editor: "input",
  //     formatter: reactFormatter(
  //       <SimpleButton
  //         onSelect={(name) => {
  //           this.setState({ selectedName: name });
  //           alert(name);
  //         }}
  //       />
  //     )
  //   }
  // ];

  rowClick = (e, row) => {
    console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
    console.log(`rowClick id: \${row.getData().id}`, row, e);
    this.setState({ selectedName: row.getData().name });
  };

  setData = () => {
    this.setState({ data });
  };

  clearData = () => {
    this.setState({ data: [] });
  };

  render() {
    const options = {
      height: 300,

    };
    return (
      <div>
        <React15Tabulator
          ref={(ref) => (this.ref = ref)}
          columns={rawtableColumns}
          data={data}
          rowClick={this.rowClick}
          options={options}
          data-custom-attr="test-custom-attribute"
          // footerElement={<span>Footer</span>}
        />
        {/* <p>
          <a href="https://github.com/ngduc/react-tabulator" target="_blank">
            Back to: Github Repo: react-tabulator
          </a>
        </p> */}
        <ButtonToolbar>
              <Button
              onClick={this.setData}
              variant="primary"
            >
              geoxyz 배치 처리 요청
            </Button>

            <Button
              onClick={this.clearData}
              variant="primary"
            >
              해당 capture 페이지 이동
            </Button>
          </ButtonToolbar>
      </div>
    );
  }
}

export default Raw;
