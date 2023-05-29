import styled from "styled-components";
import { useState } from "react";

export default function Seat({ seat, selectedSeats, setSelectedSeats }) {
  const [availability, setAvailabilty] = useState("");
  const {id, name, isAvailable} = seat;

  function selectSeat(status) {
    if (status && availability !== "selected") {
      setAvailabilty("selected");
      setSelectedSeats([...selectedSeats, seat]);
    }
    else if (status && availability === "selected") {
      setAvailabilty("");
      setSelectedSeats(selectedSeats.filter(item => item !== seat));
    }
    else alert("Esse assento não está disponível");
  }

  function checkAvailability(status) {
    if (availability === "selected") {
      return {
        fill: "#1AAE9E",
        stroke: "#0E7D71",
      };
    }
    if (status) {
      return {
        fill: "#C3CFD9",
        stroke: "#7B8B99",
      };
    } else {
      return {
        fill: "#FBE192",
        stroke: "#F7C52B",
      };
    }
  }

  return (
    <>
      <SeatItem
        key={id}
        isAvailable={isAvailable}
        fill={checkAvailability(isAvailable).fill}
        stroke={checkAvailability(isAvailable).stroke}
        onClick={() => selectSeat(isAvailable)}
        data-test="seat"
      >
        {name}
      </SeatItem>
    </>
  );
}

const SeatItem = styled.div`
  border: 1px solid ${(props) => props.stroke};
  background-color: ${(props) => props.fill};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  cursor: pointer;
`;
