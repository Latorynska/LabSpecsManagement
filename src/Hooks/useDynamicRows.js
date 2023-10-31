import { useState, useEffect } from 'react';

import { useState } from 'react';

function useDynamicRows(initialValue, maxRows) {
  const [value, setValue] = useState(initialValue);
  const [rows, setRows] = useState(1);

  useEffect(() => {
    const numRows = value.split('\n').length;
    setRows(Math.min(maxRows, numRows));
  }, [value, maxRows]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return { value, onChange: handleChange, rows };
}

export default useDynamicRows;