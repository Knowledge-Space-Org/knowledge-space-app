import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import TableRow from "@material-ui/core/TableRow";


import { values, keys, get, isArray, has, sortBy,isString } from "lodash";

const cellValue = (value = "", source = null, key = null) => {
  if (isArray(value)) {
    return value.join("; ");
  }
  return isString(value) ? value : JSON.stringify(value);
};
 const DataSpaceDialogeResult = ({isOpen,onClose,entityData, fullScreen}) => {
  console.debug("Check entity data");
  console.debug(entityData);
  return (
    <Dialog
      fullWidth={true}
      maxWidth = {'lg'}
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <DialogTitle id="customized-dialog-title" onClose={onClose}>
          Details 
      </DialogTitle>
      <DialogContent>
        <Table>
            <TableBody>
            {keys(entityData._source).sort().map((key, i) => (

              <TableRow key={i}>
                <TableCell>
                    {key}
                </TableCell>
                <TableCell>
                 {cellValue(get(entityData._source, key), entityData._source, key)
                 }
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DataSpaceDialogeResult;