import { useEffect } from "react";
import type { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  contactList,
  deleteAsync,
  fetchAsync,
  page as pageState,
  deleted as deletedState,
  perPage,
  setPage,
  setPerPage,
} from "../store/slices/contactSlice";
import {
  Button,
  Grid,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  Typography,
  TablePagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { ContactData } from "../@types/contact";
import Link from "next/link";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(contactList);
  const limit = useAppSelector(perPage);
  const page = useAppSelector(pageState);
  const deleted = useAppSelector(deletedState);
  
  useEffect(() => {
    dispatch(fetchAsync({ perPage: limit, page }));
  }, [limit, page, deleted]);

  return (
    <Container maxWidth="md">
      <Grid
        container
        sx={{
          marginTop: 2,
        }}
      >
        <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
          <Typography variant="h1" sx={{ padding: 2, marginBottom: 2 }}>
            Contacts
          </Typography>
          <Button sx={{fontSize: 50}}>
            <Link href="/contact/new" style={{textDecoration: 'none'}}>
              +
            </Link>
          </Button>
        </div>
        <Table>
          <TableHead
            sx={{
              "& th": {
                fontWeight: "bold",
              },
            }}
          >
            <TableRow>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list &&
              list.results &&
              list.results.map((row: ContactData) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="left">{row.firstName}</TableCell>
                    <TableCell align="left">{row.lastName}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="right">
                      <div style={{display: "flex"}}>
                        <Link href={`/contact/${row.id}`}>
                            <Button sx={{ padding: 0, marginRight: 1, minWidth: "auto" }}>
                              <Edit />
                            </Button>
                        </Link>
                        <Button sx={{ padding: 0, minWidth: "auto" }} onClick={() => dispatch(deleteAsync(row.id))}>
                          <Delete />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter
            sx={{
              "& p": {
                marginBottom: 0,
              },
            }}
          >
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={5}
                count={list.count || 0}
                rowsPerPage={limit}
                page={page-1}
                onPageChange={(e, newPage) => dispatch(setPage(newPage+1))}
                onRowsPerPageChange={(e) => dispatch(setPerPage(e.target.value))}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>
    </Container>
  );
};

export default Home;
