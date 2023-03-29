import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const Table = (props) => {
  return(
        <MDBTable scrollY maxHeight='200px' bordered>
            <MDBTableHead>{props.head}</MDBTableHead>
            <MDBTableBody rows={ props.data } />
        </MDBTable>
  );
};

export default Table;