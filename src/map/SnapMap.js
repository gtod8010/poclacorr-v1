import React, { Component } from "react";
// OlMap,OlView,OlLayerTile, OlSourceOSM
import {Map,View} from "ol";
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat,transformExtent,transform} from 'ol/proj'
import geoJsonExam from '../map/geodata/new.geojson'
import axios from 'axios'

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

import GeoJSON from 'ol/format/GeoJSON'

class SnapMap extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      center: fromLonLat([14123883.935406119,4521200.7642],"EPSG:4326"),
      zoom: 18 ,
      layer: [],
      source: [],
      geojsonPath: null,
      geojson: null,
      starttime: '',
      endtime: ''
    };

    this.map = new Map({
        target: null,
        layers: [
            new TileLayer({
              source: new OSM(),
              name:'BaseTileLayer'
            }),
          ],
        view: new View({
          center: this.state.center,
          zoom: this.state.zoom
        })
      });
  }

  updateMap() {
    this.map.getView().setCenter(this.state.center);
    this.map.getView().setZoom(this.state.zoom);
  }

  componentDidMount() {
    this.getGeoJSONPath();
    this.map.setTarget("map1");
    console.log(this.props)

    // Listen to map changes
    this.map.on("moveend", () => {
      console.log('moveend')
      let center = this.map.getView().getCenter();
      let zoom = this.map.getView().getZoom();
      this.setState({ center, zoom });
      });
  }
  result = [];

  getSnapTimesearch(response, result){
    let StartTime,EndTime;
    response.forEach(function(item, index){
      if(index == 0){
        StartTime = item['properties'].time_start
      }
      if(index == response.length - 1){
        EndTime =item['properties'].time_end
      }
    })
    this.setState ({starttime :StartTime}) 
    this.setState ({endtime :EndTime}) 
    console.log(StartTime , EndTime)
}

  async getGeoJSONPath(){
    console.log(this.props.uuid)
    try{
        await axios({
          method: 'get',
          url: `/api/admin/contents/capturep/one?id=${this.props.uuid.substring(1)}`,
        })
          .then((response) => {
            console.log(response.data.geojsonPath)          
              this.setState({geojsonPath : response.data.geojsonPath}
            );
          })
        }catch(error){
          console.log(error)
        }
        
  }

  getGeoJSON(){
   try{
      axios({
        method: 'post',
        data: {"path" : this.state.geojsonPath},
        url: `/api/admin/contents/capturep/one/getGeojson`, 
      })
        .then((response) => {
          this.setState({geojson :response.data.geoJSON})
          this.setState({source : new VectorSource
            ({features: new GeoJSON().readFeatures(response.data.geoJSON)})})
          this.setState({layer: new VectorLayer
            ({name:'baseVectorLayer',source: this.state.source})}) 
          this.getSnapTimesearch(response.data.geoJSON.features,this.result)
          if(this.state.layer != null && this.state.source != null){
            this.loadGeoJSON()
          }
        })
      }catch(error){
        console.log(error)
      }
  }
  
  loadGeoJSON(){
    let baseLayer = this.state.layer
      if(this.map.getLayers().array_.length == 1){
        console.log(baseLayer)
        this.map.addLayer(baseLayer)
      }
    this.props.DataIE(this.state.geojson,this.state.starttime,this.state.endtime)
  }

  clearVectorLayer(){
    this.map.getLayers().forEach(layer => {
        if(layer != undefined){
          if (layer.get('name') && layer.get('name') == 'baseVectorLayer' || layer.get('name') == 'newVectorLayer'){
              this.map.removeLayer(layer)
          }
        }
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    let center = this.map.getView().getCenter();
    let zoom = this.map.getView().getZoom();
    let length = nextState.source.ol_uid;
    let origin = this.state.source.ol_uid;

    if(this.state.geojson == null){
      this.getGeoJSON()
      return false;
    }
    if(length != origin && origin != undefined){
      console.log(origin,length)
      this.loadGeoJSON()

    }

    if (center === nextState.center && zoom === nextState.zoom) {
      return false;
    }

    return true;
  }
  async getNewVector(starttime,endtime){
    console.log(starttime,endtime)
    this.clearVectorLayer();
      try{
        await axios({
            method: 'post',
            data: {"path" : this.state.geojsonPath,"start":starttime,"end":endtime},
            url: `/api/admin/contents/capturep/one/sliceGeojson`, 
          }).then((response) => {
              this.setState({source : new VectorSource
                ({features: new GeoJSON().readFeatures(response.data.geoJSON)})})
              this.setState({layer: new VectorLayer
                ({name:'newVectorLayer', source: this.state.source})})
                // let newVectorSource = new VectorSource({feature:new GeoJSON().readFeatures(response.data.geoJSON)})
                // let newlayer = new VectorLayer({name:'newVectorLayer' , source: newVectorSource})
                // console.log(response.data.geoJSON)
                // console.log(newlayer)
                // this.map.addLayer(newlayer)
           })
         }catch(error){
           console.log(error)
         }
    } 

  componentWillReceiveProps(nextProps){
    if(nextProps.endtime != this.state.endtime && nextProps.starttime != this.state.starttime){
      this.getNewVector(nextProps.starttime,nextProps.endtime)
      this.setState({endtime : nextProps.endtime})
      return false;
    }

    return true;
  }

  userAction() {
    this.setState({ center: [546000, 6868000], zoom: 5 });
  }

  render() {
    this.updateMap(); // Update map on render?
    return (
      <div id="map1"style={{ width: "100%", height: "600px",paddingRight:"20px",paddingBottom:"20px"}}>
         {/* <button onClick={(e) => 
              this.getGeoJSON()
          }>setState on click</button>  */}
             {/* <button onClick={(e) => 
              this.loadGeoJSON()
          }>setState on click2</button>   */}
          {/* <button onClick={function(){
            console.log(this.state.starttime, this.state.endtime)
            this.props.DataIE(this.state.geojson,this.state.starttime,this.state.endtime);
          }.bind(this)}>setState on click3</button>  */}
        
      </div>
      
    );
  }
}

export default SnapMap;
