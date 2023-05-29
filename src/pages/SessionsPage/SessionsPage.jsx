import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Session from "../../components/Session";
import Footer from "../../components/Footer";

export default function SessionsPage({ movie, setMovie, setSession }) {
  const { idFilme } = useParams();

  function getMovie() {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`;
    const promise = axios.get(URL);
    promise
      .then((response) => setMovie(response.data))
      .catch((response) => console.log(response));
  }

  useEffect(getMovie, []);

  function showSessions({ days }) {
    return (
      <>
        {days.map((day) => (
          <Session day={day} key={day.id} setSession={setSession} />
        ))}
      </>
    );
  }

  if (movie === undefined) {
    return <div></div>;
  }

  return (
    <>
      <PageContainer>
        Selecione o horário
        <div>{showSessions(movie)}</div>
      </PageContainer>
      <Footer movie={movie}/>
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
