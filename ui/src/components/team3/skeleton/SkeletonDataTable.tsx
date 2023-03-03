import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import DataTable from 'react-data-table-component';
import { TrainingType } from '../../../types/types';
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        width: "100% !important"
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);
export const SkeletonDataTable = () => {
    const skeletonArray = Array(10).fill('');
    const Rows = skeletonArray.map((item, index) => (
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
    ))
    console.log(Rows)
    const Body = () => <tbody>{Rows}</tbody>;
    const columns = [
        {
            name: 'trainingId',
            selector: (row: TrainingType) => row.trainingId,
            sortable: true,
        },
        {
            name: 'trainerId',
            selector: (row: TrainingType) => row.trainerId,
            sortable: true,
        },
        {
            name: 'traineeId',
            selector: (row: TrainingType) => row.traineeId,
            sortable: true,
        },
        {
            name: 'trainingStartDate',
            selector: (row: TrainingType) => row.trainingStartDate?.split('T')[0],
            sortable: true,
        },
        {
            name: 'trainingEndDate',
            selector: (row: TrainingType) => row.trainingEndDate?.split('T')[0],
            sortable: true,
        },
    ];
    return (
        <DataTable
            columns={columns}
            data={[{}, {}]}
            fixedHeaderScrollHeight="300px"
            highlightOnHover
            responsive
            selectableRowsHighlight
            subHeader={true}
        />)
}

export default SkeletonDataTable;