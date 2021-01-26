import React from 'react';
import { ButtonToolbar , Button } from "react-bootstrap";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import axios from 'axios'
import { reactFormatter } from 'react-tabulator';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height : '100%',
    padding : '50',
    margin: '50px'
  },
});

const marks = [
    {
      value: 1,
      label: 'capture {\n} start',
    },
    {
      value: 2,
      label: 'capture finish',
    },
  ];

function valuetext(value) {
  return `${value}°C`;
}


class DoubleRangeSlider extends  React.Component {
  constructor(props) {
    super(props);

      this.state = {
      classes : useStyles,
      value : [this.props.starttime,this.props.endtime],
      // value : [,14.000],
      value2 : [0,99],
      geojson: this.props.geojson,
      geojsonPath: null
      // [value, setValue] : React.useState([1, 1000])
      }
    }
  handleChange = (e ,value) => {
    this.setState({value: value})
  }
  
  // shouldComponentUpdate(nextProps, nextState) {
    // if (this.props.isBlank !== nextProps.isBlank) {
    //   console.log('DBRangeSlider update Props', nextProps)
    //   this.setState({starttime : nextProps.starttime , endtime :nextProps.endtime})
    //   // return true;
    // // }
    // // if (this.state.isBlank !== nextState.isBlank) {
    //   console.log('DBRangeSlider update State', nextState)
    //   return true;
    // }
    // return false
  // }

  requestSlice(){
    let startTime = this.state.value[0]
    let endTime = this.state.value[1]
    axios({
        headers:{ "Content-Type": "application/json; charset=UTF-8" },
        method: 'post',
        data: {"start" : this.state.value[0], "end" : this.state.value[1]},
        url: `../../api/admin/contents/snap/one`,
        params: {id: this.props.uuid.substring(1)}
      })
      //정상 수행
      .then(returnData => {
        this.setState({geojsonPath: returnData.data.geojsonPath})
      })
      //에러
      .catch(err => {
        console.log(err);
      });
    };
  render(){
    return (
      <div className={'range-slider'}>
        <Typography id="range-slider" gutterBottom>

        </Typography>
        <Slider
          value={
            this.props.starttime === null
            ? this.state.value2
            // : [this.state.value[0],this.state.value[1]]
            : [this.props.starttime,this.props.endtime]
            // : [parseInt(this.state.value.starttime), parseInt(this.state.value.endtime)]
          //   // [parseInt(this.props.starttime), parseInt(this.props.endtime)]
          //  this.state.value

          }
          onChangeCommitted={function(){
            console.log(this.state.value[0],this.state.value[1])
            this.props.DataIE(this.state.geojson,this.state.value[0],this.state.value[1],this.state.geojsonPath);
          }.bind(this)}
          onChange={this.handleChange}
          // onClick={console.log(this.value)}
          valueLabelDisplay="on" 
          aria-labelledby="range-slider"
          step={0.001}
          // marks={marks}
          min={1}
          max={
            // this.props.endtime === null
            // ? this.state.value2.endtime
            // : this.props.endtime
            40
          } 
          getAriaValueText={valuetext}
        />
           {/* <Slider
            value={this.state.value2}
            onChange={this.testHandle}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            /> */}
        <ButtonToolbar>
              <Button
                variant="primary"
                style={{margin:"10px"}}
              >
              임시저장
              </Button>
              <Button
                onClick={this.requestSlice.bind(this)}
                variant="primary"
                style={{margin:"10px"}}
              >
              스냅 자르기
              </Button>
            </ButtonToolbar>
      </div>
    );
  }
}
export default DoubleRangeSlider