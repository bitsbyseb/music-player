/**
 * @typedef TimeInMinutes
 * @property {number} minutes
 * @property {number} seconds
 * 
 * @param {number} durationInSeconds 
 * @returns {TimeInMinutes}
 */
export function parseSecondsInMinutes(durationInSeconds) {
  const total = durationInSeconds / 60;
  const totalMinutes = total - (total % 1);
  const remainingSeconds = Math.floor((total - totalMinutes) * 60);
  return {
    minutes: totalMinutes,
    seconds: remainingSeconds
  }
}