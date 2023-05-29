import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Seat from "../../components/Seat";
import Footer from "../../components/Footer";

export default function SeatsPage({
  name,
  setName,
  cpf,
  setCpf,
  selectedSeats,
  setSelectedSeats,
  movie,
  session,
  setCurrentUrl,
}) {
  const { idSessao } = useParams();
  const [seats, setSeats] = useState(undefined);
  const navigate = useNavigate();

  function getSeats() {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`;
    const promise = axios.get(URL);
    promise
      .then((response) => setSeats(response.data.seats))
      .catch((response) => console.log(response));
    setCurrentUrl(window.location.pathname);
  }

  useEffect(getSeats, []);

  if (seats === undefined) {
    return <></>;
  }

  function bookSeats(e) {
    e.preventDefault();
    if (selectedSeats.length > 0) {
      const URL =
        "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many";
      const ids = selectedSeats.map((seat) => seat.id);
      const booking = { ids, name, cpf };
      const promise = axios.post(URL, booking);
      promise.then(navigate("/sucesso")).catch((error) => alert(error.data));
    }
  }



  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {seats.map((seat) => (
          <Seat
            key={seat.id}
            seat={seat}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle fill="#1AAE9E" stroke="#0E7D71" />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle fill="#C3CFD9" stroke="#7B8B99" />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle fill="#FBE192" stroke="#F7C52B" />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer onSubmit={bookSeats}>
          <label htmlFor="nome">Nome do Comprador:</label>
          <input
            type="text"
            required
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome..."
            data-test="client-name"
          />
          <label htmlFor="cpf">CPF do Comprador:</label>
          <input
            type="text"
            required
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite seu CPF..."
            data-test="client-cpf"
          />
          <button type="submit" data-test="book-seat-btn">Reservar Assento(s)</button>
      </FormContainer>
      <Footer movie={movie} session={session} />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: 1px solid ${(props) => props.stroke};
  background-color: ${(props) => props.fill};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
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
