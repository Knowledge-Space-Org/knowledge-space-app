import React, { Component } from "react";
import DataSpaceSearch from "features/dataSpace/DataSpaceSearch";

const DataSpacePage = (props) => {
  const {source } = props.match.params;
  const params = new URLSearchParams(props.location.search); 
  const slug = params.get('q'); // bar
  return <DataSpaceSearch slug={slug} source={source} dataSpace={{}} />;
};

export default DataSpacePage;
