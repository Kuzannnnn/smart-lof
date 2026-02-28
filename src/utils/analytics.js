export const smoothData = (rawData, alpha = 0.3) => {
  if (rawData.length === 0) return [];
  
  let smoothed = [rawData[0]];
  for (let i = 1; i < rawData.length; i++) {
    const nextVal = {};
    Object.keys(rawData[i]).forEach(key => {
      if (typeof rawData[i][key] === 'number' && key !== 'time') {
        // Implementation of the SES Algorithm
        nextVal[key] = Number((alpha * rawData[i][key] + (1 - alpha) * smoothed[i - 1][key]).toFixed(2));
      } else {
        nextVal[key] = rawData[i][key];
      }
    });
    smoothed.push(nextVal);
  }
  return smoothed;
};