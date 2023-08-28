import {
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import {
  Paper, Slide, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
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
  Scroller: forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
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
  isDesktop: PropTypes.bool,
  isSideOpen: PropTypes.bool,
  setSideOpen: PropTypes.func,
};


export default function MapSideList({ sgList, isDesktop, isSideOpen, setSideOpen, ...other }) {

  const [isDetailOpen, setDetailOpen] = useState(false);
  const [isListOpen, setListOpen] = useState(true);
  const [sgDetail, setSgDetail] = useState({});
  const [sgDayList, setSgDayList] = useState([]);

  const handleDetailMoreButtonClick = () => {
    setDetailOpen(true)
  }

  const handleListMoreButtonClick = () => {
    setListOpen(true)
  }



  return (
    <>
      {isDesktop && (
        <>
          <ToggleButtonGroup
            orientation="vertical"
            exclusive
            onChange={() => setSideOpen((prev) => !prev)}
            sx={{
              zIndex: 9, position: 'absolute', top: 'calc(50% - 35px)',
              left: isSideOpen ? 'calc(100% - (100% * 5 / 12) - 27px)' : 'calc(100% - 27px)',
              transition: 'left 0.01s ease-in-out',
              backgroundColor: '#FFFFFF',
              border: '0.7px solid rgba(0, 0, 0, 0.2)',
            }}
          >
            {isSideOpen ? (
              <ToggleButton value="right" aria-label="right aligned" sx={{ height: '70px', width: '30px' }}>
                <ChevronRight />
              </ToggleButton>
            ) : (
              <ToggleButton value="left" aria-label="left aligned" sx={{ height: '70px', width: '30px' }}>
                <ChevronLeft />
              </ToggleButton>
            )}
          </ToggleButtonGroup>
          <Slide direction="left" in={isSideOpen}>
            <Paper
              style={{
                position: 'absolute',
                top: 0,
                left: 'calc(100% - (100% * 5 / 12))',
                width: isSideOpen ? 'calc(100% * 5 / 12)' : '0',
                height: isSideOpen ? "500px" : "0px",
                zIndex: 10,
                borderLeft: '0.7px solid rgba(0, 0, 0, 0.2)',
              }}
            >
              <TableVirtuoso
                data={sgList}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
              />
            </Paper>
          </Slide>
        </>
      )}
    </>
  );
}
