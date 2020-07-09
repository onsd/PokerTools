import React, {useState} from 'react';
import logo from './logo.svg';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


import './App.css';
import { Container } from '@material-ui/core';

const style1 = { background: "#66CDAA", padding: "20px"};
const style2 = { background: "#AFEEEE", padding: "20px"};

const style3 = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // border: 0,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'white',
    // height: 48,
    padding: '30px',
};

type Flag = 'A' | 'B';

const ListItemLink = (props: any) =>  {
  return <ListItem button component="a" {...props} />;
}

function App() {
  const [flag, setFlag] = useState<Flag>('A');
  const [pool, setPool] = useState<number>(0);
  const APoint = 50000;
  const BPoint = 50000;
  
  return (
    <div className="App">
      <Grid container alignItems="center" justify="center">
        <Grid item xs={4}　style={(flag==='A')? style3 :style1} onClick={() => setFlag('A')}>
          {APoint}
        </Grid>
        <Grid item xs={4} style={style2}>
          <Container >
            <List component="nav" aria-label="secondary mailbox folders" >
              <ListItem>
                <ListItemText primary={"Now:  " + flag} />
              </ListItem>
              <ListItem>
                <ListItemText primary={"Pool: " + pool} />
              </ListItem>
            </List>
            </Container>  
        </Grid>
        <Grid item xs={4} style={(flag==='B')? style3 :style1} onClick={() => setFlag('B')}>
          {BPoint}
        </Grid>
      </Grid>
      <br></br>
      <Grid container alignItems="center" justify="center" >
        <Grid item xs={2}>
          <Button variant="contained" color="primary">
            Check
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="secondary">
            Bet
          </Button>
        </Grid>        
        <Grid item xs={2}>
          <Button variant="contained" color="inherit">
            Fold
          </Button>
        </Grid>
      </Grid>
      <br/>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />

    </div>
  );
}

export default App;
