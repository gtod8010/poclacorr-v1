import React,{ Fragment } from 'react'
import RawTable from '../components/RawTable'
import CaptureTable from '../components/CapturePTable'
import CaptureDetailTable from '../components/CaptureDetailTable'
import MapComp from '../map/SnapMap'
import DoubleRangeSlider from '../components/DoubleRangeSlider'
import IconButton from '../components/IconButton'
import CaptureDetailList from '../components/CaptureDetailList'
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';

function Contacts() {
    return (
            <div className="Contacts">
                    <Fragment> 
                      <MapComp/>
                   </Fragment>
                   <h3 style={{ marginLeft: 40 }}>Capture(RAW)</h3>  
                   <Divider/>
                    <CaptureDetailList/>
                   <AddIcon style={{fontSize: 40 }}/>
              </div>
        );
  }

  function Chat() {
    return (
        <div className="Chat">
                <CaptureDetailTable/>
                <DoubleRangeSlider/>
        </div>
    );
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



export const Raw = () => {
    return (
            <RawTable/>
    );     
}

export const CreateSnap = () => {
    return (
         <SplitPane
            left={
                <Contacts />
            }
            right={
                <Chat />
             } />
    )
}

export const Capture = () => {
    return (
        <CaptureTable/>
    )
}

export const Snap = () => {
    return (
             <RawTable/>
    )
}


class ContentManagement extends React.Component {
    render(){
      return (
          <div className='contentmanagement'>
              <h1>ContentManagement</h1>
          </div>
      )
   }
}

export default ContentManagement