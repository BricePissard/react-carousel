/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

import Constants from '../Constants'

/**
 * Simple Async/Await function to retrieve the images from Pixabay API
 * @see https://pixabay.com/api/docs/
 * @param {Object} params Parameters to send to theWS, Ex {query: 'text to search'}
 * @return {Promise}
 */
export default async function getData(params) {
  function onSuccess(success) {
    return success
  }
  function onError(error) {
    return error
  }
  try {
    const IMAGE_TYPE:string = 'photo'
    const res = await fetch(`https://pixabay.com/api/?key=${Constants.API_KEY}&image_type=${IMAGE_TYPE}&q=${params.query}`)
    const success = await res.json()
    return onSuccess(success);
  } catch (error) {
    return onError(error)
  }
}
