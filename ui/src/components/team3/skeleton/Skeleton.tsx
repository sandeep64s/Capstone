import React from 'react'
import { Table } from "reactstrap";
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
export const SkeletonTable = () => {
    const skeletonArray = Array(10).fill('');
    return (<Table className="table table-bordered table-striped">
        <thead>
            <tr>
                <th>TrainingId</th>
                <th>TrainerId</th>
                <th>Title</th>
                <th>Duration</th>
                <th>Total Trainees</th>
                <th>Details</th>
            </tr>
        </thead>
        <tbody>
            {skeletonArray.map((item, index) => (
                <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                        <Skeleton />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Skeleton />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Skeleton />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Skeleton />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Skeleton />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                        <Skeleton />
                    </StyledTableCell>
                </StyledTableRow>
            ))}
        </tbody>
    </Table>)
}

export default SkeletonTable