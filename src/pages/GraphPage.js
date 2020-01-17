import React, { Component } from 'react';
import { Input, Button } from '@material-ui/core';
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
    if (this.state.searchText) {
      this.props.dispatch(submitBrainRegionSearch({ searchText: this.state.searchText }))
    }
  }

  handleBrainRegionClick = (e) => {
    const nodeData = e.original;
    console.debug("check node data");
    console.debug(nodeData);
    this.setState({
      ...this.state,
      searchText: nodeData.id,
    })
    this.props.dispatch(submitBrainRegionSearch({ searchText: nodeData.id }))
  }

  handleSearchChange = (e) => {
    this.setState({
      ...this.state,
      searchText: e.target.value,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <div>
          <Input
            placeholder="Enter a term..."
            id="docsearch-input"
            onChange={this.handleSearchChange}
            value={this.state.searchText}
            inputRef={ref => {
              this.inputRef = ref;
            }}
          />
          <Button onClick={this.handleSearchClick}>Search</Button>
        </div>
        {this.props.graphData.nodes.length && <DagreGraph
          nodes={this.props.graphData.nodes}
          links={this.props.graphData.links}
          rankdir='LR'
          width='1250'
          height='700'
          animate={2000}
          shape='rect'
          nodesep = {50}
          edgesep = {30}
          ranksep = {100}
          zoomable={true}
          fitBoundaries
          className="brain-region-graph"
          onNodeClick={this.handleBrainRegionClick}
          onRelationshipClick={e => console.log(e)}
        />}
      </React.Fragment>
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
      const nodeObj_child = prepareNodeObj(details[0]);
      allNodes.push(nodeObj_child);
      const nodeObj_term = prepareNodeObj(details[1]);
      allNodes.push(nodeObj_term);
      const nodeObj_parent = prepareNodeObj(details[2]);
      allNodes.push(nodeObj_parent);
      const edge_child_term = prepareEdgeObj(details[0], details[1]);
      allEdges.push(edge_child_term);
      const edge_term_parent = prepareEdgeObj(details[1], details[2]);
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
