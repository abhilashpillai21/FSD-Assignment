import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import { FormControl, Input, InputLabel } from "@mui/material";
import "./FilterMovie.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import React, { useEffect, useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff"
    }
  }
});

export default function FilterMovie(props) {
  const [reqShow, setReqShow] = useState("dispNone");
  const [reqGenre, setReqGenre] = useState("dispNone");
  const [reqArtist, setReqArtist] = useState("dispNone");
  const [reqStartDate, setReqStartDate] = useState("dispNone");
  const [reqEndDate, setReqEndDate] = useState("dispNone");

  const [show, setShow] = useState("");
  const [genre, setGenre] = useState("");
  const [artist, setArtist] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [shows, setShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [startDates, setStartDates] = useState([]);
  const [endDates, setEndDates] = useState([]);

  const showsChangeHandler = (event) => {

  };
  const genreChangeHandler = (event) => {
    setGenre(event.target.value);
  };
  const artistChangeHandler = (event) => { };
  const startDateChangeHandler = (event) => { };
  const endDateChangeHandler = (event) => { };
  const findShowHandler = (event) => { };


  useEffect(() => {


    const fetchData = async () => {

      const rawResults = await fetch(`http://localhost:8085/api/v1/movies`);
      const result = await rawResults.json();

      const showsTemp = [];
      const genresTemp = [];
      const artistsTemp = [];

      try {
        for (let show of result.movies) {
          if (!showsTemp.includes(show.title))
            showsTemp.push(show.title);
        }

        const temp = [];

        for (let show of result.movies) {
          temp.push(show.genres);
        }

        for (let i = 0; i < temp.length; i++) {
          for (let j = 0; j < temp[i].length; j++) {
            if (!genresTemp.includes(temp[i][j]))
              genresTemp.push(temp[i][j]);
          }
        }

        const movies = result.movies;

        for (let movie of movies) {
          for (let artist of movie.artists) {
            let actor_name = artist.first_name + " " + artist.last_name;
            if (!artistsTemp.includes(actor_name))
              artistsTemp.push(actor_name);
          }
        }
      }
      catch (exception) {

      }
      setShows(showsTemp);
      setGenres(genresTemp);
      setArtists(artistsTemp);
    }
    fetchData();
  }, []);

  return (
    <div className="findShow">
      <Card className="cardStyle" variant="outlined">
        <CardContent margin={theme.spacing(1)}>
          <Typography
            sx={{ textTransform: "uppercase", fontSize: 14 }}
            color={theme.palette.primary.light}
          >
            Find Movies By:
          </Typography>
          <br />
          <FormControl required className="formControl">
            <InputLabel htmlFor="show">Movie Name</InputLabel>
            <Input value={show} onChange={showsChangeHandler} />
            <FormHelperText className={reqShow}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <FormControl required className="formControl">
            <InputLabel htmlFor="genre">Genre</InputLabel>
            <br />
            <Select 
              multiple 
              value={genres} 
              onChange={genreChangeHandler}
              >
              {
                genres.map(gen => {
                  return (
                    <MenuItem key={gen} value={gen}>
                      {gen}
                    </MenuItem>)
                })
              }
            </Select>
            <FormHelperText className={reqGenre}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <FormControl required className="formControl">
            <InputLabel htmlFor="artist">Artists</InputLabel>
            <br />
            <Select value={artist} onChange={artistChangeHandler}>
              {
                artists.map(art => {
                  return (
                    <MenuItem key={art} value={art}>
                      {art}
                    </MenuItem>)
                })
              }
            </Select>
            <FormHelperText className={reqArtist}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <FormControl required className="formControl">
            <InputLabel htmlFor="startDate" shrink>
              Release Date Start
            </InputLabel>
            <br />
            <TextField
              variant="standard"
              type="date"
              value={startDate}
              onChange={startDateChangeHandler}
            />
            <FormHelperText className={reqStartDate}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <FormControl required className="formControl">
            <InputLabel htmlFor="endDate" shrink>
              Release Date Start
            </InputLabel>
            <br />
            <TextField
              variant="standard"
              type="date"
              value={endDate}
              onChange={endDateChangeHandler}
            />
            <FormHelperText className={reqEndDate}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />
          <br />
          <Button
            variant="contained"
            onClick={findShowHandler}
            color="primary"
            sx={{ textTransform: "uppercase" }}
          >
            Book Show
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


