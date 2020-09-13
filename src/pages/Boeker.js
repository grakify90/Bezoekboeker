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
    selected: false,
  },
  {
    number: 2,
    image: <img src={require("../images/two.png")} alt="two person icon" />,
    selected: false,
  },
  {
    number: 3,
    image: <img src={require("../images/three.png")} alt="three person icon" />,
    selected: false,
  },
  {
    number: 4,
    image: <img src={require("../images/four.png")} alt="four person icon" />,
    selected: false,
  },
  {
    number: 5,
    image: <img src={require("../images/five.png")} alt="five person icon" />,
    selected: false,
  },
  {
    number: 6,
    image: <img src={require("../images/six.png")} alt="six person icon" />,
    selected: false,
  },
];

const TimeSlot = [
  { start: "09:00", end: "10:00", selected: false },
  { start: "10:00", end: "11:00", selected: false },
  { start: "11:00", end: "12:00", selected: false },
  { start: "12:00", end: "13:00", selected: false },
  { start: "13:00", end: "14:00", selected: false },
  { start: "14:00", end: "15:00", selected: false },
  { start: "15:00", end: "16:00", selected: false },
  { start: "16:00", end: "17:00", selected: false },
];

export const Boeker = (props) => {
  const [peopleArray, setPeopleArray] = useState(PersonCount);
  const [timeslotArray, setTimeslotArray] = useState(TimeSlot);
  //Local state van aantal personen, datum en tijd
  const [totalData, setTotalData] = useState({
    numberOfPeople: null,
    date: null,
    time: null,
  });

  //Aantal personen picker
  const setNumberOfPeople = (number) => {
    setPeopleArray(PersonCount);
    setTotalData({ ...totalData, numberOfPeople: number });
    const newPeopleArray = PersonCount.map((person) => {
      if (person.number === number) {
        return { ...person, selected: true };
      } else {
        return person;
      }
    });
    setPeopleArray(newPeopleArray);
  };

  //Datum picker
  const [date, setDate] = useState(new Date());
  const today = new Date();

  const handleChange = (date) => {
    const formattedDate = moment(date).format("DD-MM-YYYY");
    setDate(date);
    setTotalData({ ...totalData, date: formattedDate });
  };

  //Tijdsslot picker
  const setTimeslot = (start, end) => {
    setTimeslotArray(TimeSlot);
    const timeSlotString = `${start} tot ${end}`;
    setTotalData({ ...totalData, time: timeSlotString });
    const newTimeslotArray = TimeSlot.map((time) => {
      if (time.start === start) {
        return { ...time, selected: true };
      } else {
        return time;
      }
    });
    setTimeslotArray(newTimeslotArray);
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

  // useEffect(() => {
  //   console.log(totalData);
  // }, [totalData]);

  return (
    <div>
      <img
        style={{ width: "100vw" }}
        src={require("../images/iStock-503590178.jpg")}
        alt="Two girls talking and laughing"
      />
      <div className="personenContainer">
        <div className="innerContainer">
          <h1>Reserveer jouw bezoek bij De Kunsthal</h1>
          <div className="personenInnerContainer">
            <h3>Personen</h3>
            <p>Met hoeveel personen kom je?</p>
          </div>

          <div className="personenScrollBar">
            {peopleArray.map((person, index) => {
              return (
                <Person
                  key={index}
                  number={person.number}
                  image={person.image}
                  selected={person.selected}
                  callback={setNumberOfPeople}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="datumContainer">
        <div className="innerContainer">
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
      </div>
      <div className="tijdContainer">
        <div className="innerContainer">
          <div className="tijdInnerContainer">
            <h3>Selecteer een tijdslot</h3>
            <p>Hoelaat wil je ongeveer langskomen?</p>
          </div>
          <div className="tijdScrollBar">
            {timeslotArray.map((time, index) => {
              return (
                <Timeslot
                  key={index}
                  start={time.start}
                  end={time.end}
                  selected={time.selected}
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
    </div>
  );
};
