export default (element, animation, prefix = 'animate__') =>
// We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`
    const node = document.querySelector(element)
    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd() {
      node.classList.remove(`${prefix}animated`, animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      resolve('Animation ended')
    }
    if (node) {
      node.classList.add(`${prefix}animated`, animationName)
      node.addEventListener('animationend', handleAnimationEnd)
    }
  })
