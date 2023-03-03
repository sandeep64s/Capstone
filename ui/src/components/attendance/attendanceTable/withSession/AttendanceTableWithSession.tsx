import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../store";
import "./AttendanceTableWithSession.css";
import { CSVLink } from "react-csv";
import csvDownload from "../../utils/csvDownload";
//TODO backend route for fetching trainees associated with training;
//TrainingID can be fetched from trainer and then can be used to fetch trainees list for attendance
import SwitchSelector from "react-switch-selector";
import Switch from "react-switch";
import { fetchAttendanceWithSession, selectAttendanceWithSession, selectSubmitAttendanceArray, setSubmitAttendanceArray, submitAttendanceWithSessionReducer } from "../../../../store/attendance/attendanceSlice";

const AttendanceTableWithSession = () => {
    const dispatch = useAppDispatch();
    // const [fakeTraineesPresent, setFakeTraineesPresent] = useState<any>([]);
    // const [fakeTraineesAll, setFakeTraineesAll] = useState<any>([]);
    const { trainingId, date, session } = useParams();
    const [report, setReport] = useState<any>([]);
    const attendance = useAppSelector(selectAttendanceWithSession);
    const submitAttendanceArray = useAppSelector(selectSubmitAttendanceArray);

    const options = [
        {
            label: "P",
            value: "Present",
            selectedBackgroundColor: "#0097e6",
        },
        {
            label: "A",
            value: "Absent",
            selectedBackgroundColor: "#fb1131"
        }
    ];

    const initialSelectedIndex = (present: string) => options.findIndex(({ value }) => value === present);
    const onSwitchChange = async (newValue: any, traineeId: number) => {
        console.log(submitAttendanceArray)
        const index = submitAttendanceArray.map((trainee: any) => trainee.traineeId).indexOf(traineeId);
        const foundTrainee = submitAttendanceArray[index];
        console.log(foundTrainee)
        dispatch(setSubmitAttendanceArray([...submitAttendanceArray.slice(0, index), { traineeId: foundTrainee.traineeId, attendance: newValue }, ...submitAttendanceArray.slice(index + 1)]));
        console.log(submitAttendanceArray)
    };
    const handleAttendanceSubmit = () => {
        const attendanceMod = submitAttendanceArray.map(e => e.attendance);
        const attendanceOri = attendance.map(e => e.attendance);
        if (attendanceMod.length === attendanceOri.length && attendanceMod.every((value, index) => value === attendanceOri[index])) {
            alert("No changes made")
            return;
        }
        console.log(submitAttendanceArray)

        const traineesPresent = submitAttendanceArray.filter(e => e.attendance == "Present").map(e => e.traineeId)
        console.log(traineesPresent)
        if (trainingId && date && session) dispatch(submitAttendanceWithSessionReducer({ traineesPresent, trainingId, date, session }))
        else alert("Invalid route params");
    }
    const columns: TableColumn<any>[] = [
        {
            name: 'TraineeId',
            selector: (row: any) => row.traineeId || '',
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row: any) => row.email || '',
            sortable: true,
        },
        {
            name: 'Name',
            selector: (row: any) => row.name || '',
            sortable: true,
        },
        {
            name: 'Attendance',
            cell: (row: any) => (<div className="switch-attendance">
                <label className="switch-wrapper-attendance" style={{ width: 100, height: 35 }}>
                    <SwitchSelector
                        onChange={(value) => onSwitchChange(value, row.traineeId)}
                        options={options}
                        initialSelectedIndex={initialSelectedIndex(row.attendance)}
                        backgroundColor={"#353b48"}
                        fontColor={"#f5f6fa"}
                        name={row.traineeId}
                    />
                </label>
            </div>),
            sortable: false,
        }
    ];
    // const traineesCount = useSelector(selectTraineesCount);
    const [loadingPage, setLoadingPage] = useState(false);

    const fetchTrainees = async () => {
        setLoadingPage(true);
        if (trainingId && date && session) dispatch(fetchAttendanceWithSession({ trainingId, date, session })).then(() => {
            setLoadingPage(false);
            if (attendance && attendance.length !== 0) {
                setReport(csvDownload(attendance))
            }//All trainees
        })
    };

    useEffect(() => {
        fetchTrainees();
    }, []);
    const customStyles = {
        // rows: {
        //     style: {
        //         minHeight: '72px', // override the row height
        //     },
        // },
        headCells: {
            style: {
                justifyContent: 'center',
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                justifyContent: 'center',
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px'
            },
        },
    };
    return (
        <div className="container center">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">Attendance</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link active" to="/Attendance">Home <span className="sr-only">(current)</span></Link>
                        <a className="nav-item nav-link">TrainingId: {trainingId}</a>
                        <a className="nav-item nav-link">Date: {date}</a>
                        <a className="nav-item nav-link">Session: {session === 'M' ? 'Morning' : (session === 'E' ? 'Evening' : 'NA')}</a>
                    </div>
                    {report !== undefined && report.length !== 0 && <button className="nav-item navbar-right"><CSVLink {...report}>Export to CSV</CSVLink></button>}
                </div>
            </nav>
            <DataTable
                columns={columns}
                data={attendance}
                fixedHeader
                fixedHeaderScrollHeight="400px"
                highlightOnHover
                pointerOnHover
                responsive
                selectableRowsHighlight
                striped
                subHeaderWrap
                // subHeader
                // subHeaderComponent={subHeaderComponentMemo}
                progressPending={loadingPage}
                customStyles={customStyles}
                progressComponent={<div className="loading">Loading...</div>}
            />
            <div className="flex justify-content-end align-items-center">
                <Button type="button" color="outline-success" onClick={handleAttendanceSubmit}>Submit</Button>
            </div>
        </div>
    );
}

export default AttendanceTableWithSession;