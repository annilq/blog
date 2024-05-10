import React from 'react';

// Recursively builds JSX output adding `<mark>` tags around matches
const Highlight: any = ({ value = "", indices = [], index = 1 }) => {
  const pair = indices[indices.length - index];
  const [start, end] = pair || []

  return !pair ? value : (
    <>
      <Highlight value={value.substring(0, start)} indices={indices} index={index + 1} />
      <mark>{value.substring(start, end + 1)}</mark>
      {value.substring(end + 1)}
    </>
  );
};

// FuseHighlight component
const FuseHighlight = ({ value, indices }: { value: any, indices: any }) => {

  return <Highlight value={value} indices={indices} />;
};

export default FuseHighlight;