import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config.json";
import "../styles/LeavesTable.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "./Header";

const EmployeeLeavesTable = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const getLeaveRequests = async () => {
    try {
      const response = await axios.get(
        `${config.serverUrl}/leave/getLeavesByUserName/` + userInfo.user_name
      );
      setLeaveRequests(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extracting the date portion
  };

  // useEffect hook to fetch leave requests when the component mounts
  useEffect(() => {
    getLeaveRequests();
  }, []);

  return (
    <>
      <Header />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                ID
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                Employee
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                Start Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                End Date
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                {" "}
                Number of Days
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                Leave Type
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                Reason
              </TableCell>
              <TableCell style={{ fontWeight: "bold", fontSize: "16px" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequests.map((request) => (
              <TableRow key={request.leave_request_id}>
                <TableCell>{request.leave_request_id}</TableCell>
                <TableCell>{request.user}</TableCell>
                <TableCell>{formatDate(request.start_date)}</TableCell>
                <TableCell>{formatDate(request.end_date)}</TableCell>
                <TableCell>{request.number_of_days}</TableCell>
                <TableCell>{request.leave_type}</TableCell>
                <TableCell>{request.reason}</TableCell>
                <TableCell>{request.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default EmployeeLeavesTable;
