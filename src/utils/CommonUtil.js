class CommonUtil {
  /**
   * Method used to debounce (or) delay the function call
   * @param {Function} funcToBeExecuted object
   * @return {String} delay amount of delay/debounce object
   */
  static debounce = (funcToBeExecuted, delay) => {
    let timeout;
    return function (...args) {
      const later = () => {
        clearTimeout(timeout);
        funcToBeExecuted(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);
    };
  };
}

export default CommonUtil;
