import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

import { values, keys, get, isArray, has } from "lodash";
import { Card, CardContent, CardActions, CardHeader } from "@material-ui/core";

import DataSpaceDialogeResult from "./DataSpaceResultDialog";

const styles = (theme) => ({
  root: {},
  cardParent: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "100%",
    alignItems: "flex-start",
    border: "1px solid #CCC",
    margin: "10px",
  },
  heading: {
    display: "flex",
    alignItems: "center",
    paddingRight: theme.mixins.gutters().paddingRight * 1.5,
    paddingLeft: theme.mixins.gutters().paddingLeft * 1.5,
  },
  total: {
    marginLeft: "auto",
  },
  cardHeader : {
    display: "flex",
  },
  cardHeaderLink : {
    position: "absolute",
    right: "15px"
  }
});

const cellValue = (value = "", source = null, key = null) => {
  if (isArray(value)) {
    return value.join("; ");
  }
  return value;
};

const getDataSourceUrl = (hit) => {
  // if (hit.index === "scr_017612_ebrains") {
  //   return createDataURLForEbrains(hit._source);
  // } else {
    return get(hit._source, "dc.identifier");
 // }
};

// fix: Specific to EBRAINS
const createDataURLForEbrains = (source) => {
  const id = source.item ? source.item.id : null;
  return "https://kg.ebrains.eu/search/instances/Dataset/" + id;
};

const setDialogState = (dialogState) => {
  this.setState({
    dialogState,
    ...this.state
  })
}


const DataSpaceFreeTextResults = ({
  hits,
  classes,
  columns,
  page,
  handlePageChange,
  index,
  slug,
}) => {
  const results = has(hits, "hits") ? hits.hits : [];
  const total = has(hits, "total") ? hits.total.value : 0;
  let elem = null;
  if (hits && hits.total) {
    elem = get(hits.total, "value") || 0;
  } else {
    elem = get(hits, "total") || 0;
  }

  const getCardTitle = (hit) => {
      return (
           <a className = {classes.cardHeaderLink}
           href="#"
           onClick={(ev) => {
             ev.preventDefault();
             ev.stopPropagation();
             handleClickOpen(hit);
           }}
         >
           {" "}
           View more{" "}
         </a>
      )
  }

  const [dialogState, setDialogState] = React.useState({
    isDialgueOpen: false,
    entityData: null,
  });

  const handleClickOpen = (data) => {
    setDialogState({ isDialgueOpen: true, entityData: data });
  };
  const handleClose = () => {
    setDialogState({ isDialgueOpen: false, entityData: null });
  };

  return (
    <>
    <div className={classes.root}>
      <div variant="subtitle1" className={classes.heading}>
        <Typography variant="h4">Data Results: {slug}</Typography>
        <div className={classes.total}>{elem} records found</div>
      </div>
      <Divider classes={{ root: classes.divider }} />
      {results.map((hit) => (
        <Card
          className={classes.cardParent}
          key={hit._source.id}
          variant="outlined"
        >
          <CardHeader
            component = "div"
            className={classes.cardTitle}
            title={cellValue(
              get(hit._source, "dc.title"),
              hit._source,
              "dc.title"
            )}
            action = {
              getCardTitle(hit)
            }
          >
          </CardHeader>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              <a href={getDataSourceUrl(hit)} target="_blank">
                {getDataSourceUrl(hit)}
              </a>
            </Typography>
            <Typography variant="body2" component="p"></Typography>
          </CardContent>
        </Card>
      ))}
      <TablePagination
        rowsPerPageOptions={[25]}
        component="div"
        count={total}
        rowsPerPage={25}
        page={page}
        backIconButtonProps={{
          "aria-label": "Previous Page",
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page",
        }}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={() => {}}
      />
    </div>
     {dialogState.isDialgueOpen && (
      <DataSpaceDialogeResult
        isOpen={dialogState.isDialgueOpen}
        onClose={handleClose}
        entityData={dialogState.entityData}
      ></DataSpaceDialogeResult>
    )}
    </>
  );
};

export default withStyles(styles)(DataSpaceFreeTextResults);
