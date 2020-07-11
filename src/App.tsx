import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import firebase from './firebase/config'

import './App.css';
import { Container } from '@material-ui/core';

const styleUnSelected = { background: "#66CDAA", padding: "20px" };
const styleBase = { background: "#AFEEEE", padding: "20px" };

const styleSelected = { background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', padding: '30px' };

const APP_KEY = "PokerTools"

// firebase TEST
const testRef = firebase.firestore().collection("test")
testRef.get().then(docs => {
  docs.forEach(doc => console.log(doc.data()))
})

const App: React.FC = () => {
  const appState = localStorage.getItem(APP_KEY)
  const { A, B } = appState ? JSON.parse(appState) : {
    A: 50000,
    B: 50000,
  }

  const [flag, setFlag] = useState<boolean>(false);
  const [BTN, setBTN] = useState<boolean>(false);
  const [pool, setPool] = useState<number>(0);
  const [betValue, setBetValue] = useState<number>(0);
  const [APoint, setAPoint] = useState<number>(A);
  const [BPoint, setBPoint] = useState<number>(B);
  const [history, setHistory] = useState<Array<string>>([]);

  const check = () => {
    const User = !flag ? 'A' : 'B'
    const s = User + " checked.";
    setHistory(history.concat(s))
    alert(s)
    setFlag(!flag)
  }

  const bet = () => {
    const User = !flag ? 'A' : 'B'
    const s = User + " bet " + betValue;
    setHistory(history.concat(s))
    alert(s);
    if (User === 'A') {
      setAPoint(APoint - betValue);
    } else {
      setBPoint(BPoint - betValue);
    }
    setPool(pool + betValue);
    setBetValue(0);
    setFlag(!flag);
    setBetValue(0);
  }

  const fold = () => {
    const User = flag ? 'A' : 'B';
    const s = `${User} fold.\nCongratsration!\n${User} wins ${pool} !`
    setHistory(history.concat(s))
    alert(s);
    if (User === 'A') {
      setAPoint(APoint + pool);
    } else {
      setBPoint(BPoint + pool);
    }
    setPool(0);
    setBetValue(0);
    console.log(history)
  }
  
  const win = () => {
    const User = !flag ? 'A' : 'B';
    const s = `Congratsration!\n${User} wins ${pool}!`
    setHistory(history.concat(s))
    alert(s);
    if (User === 'A') {
      setAPoint(APoint + pool);
    } else {
      setBPoint(BPoint + pool);
    }
    setPool(0);
    setBetValue(0);
    console.log(history)
    startNewRound()
  }

  const startNewRound = () => {
    setBTN(!BTN)
    const User = BTN ? 'A' : 'B';
    if (User === 'A') {
      setAPoint(APoint - 1000);
      setBPoint(BPoint - 500);
      setPool(1500)
    } else {
      setAPoint(APoint - 500);
      setBPoint(BPoint - 1000);
      setPool(1500)    
    }
    alert(`BTN is ${User}.`)
  }

  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify({ 'A': APoint, 'B': BPoint, 'History': history }))
  }, [APoint, BPoint, history])

  return (
    <div className="App">
      <Grid container alignItems="center" justify="center">
        <Grid item xs={4} style={flag === false ? styleSelected : styleUnSelected} onClick={() => setFlag(!flag)}>
          {APoint}
        </Grid>
        <Grid item xs={4} style={styleBase}>
          <Container >
            <List component="nav" aria-label="secondary mailbox folders" >
              <ListItem>
                <ListItemText primary={"BTN:  " + (!BTN ? 'A' : 'B')} />
              </ListItem>
              <ListItem>
                <ListItemText primary={"Now:  " + (!flag ? 'A' : 'B')} />
              </ListItem>
              <ListItem>
                <ListItemText primary={"Pool: " + pool} />
              </ListItem>
            </List>
          </Container>
        </Grid>
        <Grid item xs={4} style={flag ? styleSelected : styleUnSelected} onClick={() => setFlag(!flag)}>
          {BPoint}
        </Grid>
      </Grid>
      <br></br>
      <Grid container alignItems="center" justify="center" >
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={() => check()}>
            Check
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="secondary" onClick={() => bet()}>
            Bet
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="inherit" onClick={() => fold()}>
            Fold
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="secondary" onClick={() => win()}>
            Win
          </Button>
        </Grid>
      </Grid>
      <br />
      <TextField id="outlined-basic" label="BetValue" variant="outlined" onChange={e => setBetValue(parseInt(e.target.value))} />
    </div>
  );
}

export default App;
