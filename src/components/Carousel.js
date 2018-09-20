/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { PureComponent } from 'react'
import CarouselItem from './CarouselItem'

// -- size in pixel of the carousel slider items (200px + 20px of right margin).
const SLIDER_SIZE:Number = 220;

// -- maximum number of items in the carousel slider
const SLIDER_MAX:Number = 6;

export default class Carousel extends PureComponent {

  static defaultProps:Object = {
    images: []
  }

  constructor(props:Object, state:Object):void
  {
    super(props)
    this.state = this.getInitialState.call(this)
  }

  getInitialState():Object
	{
    return {
      activeIndex: 0,
      width: 0
    }
  }

  componentDidMount():void
  {
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.updateDimensions();
  }

  render():any
  {
		const _ar:Array<Object> = this._getImages()

    return (
      <div className="Carourel">
        <ul>
          {_ar}
        </ul>
        {_ar.length > 1 ? this._getButtons() : null}
      </div>
    )
	}



  // -- VIEWS

  /**
   * Retrive all the images in an Array, estimate if the image should be displayed
   * and if the image is the currently selected.
   * @return {Array<Object>}
   */
  _getImages():Array<Object>
  {
    const { images } = this.props
    let _ar:Array<Object> = [], i:Number, img:Object
    console.log(images)
    const { totalVisible, activeIndex } = this.state
    const mid:Number = totalVisible/2

    for (i=0; i<SLIDER_MAX; i++) {
      console.log(totalVisible, '', activeIndex);
      img = images[i]
      //console.log(img);
      _ar.push(
        <CarouselItem
          key={ i }
          index={ i }
          activeIndex={ activeIndex }
          isVisible={ i >= activeIndex - mid && i < activeIndex  + mid }
          url={ img.webformatURL }
        />
      )
    }
    return _ar
  }

  /**
   * Buttons to navigate in previous or next images.
   * @return {View}
   */
  _getButtons():any
  {
    return (
      <div className="buttons">
        <button className="prev" onClick={this._onPrev.bind(this)}>
          <b>Prev</b>
          <i></i>
        </button>
        <button className="next" onClick={this._onNext.bind(this)}>
          <b>Next</b><i></i>
        </button>
      </div>
    )
  }




	// -- CONTROLLERS

  /**
   * Event received on press 'Prev'
   * Restrict the navigation to 6 items.
   * @param {MouseEvent} e MouseEvent Object
   * @return {void}
   */
  _onPrev(e:Object):void
  {
    e.preventDefault();
    let index = this.state.activeIndex;
    if (index < 1) {
      index = SLIDER_MAX;
    }
    --index;
    this.setState({ activeIndex: index });
  }

  /**
   * Event received on press 'Next'
   * Restrict the navigation to 6 items.
   * @param {MouseEvent} e MouseEvent Object
   * @return {void}
   */
  _onNext(e:Object):void
  {
    e.preventDefault();
    let index = this.state.activeIndex;
    ++index;
    if (index >= SLIDER_MAX) {
      index = 0;
    }
    this.setState({ activeIndex: index });
  }

  /**
   * Set the current active slide to a number.
   * @param {Number} index next active index.
   * @return {void}
   */
  _goTo(index:Number):void
  {
    this.setState({ activeIndex: index });
  }

  /**
   * Listen to window resize and store locally the new dimensions.
   * @return {void}
   */
  updateDimensions():void
  {
    const w:Number = window.innerWidth;

    this.setState({
      width: w,
      totalVisible: Math.floor(w/SLIDER_SIZE)
    });
  }



}
