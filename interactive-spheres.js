import Spheres1Background from './min.js'

const bg = Spheres1Background(document.getElementById('webgl-canvas'), {
  count: 100,
  minSize: 0.3,
  maxSize: 1,
  gravity: 0.5
})

// document.body.addEventListener('click', () => {
//   bg.spheres.setColors([0xffffff * Math.random(), 0xffffff * Math.random(), 0xffffff * Math.random()])
// })

//document.body.addEventListener('keydown', (ev) => {
//  bg.spheres.config.gravity = bg.spheres.config.gravity === 0 ? 1 : 0
//})

document.getElementById('gravity-btn').addEventListener('click', () => {
  bg.spheres.config.gravity = bg.spheres.config.gravity === 0 ? 1 : 0
})

document.getElementById('colors-btn').addEventListener('click', () => {
  bg.spheres.setColors([0xffffff * Math.random(), 0xffffff * Math.random(), 0xffffff * Math.random()])
})