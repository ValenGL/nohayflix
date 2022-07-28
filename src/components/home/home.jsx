import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/img/logo.png";
import imgNotFound from "../../assets/img/imgNotFound.jpg";

function Home() {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaNueva, setPeliculaNueva] = useState("");
  const [peliculasFound, setPeliculasFound] = useState(true);

  const imputHandler = (e) => {
    setPeliculaNueva(e.target.value);
  };

  async function fetchData(e) {
    e.preventDefault();

    const base_url = "https://www.omdbapi.com/?apikey=8a1b5983&";
    const res = await axios.get(base_url + "s=" + peliculaNueva);
    const data = await res.data;

    setPeliculasFound(data.Response === "True" ? true : false);
    setPeliculas(data.Search);
  }

  return (
    <section id="mainContainer" className="container">
      <div className="row d-flex justify-content-center">
        <div className="col col-md-3 mx-auto my-3">
          <img className="w-100" src={logo} alt="NOHAYFLIX LOGO" />
        </div>
        <div className="col-12">
          <h6 className="text-center text-white">
            Busca las mejores películas que no podes ver en esta plataforma.
          </h6>
          <form className="form-group text-center d-flex justify-content-center align-items-center">
            <input
              className="form-control text-white bg-dark text-center w-50 mb-3 me-3"
              value={peliculaNueva}
              onChange={(e) => imputHandler(e)}
            />
            <button
              className="btn btn-danger btn-block mb-3"
              onClick={(e) => fetchData(e)}
              disabled={!peliculaNueva}
            >
              BUSCAR
            </button>
          </form>
        </div>
        <div className="card-group">
          {peliculasFound === true ? (
            peliculas.map((item, index) => (
              <div
                key={index}
                className="card text-center text-white bg-dark mb-3"
                style={{
                  minWidth: "8rem",
                  maxWidth: "8rem",
                  borderRadius: "0.25rem",
                  marginLeft: "0.15rem",
                  marginRight: "0.15rem",
                }}
              >
                <img
                  className="card-img-top"
                  src={item.Poster === "N/A" ? imgNotFound : item.Poster}
                  alt={item.Title}
                  style={{ borderRadius: "0.15rem" }}
                />
                <div className="card-body">
                  <h6 className="card-title">{item.Title}</h6>
                  <p className="card-text">{item.Year}</p>
                </div>
              </div>
            ))
          ) : (
            <h5 className="text-center mb-3">
              Lo siento, no encontramos peliculas
            </h5>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
