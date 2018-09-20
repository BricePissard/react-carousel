/* @flow */
/* eslint-disable prefer-const */
/* jshint esversion: 6 */

const KEY:string = '9656065-a4094594c34f9ac14c7fc4c39'
const IMAGE_TYPE:string = 'photo';

/**
 * Simple Async/Await function to retrieve the images from Pixabay API
 * @see https://pixabay.com/api/docs/
 */
export default async function getData(params) {
  function onSuccess(success) {
    return success
  }
  function onError(error) {
    return error
  }
  try {
    const res = await fetch(`https://pixabay.com/api/?key=${KEY}&image_type=${IMAGE_TYPE}&q=${params.query}`)
    const success = await res.json()
    return onSuccess(success);
  } catch (error) {
    return onError(error);
  }
}
