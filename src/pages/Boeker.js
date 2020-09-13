import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Boeker.scss";
import { Person } from "../components/Person";
import { Timeslot } from "../components/Timeslot";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import nl from "date-fns/locale/nl";

registerLocale("nl", nl);
setDefaultLocale("nl");

const PersonCount = [
  {
    number: 1,
    image: <img src={require("../images/person.png")} alt="one person icon" />,
  },
  {
    number: 2,
    image: <img src={require("../images/two.png")} alt="two person icon" />,
  },
  {
    number: 3,
    image: <img src={require("../images/three.png")} alt="three person icon" />,
  },
  {
    number: 4,
    image: <img src={require("../images/four.png")} alt="four person icon" />,
  },
  {
    number: 5,
    image: <img src={require("../images/five.png")} alt="five person icon" />,
  },
  {
    number: 6,
    image: <img src={require("../images/six.png")} alt="six person icon" />,
  },
];

const TimeSlot = [
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
  { start: "11:00", end: "12:00" },
  { start: "12:00", end: "13:00" },
  { start: "13:00", end: "14:00" },
  { start: "14:00", end: "15:00" },
  { start: "15:00", end: "16:00" },
  { start: "16:00", end: "17:00" },
];

export const Boeker = (props) => {
  //Local state van aantal personen, datum en tijd
  const [totalData, setTotalData] = useState({
    numberOfPeople: null,
    date: null,
    time: null,
  });

  //Aantal personen picker
  const setNumberOfPeople = (number) => {
    setTotalData({ ...totalData, numberOfPeople: number });
  };

  //Datum picker
  const [date, setDate] = useState(new Date());
  const today = new Date();

  const handleChange = (date) => {
    const formattedDate = moment(date).format("DD-MM-YYYY");
    console.log(formattedDate);
    setDate(date);
    setTotalData({ ...totalData, date: formattedDate });
  };

  //Tijdsslot picker
  const setTimeslot = (start, end) => {
    const timeSlotString = `${start} tot ${end}`;
    setTotalData({ ...totalData, time: timeSlotString });
  };

  //Naar reservering pagina
  const goToConfirmation = () => {
    if (!totalData.numberOfPeople || !totalData.date || !totalData.time) {
      alert(
        "Voer alsjeblieft het gewenste aantal personen, de datum en het tijdslot in."
      );
    } else {
      props.callback();
      localStorage.setItem("totalData", JSON.stringify(totalData));
    }
  };

  useEffect(() => {
    console.log(totalData);
  }, [totalData]);

  return (
    <div>
      <img
        style={{ width: "100vw" }}
        src={require("../images/iStock-503590178.jpg")}
        alt="Two girls talking and laughing"
      />
      <div className="personenContainer">
        <h1>Reserveer jouw bezoek bij De Kunsthal</h1>
        <div className="personenInnerContainer">
          <h3>Personen</h3>
          <p>Met hoeveel personen kom je?</p>
        </div>

        <div className="personenScrollBar">
          {PersonCount.map((person, index) => {
            return (
              <Person
                key={index}
                number={person.number}
                image={person.image}
                callback={setNumberOfPeople}
              />
            );
          })}
        </div>
      </div>
      <div className="datumContainer">
        <div className="datumInnerContainer">
          <h3>Plan je bezoek</h3>
          <p>Wanneer wil je langskomen?</p>
        </div>
        <div className="form-group">
          <DatePicker
            selected={date}
            onChange={handleChange}
            minDate={today}
            locale="nl"
            inline
          />
        </div>
      </div>
      <div className="tijdContainer">
        <div className="tijdInnerContainer">
          <h3>Selecteer een tijdslot</h3>
          <p>Hoelaat wil je ongeveer langskomen?</p>
        </div>
        <div className="tijdScrollBar">
          {TimeSlot.map((time, index) => {
            return (
              <Timeslot
                key={index}
                start={time.start}
                end={time.end}
                callback={setTimeslot}
              />
            );
          })}
        </div>
        <div className="verderButton" onClick={goToConfirmation}>
          <p>Verder</p>
          <img src={require("../images/arrow.png")} alt="Arrow right" />
        </div>
      </div>
    </div>
  );
};
