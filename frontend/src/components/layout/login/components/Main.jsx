import './Main.css'
import React from 'react'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

import Colors from '../../../../constants/Colors'


const LoginButton = withStyles((theme) => ({
   root: {
      color: theme.palette.getContrastText(Colors.primaryColor),
      backgroundColor: Colors.primaryColor,
      '&:hover': {
         backgroundColor: Colors.accentColor1,
      },
      margin: 5,
      width: '35%'
   },
}))(Button);

const SignButton = withStyles((theme) => ({
   root: {
      color: theme.palette.getContrastText(Colors.secondaryColor),
      backgroundColor: Colors.secondaryColor,
      '&:hover': {
         backgroundColor: Colors.accentColor2,
      },
      margin: 10,
      width: '35%'
   },
}))(Button);


export default props =>
   <content className="content">
      <div className="children">
         <div className="row1">

         </div>
         <div className="rowbut">
            <LoginButton className="log" variant="contained" size="large" >
               LOGIN
            </LoginButton>
            <SignButton className="sign" variant="contained" size="large" >
               SIGNUP
            </SignButton>
         </div>
      </div>
   </content>