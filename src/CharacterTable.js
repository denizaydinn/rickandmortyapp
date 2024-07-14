import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableRow, TableHead, TablePagination } from '@mui/material';
import Pagination from './Pagination';
const CharacterTable = ({ characters, onCharacterSelect }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(250);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Species</TableCell>
            <TableCell>Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((character) => (
              <TableRow
                key={character.id}
                hover
                onClick={() => onCharacterSelect(character)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{character.name}</TableCell>
                <TableCell>{character.status}</TableCell>
                <TableCell>{character.species}</TableCell>
                <TableCell>{character.gender}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 50, 100, 250]} 
        component="div"
        count={characters.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
     
    </>
  );
};

export default CharacterTable;
