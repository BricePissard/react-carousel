/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { Component } from 'react'
import getData from './data/getData'
import Carousel from './components/Carousel'
import './assets/App.css'

export default class App extends Component {

  constructor(props:Object, state:Object):void
  {
    super(props)
    this.state = {
      images: []
    }
  }

  /**
   * Once the application is mounted search for the images to display.
   */
  componentDidMount():void
  {
    // -- query to search for specific images in Pixabay API.
    const search_for:String = 'beautiful+landscape'

    getData({query:search_for}).then(images => {
      //console.log(images);
      this.setState({ images: images.hits || [] })
    })
  }

  render():any
  {
    return (
      <div className="App">
        {this._getHeader()}
        {this._getContent()}
      </div>
    )
  }


  // -- VIEWS

  /**
   * Create page header
   * @return {View}
   */
  _getHeader():any
  {
    return (
      <header className="App-header">
        <h1 className="App-title">Carousel Test</h1>
      </header>
    )
  }

  /**
   * Create page content with component Carousel.
   * @return {View}
   */
  _getContent():any
  {
    return (
      <div className="App-content">
        {this.state.images.length>0? <Carousel images={this.state.images}/>:null}
      </div>
    )
  }

}
