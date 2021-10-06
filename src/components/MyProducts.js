import { useState, useEffect } from 'react';
import axios from 'axios';
// for table
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// for delete btn
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const useStyles2 = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
}));

function MyProducts() {
    const [products, setproducts] = useState([]);
    const [err, setErr] = useState(false);
    const classes = useStyles();
    const classes2 = useStyles2();

    // post token and get products posted by loggedin user
    useEffect(() => {
        const val = {
            "token" : localStorage.getItem("token")
        }
        axios
            .post("http://127.0.0.1:8000/product/my-products/", val)
            .then(response => {
              if(response.data === "NoToken") {
                setErr(true);
              } else {
                  setproducts(response.data)
              }
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    // to delete a product
    // send product id as a param
    function deleteProduct(id) {
      axios
        .delete("http://127.0.0.1:8000/product/delete-product/" + id + "/")
        .then(response => {
          setproducts(products.filter(item => item.id !== id));
        })
        .catch(error => {
          console.log(error);
        })
    }

    return (
      <div id="myprods-outer">
        {err ?
            <div id="notoken-error">
                <div id="notoken-text">Login To Access this page</div>
            </div> 
            :
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"><b>Product</b></TableCell>
                  <TableCell align="center"><b>Description</b></TableCell>
                  <TableCell align="center"><b>Price</b></TableCell>
                  <TableCell align="center"><b>Brought Before</b></TableCell>
                  <TableCell align="center"><b>Status</b></TableCell>
                  <TableCell align="center"><b>Delete</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell align="center" component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.brought_before}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">
                    <Grid id="p-delete-btn" container className={classes2.root}>
                        <Grid item xs={12}>
                            <div onClick={() => deleteProduct(row.id)}><DeleteIcon /></div>
                        </Grid>
                    </Grid>
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
        }
      </div>
    );
}
export {MyProducts};