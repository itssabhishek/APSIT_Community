import * as React from 'react';
// @mui
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';

InternshipDataGrid.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
};

export default function InternshipDataGrid({ rows, columns, loading }) {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row['_id']['$oid']}
        loading={loading}
        columns={columns}
        rows={rows}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Couldn't get any result. Please try to change domain.
            </Stack>
          ),
          NoResultsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Local filter returns no result
            </Stack>
          ),
        }}
      />
    </div>
  );
}
