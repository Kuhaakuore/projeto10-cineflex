import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Session({ day, setSession}) {
    const {date, weekday} = day;

    function saveSessionData(time) {
        const newSession = {date, time, weekday};
        setSession(newSession);
    }

  return (
    <>
      <SessionContainer key={day.id} data-test="movie-day">
        {day.weekday} - {day.date}
        <ButtonsContainer>
          {day.showtimes.map((time) => (
            <Link to={`/assentos/${time.id}`} key={time.id}>
              <button onClick={() => saveSessionData(time.name)} data-test="showtime">{time.name}</button>
            </Link>
          ))}
        </ButtonsContainer>
      </SessionContainer>
    </>
  );
}

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
`;