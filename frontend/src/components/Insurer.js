import React, {useEffect} from 'react';import { Redirect , Link} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from "axios";

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'location', label: 'Location', minWidth: 100 },
  {
    id: 'plan',
    label: 'Plan',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'payout',
    label: 'Payout',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'rainfall',
    label: 'Rainfall',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, location, plan, payout, rainfall) {
  return { name, location, plan, payout, rainfall };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Insurer() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    var tempRows = []
     axios.get("/contracts").then((res) => {
        var i;
        for(i = 0; i < res.length; i++) {
            // tempRows.push(createData('India', 'IN', 1324171354, 3287263))
            tempRows.push(createData(res[i].insuredId, res[i].location, res[i].coveragePlan, res[i].payOut, res[i].thresholds.rainfall));
            console.log(res[i].location);
        }
     })
     setRows(tempRows);
  }, [])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="container">
      <h3 className="m-0">
                <Link style={{ textDecoration: 'none' }} to="/">
                  {"DISASTER VIBES"}
                </Link>
              </h3>
        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Insurer List</h1>
          </div>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
    </div>
  );
}