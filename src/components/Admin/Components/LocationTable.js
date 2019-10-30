import React from 'react'
import { Table, makeStyles, Paper, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core';

const createData = (name, country, description) => {
  return { name, country, description };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

const rows = [
  createData('Seoul Insadong Village', 'Korea', 'Great place to experience Korean traditional culture'),
  createData('Seoul Insadong Village', 'Korea', 'Great place to experience Korean traditional culture'),
  createData('Seoul Insadong Village', 'Korea', 'Great place to experience Korean traditional culture'),
  createData('Seoul Insadong Village', 'Korea', 'Great place to experience Korean traditional culture'),
  createData('Seoul Insadong Village', 'Korea', 'Great place to experience Korean traditional culture'),
];

export default function LocationTable() {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Location Name</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}
