import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const SummaryTable = (props) => {

  const [dataSource, setDataSource] = useState([{customerId: '', customerName: '', productId: '', productName: '', date: '', id: ''}]);
  const tableHeaders = ['Customer', 'Product', 'Purchase Date'];

  useEffect(() => {
    setDataSource(props.data);
  }, [props, dataSource] );

  return (
    <div>
    <h1>Summary Table</h1>
        <TableContainer border='1'>
            <Table>
                <TableHead>
                    <TableRow>
                        {tableHeaders.map((title)=>{return <TableCell><h3>{title}</h3></TableCell>})}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataSource.map(data => {
                        return ( 
                            <TableRow key={data.id}>
                                <TableCell >
                                    <Link to={'/edit/customer/' + data.customerId}>{data.customerName}</Link>
                                </TableCell >
                                <TableCell >
                                    <Link to={'/edit/product/' + data.productId}>{data.productName}</Link>
                                </TableCell >
                                <TableCell >
                                    {data.date}
                                </TableCell >
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );

}
  
export default SummaryTable;
