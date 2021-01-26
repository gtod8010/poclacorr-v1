import React ,{ Fragment } from 'react'
import MapComp from '../map/SnapMap'
import '../css/map.css';
class Home extends React.Component
{
    render(){
        return (
            <Fragment> 
                <MapComp/>
            </Fragment>

        )
    }
}
export default Home
