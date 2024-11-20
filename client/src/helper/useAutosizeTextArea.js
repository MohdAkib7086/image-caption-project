
const autoResizeTextarea = (textarea) => {
  // const textarea = textAreaRef.current;
  // const size=textarea.style.height;
  textarea.style.height = '25px'; // Reset the height to auto to recalculate the height
  textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scroll height
};

  export {autoResizeTextarea};