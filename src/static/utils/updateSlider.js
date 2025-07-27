/**
 * 
 * @param {HTMLInputElement} durationSlider 
 * @param {string} fill 
 * @param {string} background 
 */
export function updatedurationSliderBackground(durationSlider, fill = "red", background = "black") {
  const value = (durationSlider.value - durationSlider.min) / (durationSlider.max - durationSlider.min) * 100;
  durationSlider.style.background = `linear-gradient(to right, ${fill} ${value}%, ${background} ${value}%)`;
}