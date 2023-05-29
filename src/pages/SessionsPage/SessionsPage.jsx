import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Session from "../../components/Session";

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
          <Session 
          day={day} 
          key={day.id}
          setSession={setSession}/>
        ))}
      </>
    );
  }

  if (movie === undefined) {
    return <div></div>;
  }

  return (
    <PageContainer>
      Selecione o horário
      <div>{showSessions(movie)}</div>
      <FooterContainer>
        <div>
          <img
            src={
              "https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"
            }
            alt="poster"
          />
        </div>
        <div>
          <p>Tudo em todo lugar ao mesmo tempo</p>
        </div>
      </FooterContainer>
    </PageContainer>
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

const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
