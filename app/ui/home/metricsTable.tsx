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
    <table className="min-w-full table-auto border-collapse border border-gray-200 px-4 py-2 border-b text-left">
    <thead>
      <tr>
        <th>Lighthouse</th>
        <th>Type</th>
        <th>Max Metric</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{rangename}</td>
        <td>Range</td>
        <td>{maxrange} N</td>
      </tr>
      <tr>
        <td>{towerheightname}</td>
        <td>Tower Height</td>
        <td>{maxtowerheight} Meters</td>
      </tr>
      <tr>
        <td>{abovewatername}</td>
        <td>Above Water</td>
        <td>{maxabovewater} Meters</td>
      </tr>
      <tr>
        <td>{agename}</td>
        <td>Age</td>
        <td>{maxage} Years</td>
      </tr>
    </tbody>
  </table>
  );
}