import React, { useState, useEffect } from "react";
// import css extern
import "./App.css";
// Import components
import { Movie } from "./Movie";
// Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//Import FontAwesome for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
//Import react-bootstrap
import {
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Table,
  Popover,
  PopoverHeader,
  PopoverBody,
  Button,
} from "reactstrap";
//import {logo} from "../images/logo.png"

function App() {
  /*---------------------------HOOK STATE----------------------------- */
  const [isOpenedPopover, setIsOpenedPopover] = useState(false);
  const [data, setData] = useState([]);
  const [wishListDb, setWishListDb] = useState([]);

  const toggle = () => setIsOpenedPopover(!isOpenedPopover);

  /*---------------------------------DATA----------------------------- */
  useEffect(() => {
    async function loadData() {
        // All movies
      let rawResponse = await fetch("/new-movies");
      let response = await rawResponse.json();
      setData(response);
       // Whislist movies
      let whislistResponse = await fetch("/wishlist-movie");
      let wlResponse = await whislistResponse.json();
      setWishListDb(wlResponse);
    }
    loadData();
  }, []);

  /*-------------------------------ACTIONS------------------------------*/

  const handleClickAddMovie = (movie) => {
    setWishListDb([...wishListDb, movie]);
    fetch("/wishlist-movie", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `movieName=${movie.name}&img=${movie.img}`,
    });
  };

  const handleClickDeleteMovie = (name) => {
    setWishListDb(wishListDb.filter((e) => e.name !== name));
    fetch(`/wishlist-movie/${name}`, {
      method: "DELETE",
    });
  };

  /*----------------- AUTOMATION CONTAIN ---------------------*/
  let movieList = data.map((movie, i) => {
    return (
      <Movie
        id={movie.id}
        name={movie.name}
        number={i}
        desc={movie.desc}
        note={movie.note}
        vote={movie.vote}
        img={movie.img}
        handleClickAddMovieParent={handleClickAddMovie}
        handleClickDeleteMovieParent={handleClickDeleteMovie}
        isLiked={
          wishListDb.filter((m) => m.name === movie.name).length !== 0
            ? true
            : false
        }
        key={movie.id}
      />
    );
  });

  // Whislist
  let wishListDbStyled = [];

  if (wishListDb.length === 0) {
    wishListDbStyled = [<p key='noMovieWishlist'>No films in wishlist</p>];
  } else {
    wishListDbStyled = wishListDb.map((movie, i) => {
      return (
          <Table>
            <tbody>
              <tr onClick={() => handleClickDeleteMovie(movie.name)}>
                <td>
                  <img width="60" height="40" src={movie.img} />
                </td>
                <td><p>{movie.name}</p></td>
                <td>
                  <FontAwesomeIcon icon={faTrash} />
                </td>
              </tr>
            </tbody>
          </Table>
      );
    });
  }
// Contain
  return (
    <div style={{ backgroundColor: "black" }}>
      <Container style={{ color: "white" }} >
        <Nav>
          <span className="navbar-brand">
            <img
              src="../images/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
          </span>
          <NavItem>
            <NavLink href="/" className="nav-link-text">
              Last Releases
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <Button type="button" id="popOverWishList" onClick={toggle}>
                {wishListDb.length} films
              </Button>
              <Popover
                placement="bottom"
                isOpen={isOpenedPopover}
                target="popOverWishList"
              >
                <PopoverHeader>Wishlist</PopoverHeader>
                <PopoverBody>{wishListDbStyled}</PopoverBody>
              </Popover>
            </NavLink>
          </NavItem>
        </Nav>
      </Container>
      <br />
      <Container>
        <Row>{movieList}</Row>
      </Container>
    </div>
  );
}

export default App;
