import React from 'react';
import Auxiliar from '../../hoc/Auxiliar';
import classes from './Layout.module.css';

const layout = (props) => (
  <Auxiliar>
    <div>
      Toolbar, SideDrawer, Backdrop
    </div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Auxiliar>
);

export default layout;