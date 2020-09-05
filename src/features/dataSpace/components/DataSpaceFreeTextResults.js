import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

import { values, keys, get, isArray, has } from "lodash";
import { Card, CardContent, CardActions, CardHeader } from "@material-ui/core";

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
});

const cellValue = (value = "", source = null, key = null) => {
  if (isArray(value)) {
    return value.join("; ");
  }
  return value;
};

const getDataSourceUrl = (hit) => {
  if (hit.index === "scr_017612_ebrains") {
    return createDataURLForEbrains(hit._source);
  } else {
    return get(hit._source, "dc.identifier");
  }
};

// fix: Specific to EBRAINS
const createDataURLForEbrains = (source) => {
  const id = source.item ? source.item.id : null;
  return "https://kg.ebrains.eu/search/instances/Dataset/" + id;
};

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

  return (
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
            title={cellValue(
              get(hit._source, "dc.title"),
              hit._source,
              "dc.title"
            )}
          >
            Date item
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
  );
};

export default withStyles(styles)(DataSpaceFreeTextResults);
