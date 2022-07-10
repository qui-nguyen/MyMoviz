import React, { useState } from "react";

// import css extern
import "./App.css";
// Import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//Import reactstrap
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  Col,
  Badge,
} from "reactstrap";

//Import FontAwesome for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faVideo, faStar } from "@fortawesome/free-solid-svg-icons";

function Movie(props) {
  // State
  const [watchMovie, setwatchMovie] = useState(0);
  const [myRatingMovie, setMyRatingMovie] = useState(0);
  const [ratingGlobal, setRatingGlobal] = useState(props.note);
  const [voteGlobal, setVoteGlobal] = useState(props.vote);

  // Setting action in icon camera (inscrement if clicked)
  const handleClickWatch = () => {
    setwatchMovie(watchMovie + 1);
  };
  // Setting action in myRating + and -1
  const handleClickRating = (myRate) => {
    let tmpMyRatingMovie = myRatingMovie;
    if (myRate === "plus") {
      setMyRatingMovie(myRatingMovie + 1);
      tmpMyRatingMovie = myRatingMovie + 1;
    } else {
      setMyRatingMovie(myRatingMovie - 1);
      tmpMyRatingMovie = myRatingMovie - 1;
    }
    let newNote = Math.round(
      (props.note * props.vote + tmpMyRatingMovie) / (props.vote + 1)
    );

    setRatingGlobal(newNote);
    setVoteGlobal(props.vote + 1);
  };

  // Setting action in start clicked
  const handleClickStars = (positionStar) => {
    setMyRatingMovie(positionStar);
    let newNote = Math.round(
      (props.note * props.vote + positionStar) / (props.vote + 1)
    );
    setVoteGlobal(props.vote + 1);
    setRatingGlobal(newNote);
  };

  // Effect in nb of start of myRating
  let ratingStars = [];
  for (let i = 0; i < 10; i++) {
    let style = { cursor: "pointer" };
    if (i < myRatingMovie) {
      style = { color: "yellow", cursor: "pointer" };
    }
    let positionStarClicked = i + 1;
    ratingStars.push(
      <FontAwesomeIcon
        key={props.id + "star" + i + "note"}
        onClick={() => handleClickStars(positionStarClicked)}
        icon={faStar}
        style={style}
      />
    );
  }

  // Avg note
  let notes = [];
  for (let i = 0; i < 10; i++) {
    let color = {};
    if (i < ratingGlobal) {
      color = { color: "yellow" };
    }
    notes.push(
      <FontAwesomeIcon
        key={props.id + "star" + i + "avgNote"}
        icon={faStar}
        style={color}
      />
    );
  }
  // Handle event click on heart icon or trash icon in the wishlist
  const handleClickMovie = () => {
    if (props.isLiked) {
      props.handleClickDeleteMovieParent(props.name);
    } else {
      props.handleClickAddMovieParent({ name: props.name, img: props.img });
    }
  };

  return (
    <>
      <Col xs="12" lg="6" xl="4" style={{ marginBottom: "25px" }}>
        <Card style={{ color: "#797677" }}>
          <CardImg top src={props.img} alt="Card image cap" />
          <CardBody>
            <CardText>
              <span style={{ fontWeight: "bold" }}>{props.name}</span>
            </CardText>
            <CardText>
              Like {""}
              <FontAwesomeIcon
                onClick={() => handleClickMovie()}
                icon={faHeart}
                style={props.isLiked ? { color: "red" } : {}}
              />
            </CardText>
            <CardText>
              Nombre de vues{" "}
              <FontAwesomeIcon
                onClick={() => handleClickWatch()}
                icon={faVideo}
                style={watchMovie !== 0 ? { color: "green" } : ""}
              />{" "}
              <Badge color="secondary">{watchMovie}</Badge>
            </CardText>
            <CardText>
              Mon avis
              {ratingStars}
              <button
                onClick={() => handleClickRating("minus")}
                color="secondary"
                style={{ borderRadius: 5, marginLeft: 2}}
                disabled={myRatingMovie === 0 ? true : false}
                className='btn btn-secondary'
              >
                -
              </button>
              <button
                onClick={() => handleClickRating("plus")}
                color="secondary"
                style={{ borderRadius: 5, marginLeft: 2}}
                disabled={myRatingMovie === 10 ? true : false}
                className='btn btn-secondary'
              >
                +
              </button>
            </CardText>
            <CardText>
              Moyenne {notes}({voteGlobal})
            </CardText>
            <CardText className="text">{props.desc}</CardText>
          </CardBody>
        </Card>
      </Col>
    </>
  );
}

export { Movie };
