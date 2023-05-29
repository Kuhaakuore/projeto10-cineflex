import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import authorization from "./authorization";
import { Route, Routes, useNavigate } from "react-router-dom";
import GlobalStyle from "./style/GlobalStyle";
import ResetStyle from "./style/ResetStyle";
import { useState } from "react";

export default function App() {
  authorization;
  const [movie, setMovie] = useState(undefined);
  const [session, setSession] = useState(undefined);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(window.location.pathname);

  const navigate = useNavigate();

  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <NavContainer data-test="go-home-header-btn">
        {currentUrl === "/" || currentUrl === "/sucesso" ? (
          ""
        ) : (
          <ion-icon
            name="arrow-back-outline"
            onClick={() => navigate(-1)}
          ></ion-icon>
        )}
        CINEFLEX
      </NavContainer>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              setMovie={setMovie}
              setSession={setSession}
              setName={setName}
              setCpf={setCpf}
              setSelectedSeats={setSelectedSeats}
              setCurrentUrl={setCurrentUrl}
            />
          }
        />
        <Route
          path="/sessoes/:idFilme"
          element={
            <SessionsPage
              movie={movie}
              setMovie={setMovie}
              setSession={setSession}
              setCurrentUrl={setCurrentUrl}
            />
          }
        />
        <Route
          path="/assentos/:idSessao"
          element={
            <SeatsPage
              name={name}
              setName={setName}
              cpf={cpf}
              setCpf={setCpf}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              movie={movie}
              session={session}
              setCurrentUrl={setCurrentUrl}
            />
          }
        />
        <Route
          path="/sucesso"
          element={
            <SuccessPage
              movie={movie}
              session={session}
              name={name}
              cpf={cpf}
              selectedSeats={selectedSeats}
              setCurrentUrl={setCurrentUrl}
            />
          }
        />
      </Routes>
    </>
  );
}

const NavContainer = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c3cfd9;
  color: #e8833a;
  font-family: "Roboto", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  ion-icon {
    position: absolute;
    top: 25%;
    left: 0;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: #e8833a;
  }
`;
