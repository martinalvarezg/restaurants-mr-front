
function Dashboard(props){

if (!props.data) {
    // Data hasn't arrived yet, render a loading message or placeholder
    return <p>Loading data...</p>;
  }

console.log('Props',props.data)

return(
    <div>
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