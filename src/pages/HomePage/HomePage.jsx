import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Movie from "../../components/Movie";
import { Link } from "react-router-dom";

export default function HomePage({
  setMovie,
  setSession,
  setName,
  setCpf,
  setSelectedSeats,
}) {
  const [movies, setMovies] = useState([]);
  
  function resetVariables() {
    setMovie(undefined);
    setSession(undefined);
    setName("");
    setCpf("");
    setSelectedSeats([]);
    console.log("pronto");
  }

  function getMovies() {
    const URL = "https://mock-api.driven.com.br/api/v8/cineflex/movies";
    const promise = axios.get(URL);
    promise
      .then((response) => setMovies(response.data))
      .catch((response) => console.log(response));
  }

  useEffect(getMovies, []);
  useEffect(resetVariables, []);

  return (
    <PageContainer>
      Selecione o filme
      <ListContainer>
        {movies.map((movie) => (
          <Link to={`/sessoes/${movie.id}`} key={movie.id}>
            <MovieContainer>
              <Movie movie={movie} />
            </MovieContainer>
          </Link>
        ))}
      </ListContainer>
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
  padding-top: 70px;
`;
const ListContainer = styled.div`
  width: 350px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;
const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`;
