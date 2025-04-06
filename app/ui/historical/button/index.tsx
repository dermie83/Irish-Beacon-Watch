'use client';

<<<<<<< HEAD
import { reformatDate } from '@/app/lib/utils';
import Button from './yearlyRangeChangebutton';
import { useRouter, useSearchParams } from 'next/navigation';

const YearRangeButtons = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleYearRangeChange = (start: string, end: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('startDate', start);
    params.set('endDate', end);
    
    // Preserve existing query params like page and search
    router.push(`?${params.toString()}`);
  };

  const date = new Date().toISOString();
  const formattedDate = reformatDate(date);
  

  return (
    <>
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
      <Button label="2000-2009" onClick={() => handleYearRangeChange('2000-01-01', '2009-12-31')} />
      <Button label="2010-2019" onClick={() => handleYearRangeChange('2010-01-01', '2019-12-31')} />
      <Button label="2020" onClick={() => handleYearRangeChange('2020-01-01', '2020-12-31')} />
      <Button label="2021" onClick={() => handleYearRangeChange('2021-01-01', '2021-12-31')} />
      <Button label="2022" onClick={() => handleYearRangeChange('2022-01-01', '2022-12-31')} />
      <Button label="2023" onClick={() => handleYearRangeChange('2023-01-01', '2023-12-31')} />
      <Button label="2024" onClick={() => handleYearRangeChange('2024-01-01', '2024-12-31')} />
      <Button label="2025" onClick={() => handleYearRangeChange('2025-01-01', formattedDate)} />
    </div>
    </>
  );
};

export default YearRangeButtons;
=======
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
>>>>>>> origin/dev
