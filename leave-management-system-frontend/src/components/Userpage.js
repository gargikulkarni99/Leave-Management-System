import React from "react";
import "../styles/UserPage.css"; // Import your stylesheet
import Header from "./Header";
const UserPage = () => {
  const userInfo = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Header />
      <div className="user-page">
        <div className="user-info">
          <h2> Sick leave balance</h2>
          <h1> {userInfo.sick_leave_balance}</h1>
        </div>
        <div className="user-info">
          <h2> Paid leave balance</h2>
          <h1> {userInfo.paid_leave_balance} </h1>
        </div>
      </div>
    </>
  );
};

export default UserPage;
