import React, { useState, useEffect } from "react";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";
import "../styles/LeaveRequestForm.css";
import Header from "./Header";
import config from "../config.json";

const RequestLeaveForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  // const [userId, setUserId] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const handleRequest = async () => {
    const userId = userInfo.user_id;
    console.log("user id of user : " + userInfo.user_id);
    const response = await axios.post(
      `${config.serverUrl}/leave/requestLeave`,
      {
        startDate,
        endDate,
        numberOfDays,
        leaveType,
        reason,
        userId,
      }
    );

    if (response.data === "Leave request successfull!") {
      enqueueSnackbar("Leave Requested!", {
        variant: "success",
      });
    } else {
      enqueueSnackbar(response.data, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const daysDifference =
        Math.floor((end - start) / (24 * 60 * 60 * 1000)) + 1;
      setNumberOfDays(daysDifference);
    } else {
      setNumberOfDays(0);
    }
  }, [startDate, endDate]);

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="leave-request-form">
          <div className="leave-request-element">
            <label>
              Start Date
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
          </div>
          <div className="leave-request-element">
            <label>
              End Date
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
          </div>
          <div className="leave-request-element">
            <label>
              Number of Days
              <input
                readOnly="true"
                type="number"
                value={numberOfDays}
                onChange={(e) => setNumberOfDays(e.target.value)}
              />
            </label>
            <div className="leave-request-element">
              <label>
                Leave Type
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                >
                  <option value="">Select Leave Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Paid Leave">Paid Leave</option>
                </select>
              </label>
            </div>
          </div>
          <div className="leave-request-element">
            <label>
              Reason
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </label>
          </div>
          <div className="leave-request-element">
            <button onClick={handleRequest}>Request</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default function RequestLeaveFormNotistack() {
  return (
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      style={{ fontSize: "20px", fontFamily: "Arial" }}
    >
      <RequestLeaveForm />
    </SnackbarProvider>
  );
}
