'use client';

import Button from './button'
import { useState } from 'react';

const ButtonClick = () => {
  const [message, setDate] = useState<{start:string, end:string}>(); // state to hold the message

  const handleClick1 = () => {
    setDate({start:'2000-01-01', end:'2009-12-31'});
  };

  const handleClick2 = () => {
    setDate({start:'2010-01-01', end:'2019-12-31'});
  };


  return (
    <>
    <div style={{ padding: '20px' }}>
      <Button label="2000-2009" onClick={handleClick1} />
    </div>
    <div style={{ padding: '20px' }}>
      <Button label="2010-20019" onClick={handleClick2} />
    </div>
    {message && <p>Start Date: {message.start} End Date: {message.end}</p>}
  </>
  );
};

export default ButtonClick;
