import styled from "styled-components";
import HomePage from "./pages/HomePage/HomePage";
import SeatsPage from "./pages/SeatsPage/SeatsPage";
import SessionsPage from "./pages/SessionsPage/SessionsPage";
import SuccessPage from "./pages/SuccessPage/SuccessPage";
import authorization from "./authorization";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
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

  return (
    <>
      <ResetStyle />
      <GlobalStyle />
      <BrowserRouter>
        <NavContainer>CINEFLEX</NavContainer>
        <Routes>
          <Route path="/" element={<HomePage
          setMovie={setMovie}
          setSession={setSession}
          setName={setName}
          setCpf={setCpf}
          setSelectedSeats={setSelectedSeats} />} />
          <Route
            path="/sessoes/:idFilme"
            element={<SessionsPage 
                movie={movie} 
                setMovie={setMovie} 
                setSession={setSession}/>}
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
                session={session}
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
              />
            }
          />
        </Routes>
      </BrowserRouter>
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
  a {
    text-decoration: none;
    color: #e8833a;
  }
`;
