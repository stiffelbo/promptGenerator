import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Alert, TableFooter } from '@mui/material';

// Utility function to format header
const formatHeader = (header) => {
  const headerWithSpaces = header.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1');
  return headerWithSpaces.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Function to generate a schema from data if not provided
const generateDefaultSchema = (data) => {
  if (!data || data.length === 0) return [];
  return Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: formatHeader(key),
    cellStyle: {},
    cellType : '',
  }));
};

// Function to check if a value is non-primitive and should be stringified
const displayValue = (value) => {
  if (value && typeof value === 'object') {
    return JSON.stringify(value, null, 2); // Pretty print objects and arrays
  }
  return value;
};

const TableDynamic = ({ data, sumColls = [], schema = [], currentItemID = '', onRowClick = () => {} }) => {
  schema = schema && schema.length > 0 ? schema : generateDefaultSchema(data);

  const calculateSums = () => {
    return sumColls.map(col => data.reduce((sum, row) => sum + (parseFloat(row[col]) || 0), 0));
  };

  const sums = calculateSums();

  const handleRowClick = (row) => onRowClick(row);

  if (data.length === 0) {
    return <Alert severity="warning">No data provided for the table.</Alert>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="dynamic table">
        <TableHead>
          <TableRow>
            {schema.map((column, index) => (
              <TableCell key={index} sx={{fontWeight: 600, backgroundColor : '#CACCCE', ...column.cellStyle}}>{column.headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} onClick={() => handleRowClick(row)}>
              {schema.map((column, columnIndex) => (
                <TableCell key={`${rowIndex}-${columnIndex}`} style={column.cellStyle}>
                  {displayValue(row[column.field])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        {sumColls.length > 0 && (
          <TableFooter>
            <TableRow>
              {sumColls.map((col, index) => (
                <TableCell key={index}>{formatHeader(col)}: {sums[index].toFixed(2)}</TableCell>
              ))}
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

export default TableDynamic;
