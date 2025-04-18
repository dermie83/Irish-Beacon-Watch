export type LighthouseMetrcsPropr = {
  maxabovewater:number;
  maxtowerheight:number;
  maxrange:number;
  abovewatername:string;
  towerheightname:string;
  rangename:string;
  agename:string;
  maxage:number;
};


export default function MetricsTable({
  maxabovewater=0,
  maxtowerheight=0,
  maxrange=0,
  abovewatername='none',
  towerheightname='none',
  rangename='none',
  agename='none',
  maxage=0,
}: LighthouseMetrcsPropr) {

  return (
    <table className="min-w-full table-auto border-collapse border border-darkgray px-4 py-2 border-b text-left text-maritime">
  <thead style={{ backgroundColor: '#ADD8E6' }}>
    <tr>
      <th className="px-4 py-2 border-b border-darkgray">LIGHTHOUSE</th>
      <th className="px-4 py-2 border-b border-darkgray">TYPE</th>
      <th className="px-4 py-2 border-b border-darkgray">MAX METRIC</th>
    </tr>
  </thead>
  <tbody>
    <tr style={{ backgroundColor: '#E0FFFF' }}>
      <td className="px-4 py-2 border-b border-darkgray">{rangename}</td>
      <td className="px-4 py-2 border-b border-darkgray">RANGE (W)</td>
      <td className="px-4 py-2 border-b border-darkgray">{maxrange} NM</td>
    </tr>
    <tr style={{ backgroundColor: '#F0FFF0' }}>
      <td className="px-4 py-2 border-b border-darkgray">{towerheightname}</td>
      <td className="px-4 py-2 border-b border-darkgray">TWR HT</td>
      <td className="px-4 py-2 border-b border-darkgray">{maxtowerheight} M</td>
    </tr>
    <tr style={{ backgroundColor: '#E0FFFF' }}>
      <td className="px-4 py-2 border-b border-darkgray">{abovewatername}</td>
      <td className="px-4 py-2 border-b border-darkgray">ABV WTR</td>
      <td className="px-4 py-2 border-b border-darkgray">{maxabovewater} M</td>
    </tr>
    <tr style={{ backgroundColor: '#F0FFF0' }}>
      <td className="px-4 py-2 border-b border-darkgray">{agename}</td>
      <td className="px-4 py-2 border-b border-darkgray">AGE</td>
      <td className="px-4 py-2 border-b border-darkgray">{maxage} YRS</td>
    </tr>
  </tbody>
</table>
  );
}