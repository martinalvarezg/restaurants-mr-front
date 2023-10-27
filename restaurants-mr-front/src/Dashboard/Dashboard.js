import {BarChart, CartesianGrid,XAxis,YAxis,Tooltip,Legend,Bar,ResponsiveContainer} from 'recharts'

function Dashboard(props){

if (!props.data) {
    // Data hasn't arrived yet, render a loading message or placeholder
    return <p>Loading data...</p>;
  }

function countDistinctValues(objList, key) {
    const distinctValueCounts = {};
    
    for (const obj of objList) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (distinctValueCounts.hasOwnProperty(value)) {
          distinctValueCounts[value] += 1;
        } else {
          distinctValueCounts[value] = 1;
        }
      }
    }
    const keys =  Object.keys(distinctValueCounts);
    const list = [];
    for ( var key of keys){
        list.push({name:key, value: distinctValueCounts[key]})
    }

    return list;
  }

var typeeCount = countDistinctValues(props.data, "type");
console.log('count', typeeCount);

return(
    <div>
    <h2>Dashaboard</h2>
    <BarChart width={730} height={250} data={typeeCount}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name"  minTickGap={0} tick={{ fontSize: 11 }} height={100} dx={-15} dy={40} angle={-75} />
    <YAxis/>
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
    <table className="table">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Dirección</th>
        <th scope="col">Rating</th>
        </tr>
    </thead>
    <tbody>
    {props.data.map((rest, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{rest.name}</td>
        <td>{rest.address}</td>
        <td>{rest.rating}</td>
      </tr>
  ))}
  </tbody>
</table>
</div>

)
}
export default Dashboard;