import React, { useState, useEffect } from "react";

import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import "../styles/LeavesTable.css";
import config from "../config.json";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const LeavesTable = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const getLeaveRequests = async () => {
    try {
      const response = await axios.get(
        `${config.serverUrl}/leave/getAllLeaves`
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

  // Function to handle approval or rejection of a leave request
  const handleAction = async (id, action) => {
    // You can perform the approval or rejection logic here
    console.log(`Leave ID: ${id} - Action: ${action}`);
    if (action === "approve") {
      const response = await axios.post(
        `${config.serverUrl}/leave/approveLeave/` + id
      );
      if (response.data === "Successfully Approved Leave request!") {
        setLeaveRequests((prevRequests) => {
          return prevRequests.map((request) =>
            request.leave_request_id === id
              ? { ...request, status: "Approved" }
              : request
          );
        });
        enqueueSnackbar(response.data, { variant: "success" });
      }
    } else if (action === "reject") {
      const response = await axios.post(
        `${config.serverUrl}/leave/rejectLeave/` + id
      );
      if (response.data === "Successfully Rejected Leave request!") {
        setLeaveRequests((prevRequests) => {
          return prevRequests.map((request) =>
            request.leave_request_id === id
              ? { ...request, status: "Rejected" }
              : request
          );
        });
        enqueueSnackbar(response.data, { variant: "success" });
      }
    }
  };

  return (
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
            <TableCell
              colSpan={2}
              align="center"
              style={{ fontWeight: "bold", fontSize: "16px" }}
            >
              Action
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
              <TableCell align="center">
                <button
                  className="approve-btn"
                  onClick={() =>
                    handleAction(request.leave_request_id, "approve")
                  }
                  disabled={
                    request.status === "Approved" ||
                    request.status === "Rejected"
                  }
                >
                  Approve
                </button>
              </TableCell>
              <TableCell align="center">
                <button
                  className="reject-btn"
                  onClick={() => {
                    console.log("status " + request.status);
                    handleAction(request.leave_request_id, "reject");
                  }}
                  disabled={
                    request.status === "Approved" ||
                    request.status === "Rejected"
                  }
                >
                  Reject
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      style={{ fontSize: "20px", fontFamily: "Arial" }}
    >
      <LeavesTable />
    </SnackbarProvider>
  );
}
