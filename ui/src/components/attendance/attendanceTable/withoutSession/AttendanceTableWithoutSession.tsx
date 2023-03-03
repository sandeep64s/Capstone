import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button, ButtonGroup } from "reactstrap";
import { useAppDispatch, useAppSelector } from "../../../../store";
import "./AttendanceTableWithoutSession.css";
import { CSVLink } from "react-csv";
import csvDownload from "../../utils/csvDownload";
//TODO backend route for fetching trainees associated with training;
//TrainingID can be fetched from trainer and then can be used to fetch trainees list for attendance
import SwitchSelector from "react-switch-selector";
import Switch from "react-switch";
import { fetchAttendance, fetchAttendanceWithSession, selectAttendance, selectAttendanceWithSession, selectSubmitAttendanceArray, selectSubmitAttendanceWithoutSessionEArray, selectSubmitAttendanceWithoutSessionMArray, setSubmitAttendanceArray, setSubmitAttendanceWithoutSessionEArray, setSubmitAttendanceWithoutSessionMArray, submitAttendanceReducer, submitAttendanceWithSessionReducer } from "../../../../store/attendance/attendanceSlice";

const AttendanceTableWithoutSession = () => {
    const dispatch = useAppDispatch();
    // const [fakeTraineesPresent, setFakeTraineesPresent] = useState<any>([]);
    // const [fakeTraineesAll, setFakeTraineesAll] = useState<any>([]);

    const { trainingId, date } = useParams();
    const [report, setReport] = useState<any>([]);
    const attendance = useAppSelector(selectAttendance);
    const submitAttendanceMArray = useAppSelector(selectSubmitAttendanceWithoutSessionMArray);
    const submitAttendanceEArray = useAppSelector(selectSubmitAttendanceWithoutSessionEArray);

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
    const onSwitchMChange = async (newValue: any, traineeId: number) => {
        const index = submitAttendanceMArray.map((trainee: any) => trainee.traineeId).indexOf(traineeId);
        const foundTrainee = submitAttendanceMArray[index];
        console.log(foundTrainee)
        await dispatch(setSubmitAttendanceWithoutSessionMArray([...submitAttendanceMArray.slice(0, index), { traineeId: foundTrainee.traineeId, attendance: newValue }, ...submitAttendanceMArray.slice(index + 1)]));
        console.log(submitAttendanceMArray)
    };
    const onSwitchEChange = async (newValue: any, traineeId: number) => {
        const index = submitAttendanceEArray.map((trainee: any) => trainee.traineeId).indexOf(traineeId);
        const foundTrainee = submitAttendanceEArray[index];
        console.log(foundTrainee, newValue)
        await dispatch(setSubmitAttendanceWithoutSessionEArray([...submitAttendanceEArray.slice(0, index), { traineeId: foundTrainee.traineeId, attendance: newValue }, ...submitAttendanceEArray.slice(index + 1)]));
        console.log(submitAttendanceEArray)
    };
    const handleAttendanceSubmit = async () => {
        var checkMSessionChanges = true;
        var checkESessionChanges = true;
        // If both are true, then they are different from original
        const attendanceModM = submitAttendanceMArray.map(e => e.attendance);
        const attendanceOriM = attendance.map(e => e.attendance.split(" ")[0]);
        if (attendanceModM.length === attendanceOriM.length && attendanceModM.every((value, index) => value === attendanceOriM[index])) {
            checkMSessionChanges = false;
            console.log("session M not changed")
        }
        console.log(submitAttendanceMArray)

        const attendanceModE = submitAttendanceEArray.map(e => e.attendance);
        const attendanceOriE = attendance.map(e => e.attendance.split(" ")[1]);
        if (attendanceModE.length === attendanceOriE.length && attendanceModE.every((value, index) => value === attendanceOriE[index])) {
            checkESessionChanges = false;
            console.log("session E not changed")
        }
        if (!checkMSessionChanges && !checkESessionChanges) {
            console.log(attendanceModM, attendanceModE)
            alert("No changes made")
            return;
        }
        console.log(submitAttendanceEArray)

        const traineesPresentM = submitAttendanceMArray.filter(e => e.attendance === "Present").map(e => e.traineeId)
        const traineesPresentE = submitAttendanceEArray.filter(e => e.attendance === "Present").map(e => e.traineeId)
        console.log(traineesPresentM, traineesPresentE)
        if (trainingId && date) await dispatch(submitAttendanceReducer({ traineesPresentM, traineesPresentE, trainingId, date, checkMSessionChanges, checkESessionChanges }))
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
            name: 'Morning',
            cell: (row: any) => (<div className="switch-attendance">
                <label className="switch-wrapper-attendance" style={{ width: 100, height: 35 }}>
                    <SwitchSelector
                        onChange={(value) => onSwitchMChange(value, row.traineeId)}
                        options={options}
                        initialSelectedIndex={initialSelectedIndex(row.attendance.split(" ")[0])}
                        backgroundColor={"#353b48"}
                        fontColor={"#f5f6fa"}
                        name={row.traineeId + "M"}
                    />
                </label>
            </div>),
            sortable: false,
        },
        {
            name: 'Evening',
            cell: (row: any) => (<div className="switch-attendance">
                <label className="switch-wrapper-attendance" style={{ width: 100, height: 35 }}>
                    <SwitchSelector
                        onChange={(value) => onSwitchEChange(value, row.traineeId)}
                        options={options}
                        initialSelectedIndex={initialSelectedIndex(row.attendance.split(" ")[1])}
                        backgroundColor={"#353b48"}
                        fontColor={"#f5f6fa"}
                        name={row.traineeId + "E"}
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
        if (trainingId && date) dispatch(fetchAttendance({ trainingId, date })).then(() => {
            setLoadingPage(false);
            if (attendance && attendance.length !== 0) {
                console.log(attendance)
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

export default AttendanceTableWithoutSession;