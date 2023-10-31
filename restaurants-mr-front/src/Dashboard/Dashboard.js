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


  function generateHistogram(data, key) {

    // Extract the values from the objects based on the attributeName
  const values = data.map(obj => obj[key]);


    // Calculate the range and bin width
    const minValue = 0
    const maxValue = 5
    const range = maxValue - minValue;
    const binWidth = range / 5;
  
    // Initialize the histogram data array
    const histogramData = [];
  
    // Initialize bins
    for (let i = 0; i < 5; i++) {
      const binStart = minValue + i * binWidth;
      const binEnd = binStart + binWidth;
      const binCount = values.filter(value => value >= binStart && value < binEnd).length;
  
      histogramData.push({
        name: `[${binStart.toFixed(2)}, ${binEnd.toFixed(2)})`,
        count: binCount,
      });
    }
  
    return histogramData;
  }



var typeeCount = countDistinctValues(props.data, "type");
var ratingCount = generateHistogram(props.data, "rating");


return(
    <div className='container'>
        <div className='row'>
            <div className='col-6'>
                <BarChart width={400} height={250} data={typeeCount}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"  minTickGap={0} tick={{ fontSize: 11 }} height={100} dx={-15} dy={40} angle={-75} />
                <YAxis/>
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </div>
            <div className='col-6'>
                <BarChart width={400} height={250} data={ratingCount}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"  minTickGap={0} tick={{ fontSize: 11 }} height={100} dx={-15} dy={40} angle={-75} />
                <YAxis/>
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    <h2>Dashaboard</h2>
   

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