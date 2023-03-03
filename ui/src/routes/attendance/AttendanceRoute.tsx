import { Route, Routes } from "react-router-dom";
import AttendanceForm from "../../components/attendance/attendanceForm/AttendanceForm";
import AttendanceTableWithSession from "../../components/attendance/attendanceTable/withSession/AttendanceTableWithSession";
import AttendanceTableWithoutSession from "../../components/attendance/attendanceTable/withoutSession/AttendanceTableWithoutSession";
import "./AttendanceRoute.css";

const AttendanceRoute = () => {
    return (
        <Routes>
            <Route path='*' element={<h1>No Route Found</h1>}></Route>
            <Route path='/' element={<AttendanceForm />}></Route >
            <Route path='/:trainingId/:date/:session' element={<AttendanceTableWithSession />}></Route >
            <Route path='/:trainingId/:date' element={<AttendanceTableWithoutSession />}></Route >
        </Routes>
    );
}

export default AttendanceRoute;