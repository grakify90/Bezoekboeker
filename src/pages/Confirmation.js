import React, { useEffect, useState } from "react";
import "./Confirmation.scss";

export const Confirmation = (props) => {
  const [reservationData, setReservationData] = useState({
    numberOfPeople: null,
    date: null,
    time: null,
  });
  const totalDataString = localStorage.getItem("totalData");

  const QRCODE_API_URL = `http://api.qrserver.com/v1/create-qr-code/?data=[${encodeURIComponent(
    totalDataString
  )}]&size=[100]x[100]`;

  useEffect(() => {
    const totalData = JSON.parse(localStorage.getItem("totalData"));
    setReservationData({ ...totalData });
    console.log("Reservering aantal mensen: " + reservationData.numberOfPeople);
    console.log("Reservering datum: " + reservationData.date);
    console.log("Reservering tijdslot: " + reservationData.time);
  }, []);

  return (
    <div className="confirmationContainer">
      <h1>Jouw Reservering</h1>
      <p>
        <img src={require("../images/pin.png")} alt="location icon" />
        <span>De Kunsthal</span>
        <br />
        <img src={require("../images/user.png")} alt="people icon" />
        <span>{reservationData.numberOfPeople} mensen</span>
        <br />
        <img src={require("../images/agenda1.png")} alt="agenda icon" />
        <span>
          {reservationData.date} van {reservationData.time}
        </span>
        <br />
      </p>
      <img className="QrCode" src={QRCODE_API_URL} alt="" title="" />
      <h2>Laat de QR code scannen bij de ingang van De Kunsthal</h2>
    </div>
  );
};
