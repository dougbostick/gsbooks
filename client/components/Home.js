import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  btn: {
    backgroundColor: 'black',
     '&:hover': {
       backgroundColor: "#125B50" 
     },
  },
}));
export default function Landing() {
  const classes = useStyles();
  return (
    <>
    <div style={{height: '100vh', display: 'flex', justifyContent:'flex-end', alignItems:'center', background: 'url(/assets/kid.jpg)', backgroundSize: 'cover'}}>
    
        <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', marginRight: '2rem', borderRadius:'10px', height: '50%', padding: '1rem'}}>
          <Typography variant='h1' style={{color: 'white', fontSize: '9rem', fontWeight: 'bold'}}> Where <u style={{textDecorationColor: '#125B50'}}> Stories</u> <br/> Come To <u style={{textDecorationColor: '#125B50'}}> Life </u> </Typography>
        <Button
        className={classes.btn}
        color="secondary"
        href="/categories"
        size="small"
        style={{ margin: '0.5rem auto 0', color: 'white', fontWeight: 'bold', padding: '0.5rem', width: '50%', border: '2px solid black', fontSize:'1rem'}}
      >
       Explore
      </Button>
        
        </div>

      
      </div>
        
    </>
  );
}
