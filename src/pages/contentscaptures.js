import React,{ Fragment } from 'react'
// import RawTable from '../components/RawTable'
// import CaptureTable from '../components/CapturePTable'
import CaptureDetailTable from '../components/CaptureDetailTable'
import MapComp from '../map/SnapMap'
import DoubleRangeSlider from '../components/DoubleRangeSlider'
// import IconButton from '../components/IconButton'
import CaptureDetailList from '../components/CaptureDetailList'
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';

class LeftContentsDiv extends React.Component  {
  render(){
    return (
            <div className="LeftContentsDiv">
                    <Fragment> 
                      <MapComp DataIE = {function (geojson,starttime,endtime,geojsonPath) {
                        this.props.DataIE(geojson,starttime,endtime,geojsonPath)
                        }.bind(this)}
                        geojson = {this.props.geojson} 
                        starttime = {this.props.starttime} 
                        endtime = {this.props.endtime}
                        geojsonPath ={this.props.geojsonPath}
                        uuid = {this.props.uuid}
                />
                   </Fragment>
                   <h3 style={{textAlign:'center'}}>Capture(P)</h3>  
                    <Divider/>
                    <CaptureDetailList/> 
                   <AddIcon style={{fontSize: 40 }}/>
              </div>
        );
      }
  }

class RightContentsDiv extends React.Component {
  // constructor(props){
  //   super(props);

  //   this.state = {
  //       value: Math.round(Math.random()*100)
  //   };

  //   this.updateValue = this.updateValue.bind(this);
  // }

  render(){
    return (
        <div className="RightContentsDiv">
                <CaptureDetailTable DataIE = {function (data) {
                 alert('size'+ data)
               }.bind(this)}
               uuid = {this.props.uuid}
               />
                <DoubleRangeSlider DataIE = {function (geojson,starttime,endtime,geojsonPath) {
                        this.props.DataIE(geojson,starttime,endtime,geojsonPath)
                        }.bind(this)}
                    geojson = {this.props.geojson} 
                    starttime = {this.props.starttime} 
                    endtime = {this.props.endtime}
                    geojsonPath ={this.props.geojsonPath}
                    uuid = {this.props.uuid}
                />
        </div>
    );
  }
}
  function SplitPane(props) {
    return (
      <div className="SplitPane">
        <div className="SplitPane-left">
          {props.left}
        </div>
        <div className="SplitPane-right">
          {props.right}
        </div>
      </div>
    );
  }
  
class contentscaptures extends React.Component {
  state = {geojson:null , starttime: null ,endtime: null, gejosnPath: null, uuid:this.props.location.search }
  
  render(){
    return (
        <SplitPane
           left={
               <LeftContentsDiv DataIE = {function (geojson,starttime,endtime,geojsonPath) {
                  this.setState({geojson:geojson,starttime:starttime,endtime:endtime,geojsonPath});
                }.bind(this)}
                geojson = {this.state.geojson} 
                starttime = {this.state.starttime} 
                endtime = {this.state.endtime}
                geojsonPath ={this.props.geojsonPath}
                uuid = {this.state.uuid}
               />
           }
           right={
              <RightContentsDiv DataIE = {function (geojson,starttime,endtime,geojsonPath){
                 this.setState({geojson:geojson,starttime:starttime,endtime:endtime,geojsonPath})
              }.bind(this)}
              geojson = {this.state.geojson} 
              starttime = {this.state.starttime} 
              endtime = {this.state.endtime}
              geojsonPath ={this.props.geojsonPath}
              uuid ={this.state.uuid}
              />
              
            } />
   )
  }
}

export default contentscaptures
