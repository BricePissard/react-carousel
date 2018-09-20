/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React, { PureComponent } from 'react'

export default class CarouselItem extends PureComponent {

  static defaultProps:Object = {
    id: 0,
    index: 0,
    activeIndex: 0,
    url: ''
  }

	render():any
  {
    const img:Object = this.props
    const num:Number = img.index + 1
    const _className:String = " " +
    ((this.props.isVisible === true )? "visible" : null) + " " +
    ((this.props.index === this.props.activeIndex) ? "active" : null)
    return (
      <li className={ _className }>
        <div className="imgC">
          <img src={ img.url } alt={ img.index }/>
          <b>{ num }</b>
        </div>
        <span>Image { num } title</span>
      </li>
    )
	}

}
