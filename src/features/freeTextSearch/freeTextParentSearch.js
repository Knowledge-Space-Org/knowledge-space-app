import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";
import { isEmpty, deburr } from "lodash";
import keycode from "keycode";
import Downshift from "downshift";
import Grid from "@material-ui/core/Grid";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/styles/colorManipulator";

import { Button, TextField, Input } from "@material-ui/core";

class FreeTextParent extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: props.searchText };
  }
  renderInput({ classes, inputProps }) {
    return <InputBase classes={classes} inputProps={inputProps} />;
  }

  handleSearchValueUpdate = (e) => {
    this.setState({
      searchText: e.target.value,
    });
  };

  handleSubmit = (event) => {
    this.props.handleSubmit(event, this.state.searchText);
  };

  render() {
    const { classes } = this.props;
    const renderInput = this.renderInput;

    return (
      // <Downshift id="autosuggest" onSelect={onSelect}>
      //   {({
      //     getInputProps,
      //     getItemProps,
      //     getMenuProps,
      //     highlightedIndex,
      //     inputValue,
      //     isOpen,
      //     selectedItem,
      //   }) => (
      <div className={classes.search}>
        <form onSubmit={this.handleSubmit}>
          <div
            className={classes.spacingClass}
            style={{
              cursor: "text",
              display: "flex",
              alignItems: "center",
            }}
          >
            {renderInput({
              classes: {
                root: classes.inputRoot,
                input: classes.inputInput,
              },
              inputProps: {
                "aria-label": "naked",
                classes: { input: classes.SearchInput },
                className: classes.SearchInput,
                placeholder: "Search KnowledgeSpace",
                onChange: this.handleSearchValueUpdate,
                value: this.state.searchText,
              },
            })}
            {/* <SearchIcon onClick={handleSubmit} classes={{root: classes.searchIcon}}/> */}
            <Button
              variant="outlined"
              className={classes.searchButton}
              onClick={this.handleSubmit}
            >
              Search
            </Button>
          </div>
        </form>
      </div>
      //   )}
      // </Downshift>
    );
  }
}

const mapStateToProps = ({ autosuggest }) => {
  return { ...autosuggest };
};

export default connect(mapStateToProps)(FreeTextParent);
