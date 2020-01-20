import React, { Component } from 'react';
import { Input, Button, TextField } from '@material-ui/core';
import { submitBrainRegionSearch } from '../features/brainRegion/brainRegionSearchActions';
import { connect } from 'react-redux';
import '../features/brainRegion/brainRegionSearch.css';
import DagreGraph from '../common/components/dagre-graph/dagre-graph';


class GraphPage extends Component {
  constructor(props) {
    super(props)
    this.state = { searchText: "" }
  }

  prepareGraphData = () => {
    console.debug("check results");
    console.debug(this.props.graphData);
  }

  componentDidUpdate = () => {
    console.debug("check results");
    console.debug(this.props.graphData);
  }

  handleSearchClick = () => {
    if (this.inputRef.value) {
      this.props.dispatch(submitBrainRegionSearch({ searchText: this.inputRef.value }))
    }
  }

  handleBrainRegionClick = (e) => {
    const nodeData = e.original;
    console.debug("check node data");
    console.debug(nodeData);
    this.inputRef.value = nodeData.id;
    this.setState({
      ...this.state,
      searchText: nodeData.id,
      lastUpdatedSearchText: nodeData.id
    })
    this.props.dispatch(submitBrainRegionSearch({ searchText: nodeData.id }))
  }

  // shouldComponentUpdate = (props,state) => {
  //   debugger;
  //   if(!this.state.lastUpdatedSearchText || this.state.lastUpdatedSearchText != state.lastUpdatedSearchText){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // } 

  render() {
    const { classes } = this.props
    return (
      <div>
        <div className="search-box-wrapper">
          <TextField
            placeholder="Enter a term..."
            id="docsearch-input"
            onChange={this.handleSearchChange}
            inputRef={ref => {
              this.inputRef = ref;
            }}
          />
          <Button variant="contained" color="primary" onClick={this.handleSearchClick}>Search</Button>
        </div>
        <div className="graph-parent-wrapper">
          {this.props.graphData.nodes.length > 0 ? <DagreGraph
            nodes={this.props.graphData.nodes}
            links={this.props.graphData.links}
            rankdir='LR'
            width='1500'
            x='0'
            y='0'
            height='650'
            animate={2000}
            shape='rect'
            nodesep={50}
            edgesep={30}
            ranksep={100}
            zoomable={true}
            fitBoundaries
            className="brain-region-graph"
            onNodeClick={this.handleBrainRegionClick}
            onRelationshipClick={e => console.log(e)}
          /> : <div className="no-results">No relation present</div>}
        </div>
      </div>
    )
  }
}

const prepareNodeObj = (nodeData) => {
  return {
    id: nodeData,
    label: nodeData
  }
}


const prepareEdgeObj = (sourceData, targetData) => {
  return {
    source: sourceData,
    target: targetData
  }
}

const transformDataForLayout = (graphData) => {
  const finalData = { nodes: [], links: [] };
  const allNodes = [];
  const allEdges = [];
  if (graphData && graphData.length) {
    for (const dataObj of graphData) {
      const details = dataObj._fields;
      const nodeObj_child = prepareNodeObj(details[2]);
      allNodes.push(nodeObj_child);
      const nodeObj_term = prepareNodeObj(details[1]);
      allNodes.push(nodeObj_term);
      const nodeObj_parent = prepareNodeObj(details[0]);
      allNodes.push(nodeObj_parent);
      const edge_child_term = prepareEdgeObj(details[2], details[1]);
      allEdges.push(edge_child_term);
      const edge_term_parent = prepareEdgeObj(details[1], details[0]);
      allEdges.push(edge_term_parent);
    }
  }
  finalData.nodes = allNodes;
  finalData.links = allEdges;
  return finalData;
}

const mapStateToProps = ({ brainRegionSearch }, ownProps) => {
  console.debug("map state after brain region search");
  console.debug(brainRegionSearch);
  return { graphData: transformDataForLayout(brainRegionSearch.graphData) };
}

export default connect(mapStateToProps)(GraphPage)
