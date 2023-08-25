import PropTypes from 'prop-types';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

const sample = [
  ['Frozen yoghurt', 159, 6.0, 24, 4.0],
  ['Ice cream sandwich', 237, 9.0, 37, 4.3],
  ['Eclair', 262, 16.0, 24, 6.0],
  ['Cupcake', 305, 3.7, 67, 4.3],
  ['Gingerbread', 356, 16.0, 49, 3.9],
];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

const columns = [
  {
    width: "20%",
    label: '영화',
    dataKey: 'Name',
  },
  {
    width: "20%",
    label: '극장',
    dataKey: 'Theater',
    numeric: true,
  },
  {
    width: "20%",
    label: '날짜',
    dataKey: 'ShowDate',
    numeric: true,
  },
  {
    width: "20%",
    label: '시간',
    dataKey: 'ShowTime',
    numeric: true,
  },
  {
    width: "20%",
    label: '예매',
    dataKey: 'd',
    numeric: true,
  },
];

const rows = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="center"
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <>
      {columns.map((column, i) => (
        <TableCell
          key={column.dataKey}
          align="center"
        >
        {
            i === 0 && row.Movie[column.dataKey]
                ? row.Movie[column.dataKey]
                : row[column.dataKey]
        }
        </TableCell>
      ))}
    </>
  );
}

MapSideList.propTypes = {
    sgList: PropTypes.array.isRequired,
};


export default function MapSideList({ sgList, ...other }) {
  return (
    <Paper style={{ height: "500px", width: '100%' }}>
      <TableVirtuoso
        data={sgList}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
