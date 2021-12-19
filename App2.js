import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import {generatePalette} from './colorHelper';

import Palette from './Palette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './App.css';


class App extends Component {
   constructor(props) {
      super(props);
      const savedPalette = JSON.parse(window.localStorage.getItem("palette"));
      this.state = {palettes: savedPalette || seedColors }
      this.savePalette = this.savePalette.bind(this);
      this.findPalette = this.findPalette.bind(this);
      this.deletePalette = this.deletePalette.bind(this);
   }

   findPalette(id) {
      return this.state.palettes.find(function(palette){
         return palette.id === id;
      });
   }

   savePalette(newPalette) {
      this.setState(
         { palettes: [...this.state.palettes, newPalette]},
         this.syncLocalStorage
      );
   }

   deletePalette(id) {
      this.setState(
         st => ({palettes: st.palettes.filter(palette => palette.id !== id)}),
         this.syncLocalStorage
      );
   }

   syncLocalStorage() {
      window.localStorage.setItem("palette", JSON.stringify(this.state.palettes));
   }

   render() {
      return (
         <Route render={ ({ location }) => (
            <TransitionGroup>
               <CSSTransition key={location} classNames='fade' timeout={500}>
                  <Switch location={location}>
                     <Route
                     exact 
                     path="/palette/new" 
                     render={(routeProps) =>
                     <div className="page">
                        <NewPaletteForm 
                        savePalette={this.savePalette} 
                        palettes={this.state.palettes} 
                        {...routeProps} />
                     </div> } 
                     />

                     <Route
                     exact
                     path="/" 
                     render={ (routeProps) =>
                     <div className="page">
                        <PaletteList 
                        palette={this.state.palettes}
                        deletePalette={this.deletePalette} 
                        {...routeProps} />
                     </div> } 
                     />

                     <Route
                     exact
                     path="/palette/:id"
                     render={routeProps =>
                     <div className="page">
                        <Palette palette={generatePalette(
                        this.findPalette(routeProps.match.params.id)
                        )} /> 
                     </div>}
                     />

                     <Route 
                     path='/palette/:paletteId/:colorId'
                     render={routeProps => 
                     <div className="page">
                        <SingleColorPalette colorId={routeProps.match.params.colorId} palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                        )} />
                     </div> }
                     />
                  </Switch>
               </CSSTransition>
            </TransitionGroup> 
         )}/>
      )
   }
}

export default App;