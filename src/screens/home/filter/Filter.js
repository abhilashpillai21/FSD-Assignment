import { Checkbox, InputLabel, ListItemIcon, ListItemText, TextField } from '@material-ui/core';
import { Button, Card, CardContent, FormControl, FormHelperText, Input, MenuItem, Select, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import './Filter.css'
import { GlobalStateContext } from "../../../common/reducers";

export default function Filter(props) {

  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectStartDate, setSelectStartDate] = useState('')
  const [selectEndDate, setSelectEndDate] = useState('')

  const [filterData, setFilterData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    genre: [],
    artists: []
  })

  const [queryStrings, setQueryStrings] = useState({
    title: '',
    start_date: '',
    end_date: '',
    genre: '',
    artists: ''
  });


  const [reqGenre, setReqGenre] = useState('dispNone');
  const [reqArtist, setArtist] = useState('dispNone');

  const loginContext = useContext(GlobalStateContext);

  useEffect(() => {
    const movies = props.history.location.state.movies;
    const keys = Object.keys(movies);
    let tempArrayGenres = [];
    let tempArrayArtists = [];

    keys.forEach(index => {
      tempArrayGenres = [...tempArrayGenres, ...movies[index].genres]
      tempArrayArtists = [...tempArrayArtists, ...movies[index].artists]
    })

    tempArrayGenres = tempArrayGenres.filter(
      (loc, index, self) => index === self.findIndex((c) => c === loc)
    );

    tempArrayArtists = tempArrayArtists.filter(
      (loc, index, self) => index === self.findIndex((c) => c.id === loc.id)
    );

    setGenres([...genres, ...tempArrayGenres]);
    setArtists([...artists, ...tempArrayArtists]);

  }, []);


  const filterDataHandler = (event) => {

    let name = event.target.name;
    let value = event.target.value;

    name === 'genre' ? setSelectedGenres(value) : null;
    name === 'artists' ? setSelectedArtists(value) : null;
    name === 'start_date' ? setSelectStartDate(value) : null;
    name === 'end_date' ? setSelectEndDate(value) : null;
    name === 'title' ? setSelectedMovie(value) : null;

    let params = ``;

    if (name === 'genre' || name === 'artists') {
      if (value.length === 0)
        params = ``;
      else if (value.length === 1)
        params = `${value}`;
      else {
        value.forEach(element => {
          if (element === value[value.length - 1])
            params = `${params}${element}`;
          else
            params = `${params}${element}%2C`;
        });
      }
    }
    else {
      params = `${value}`;
    }


    setQueryStrings({
      ...queryStrings, [name]: params
    })

    setFilterData({
      title: selectedMovie,
      start_date: selectStartDate,
      end_date: selectEndDate,
      genre: selectedGenres,
      artists: selectedArtists
    })

    let queryString = null

  }

  const submitFilterHandler = event => {
    let params = '';
    let keyArray = Object.keys(queryStrings);
    let lastIndex = keyArray.length - 1;
    let counter = 0;

    keyArray.forEach(
      (key, index) => {

        if (queryStrings[key]) {
          if (counter === 0) {
            params = `${key}=${queryStrings[key]}`;
          }
          else {
            params = `${params}&${key}=${queryStrings[key]}`;
          }
          counter++;
        }
        else { }
      }
    );

    let fetchURL = `${props.baseUrl}movies?${params}`;
    if (!params) {
      fetchURL = `${props.baseUrl}movies`;
    }

    fetch(fetchURL).
      then(rawResponse => rawResponse.json()).
      then(response => loginContext.dispatch({ type: "RELEASED_MOVIES", payload: response.movies })).
      catch(error => console.log(error))

  }

  return (


    <div className="findMovies">
      <Card className="cardStyle">
        <CardContent>
          <Typography variant="h8" component="h2">
            Find Movies By
          </Typography>
          <br />

          <FormControl required className="formControl">
            <InputLabel htmlFor="movie-name">Movie Name</InputLabel>
            <Input type="text" name='title' onChange={filterDataHandler} />
            <FormHelperText className="dispNone">
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />

          <FormControl required className="formControl">
            <InputLabel htmlFor="genres">Genres</InputLabel>

            <Select name='genre' multiple value={selectedGenres} onChange={filterDataHandler} renderValue={(selected) => selected.join(", ")}>
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>

                  <Checkbox checked={selectedGenres.indexOf(genre) > -1} />
                  <ListItemText primary={genre} />

                </MenuItem>
              ))}
            </Select>
            <FormHelperText className={reqGenre}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>

          <br />
          <br />

          <FormControl required className="formControl">
            <InputLabel htmlFor="artists">Artists</InputLabel>

            <Select name='artists' multiple value={selectedArtists} onChange={filterDataHandler} renderValue={(selectedArtists) => selectedArtists.join(", ")}>
              {artists.map((artist) => (
                <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>

                  <Checkbox checked={selectedArtists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                  <ListItemText primary={artist.first_name + " " + artist.last_name} />

                </MenuItem>
              ))}
            </Select>
            <FormHelperText className={reqArtist}>
              <span className="red">Required</span>
            </FormHelperText>
          </FormControl>
          <br />
          <br />

          <TextField
            name="start_date"
            label="Release Date Start"
            value={selectStartDate}
            type="date"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={filterDataHandler}
          />
          <br />
          <br />
          <TextField
            name="end_date"
            label="Release Date End"
            value={selectEndDate}
            type="date"
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={filterDataHandler}
          />
          <br />
          <br />
          <Button
            name='submit'
            variant="contained"
            onClick={submitFilterHandler}
            color="primary"
          >
            Apply
          </Button>
        </CardContent>
      </Card>
    </div>

  )
}