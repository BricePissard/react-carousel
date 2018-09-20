/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { PureComponent } from 'react'
import Constants from '../Constants'
import CarouselItem from './CarouselItem'

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

  /**
   * Initialize screen resize listener at component mount.
   */
  componentDidMount():void
  {
    window.addEventListener("resize", this.updateDimensions.bind(this))
    this.updateDimensions()
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
    const { totalVisible, activeIndex } = this.state
    const mid:Number = totalVisible/2
    let _ar:Array<Object> = [], i:Number, img:Object

    for (i=0; i<Constants.SLIDER_MAX; i++) {
      img = images[i]
      if (img) {
        _ar.push(
          <CarouselItem
            key={ i }
            index={ i }
            activeIndex={ activeIndex }
            isVisible={ i >= activeIndex - mid && i < activeIndex  + mid }
            url={ img.webformatURL || '' }
          />
        )
      }
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
    e && e.preventDefault()
    let index = this.state.activeIndex
    if (index < 1) {
      index = Constants.SLIDER_MAX
    }
    --index;
    this.setState({ activeIndex: index })
  }

  /**
   * Event received on press 'Next'
   * Restrict the navigation to 6 items.
   * @param {MouseEvent} e MouseEvent Object
   * @return {void}
   */
  _onNext(e:Object):void
  {
    e && e.preventDefault()
    let index = this.state.activeIndex
    ++index
    if (index >= Constants.SLIDER_MAX) {
      index = 0
    }
    this.setState({ activeIndex: index })
  }

  /**
   * Set the current active slide to a number.
   * @param {Number} index next active index.
   * @return {void}
   */
  _goTo(index:Number):void
  {
    this.setState({ activeIndex: index })
  }

  /**
   * Listen to window resize and store locally the new dimensions.
   * @return {void}
   */
  updateDimensions():void
  {
    const w:Number = window.innerWidth

    this.setState({
      width: w,
      totalVisible: Math.floor(w/Constants.SLIDER_SIZE)
    });
  }



}
