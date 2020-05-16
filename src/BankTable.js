import { Grid, Paper } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import StarIcon from '@material-ui/icons/Star';
import PropTypes from "prop-types";
import React from "react";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "bank_name", numeric: false, disablePadding: false, label: "Bank" },
  { id: "ifsc", numeric: false, disablePadding: false, label: "IFSC" },
  { id: "branch", numeric: false, disablePadding: false, label: "Branch" },
  { id: "bank_id", numeric: true, disablePadding: false, label: "Bank ID" },
  { id: "address", numeric: false, disablePadding: false, label: "Address" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell,index) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : (index == 1 || index == 2) ? 'right' : "center"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const loaderStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // paddingLeft:"70%",
    marginLeft:"75%",
    paddingTop:"5%",
  },

}));

export default function BankTable(props) {
  const { rows ,mode} = props;

  console.log(rows, "rows");

  const loaderClasses = loaderStyles();

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: mode ? 'dark' : 'light',
        },
      }),
    [mode],
  );

  return (
    <div className={classes.root}>
            <ThemeProvider theme={theme}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            {
              <TableBody >
                {rows && rows.length ? (
                  stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {

                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.name}
                        >
                          <TableCell component="right" id={index} scope="row" style={{ width: "20%" }} >
                          <Grid container md={12} lg={12} sm={12} >
                          <Grid item md={2} lg={2} sm={2} ><StarIcon style={{color:"yellow"}}/></Grid>
                          <Grid item md={10} lg={10} sm={10} >{row.bank_name}</Grid>
                          </Grid>
                            
                          </TableCell>
                          <TableCell align="right"  style={{ width: "15%" }} >{row.ifsc}</TableCell>
                          <TableCell align="right"  style={{ width: "20%" }} >{row.branch}</TableCell>
                          <TableCell align="right"  style={{ width: "15%" }} >{row.bank_id}</TableCell>
                          <TableCell align="right"  style={{ width: "30%" }} >{row.address}</TableCell>
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell align="center" >
                      <Grid className={loaderClasses.root}>
                        <CircularProgress />
                      </Grid>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            }
          </Table>
        </TableContainer>
        {rows && rows.length ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : null}
      </Paper>
      </ThemeProvider>
    </div>
  );
}
