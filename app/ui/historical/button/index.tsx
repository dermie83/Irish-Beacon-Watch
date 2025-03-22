'use client';

import Button from './button';
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

  return (
    <>
      <div style={{ padding: '20px' }}>
        <Button label="2000-2009" onClick={()=>handleYearRangeChange('2000-01-01', '2009-12-31')} />
      </div>
      <div style={{ padding: '20px' }}>
        <Button label="2010-2019" onClick={()=>handleYearRangeChange('2010-01-01', '2019-12-31')} />
      </div>
    </>
  );
};

export default YearRangeButtons;