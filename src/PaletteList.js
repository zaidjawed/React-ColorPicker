import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import {withStyles} from '@material-ui/styles';
import styles from './styles/PaletteListStyles';
import {Link} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

class PaletteList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         openDeleteDialog: false,
         deletingId: ""
      };
      this.openDialog = this.openDialog.bind(this);
      this.closeDialog = this.closeDialog.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.goToPalette = this.goToPalette.bind(this);
   }

   openDialog(id) {
      this.setState({ openDeleteDialog: true , deletingId: id})
   }

   closeDialog() {
      this.setState({ openDeleteDialog: false , deletingId: ""})
   }

   handleDelete() {
      this.props.deletePalette(this.state.deletingId);
      this.closeDialog();
   }

   goToPalette(id) {
      this.props.history.push(`/palette/${id}`);
   }
   render() {
      const {palette, classes } = this.props;
      const { openDeleteDialog } = this.state;
      return (
         <div className={classes.root}>
            <div className={classes.container}>
               <nav className={classes.nav}>
                  <h1 className={classes.heading}>React Color</h1>
                  <Link to="/palette/new">Create new palette</Link>
               </nav>
               <TransitionGroup className={classes.palette}>
                  {palette.map(palette => (
                     <CSSTransition key={palette.id} classNames="fade" timeout={300}>
                        <MiniPalette
                        {...palette}
                        key={palette.id}
                        id={palette.id}
                        openDialog={this.openDialog}
                        handleClick={this.goToPalette} />
                     </CSSTransition>
                  ))}
               </TransitionGroup>
            </div>
            <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={this.closeDialog}>
               <DialogTitle id="delete-dialog-title">Delete Palette</DialogTitle>
               <List>
                  <ListItem button onClick={this.handleDelete}>
                     <ListItemAvatar>
                        <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                        <CheckIcon />
                        </Avatar>
                     </ListItemAvatar>
                     <ListItemText primary='Delete' />
                  </ListItem>

                  <ListItem button onClick={this.closeDialog}>
                     <ListItemAvatar>
                     <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                        <CloseIcon />
                        </Avatar>
                     </ListItemAvatar>
                     <ListItemText primary='Cancel' />
                  </ListItem>
               </List>
            </Dialog> 
         </div>
      )
   }
}

export default withStyles(styles)(PaletteList);
