/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import React from 'react'
import ReactDOM from 'react-dom'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from './App'
import getData from './data/getData'
import Carousel from './components/Carousel'

configure({ adapter: new Adapter() });

const __test_images = [
  {webformatURL: 'https://pixabay.com/get/fake_image_01.jpg'},
  {webformatURL: 'https://pixabay.com/get/fake_image_02.jpg'},
  {webformatURL: 'https://pixabay.com/get/fake_image_03.jpg'}
]

describe('Testing if application can mount', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})

describe('Testing list of images retrieved', () => {
  it('should call the `getData`', () => {
    getData({query:'beautiful+landscape'}).then(images => {
      expect(images.hits).toBeGreaterThan(0)
    })
  })
})

describe('Testing "Carousel" methods', () => {
  it('should click "_onPrev"', () => {
    const wrapper = shallow(<Carousel images={ __test_images } />) //passing the "two" prop to test if it is properly passed to onClick handler
    const instance = wrapper.instance()
    jest.spyOn(instance, '_onPrev')
    wrapper.find('button.prev').simulate('click')
    expect(wrapper.state('activeIndex')).toBe(5)
  })
})
