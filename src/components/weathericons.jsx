function Weathericons(props){
  const details=[
    {
      bgColor:"#670369",
      title:"latitude",
      result:props.latitude
    },
    {
      bgColor:"#278369",
      title:"longitude",
      result:props.long
    },
    {
      bgColor:"#648369",
      title:"Humidity",
      result:props.humidity
    },
    {
      bgColor:"#123369",
      title:"wind",
      result:props.windspeed
    },
  ]
    return(<>
    <figure className="w-48">
            <img src={props.weathericon} className="rounded-lg" alt="img"></img>
          </figure>
    <h1 className="text-3xl">{props.temp}°C</h1>
          {props.loading && <p>Loading...</p>}
          <h2 className="text-xl font-bold text-red-600">{props.city}</h2>
          <p>{props.country}</p>
          <div className="flex justify-around flex-wrap w-full gap-2 my-4 px-4 text-center">
            {
              details.map(item=>{
                return(<div style={{background:item.bgColor}} className="p-2 flex-grow basis-14 rounded">
                <p className="text-sm">{item.title}</p>
                <p className="text-white">{item.result}</p>
              </div>)
              })
            }
          </div>
    </>)
}
export default Weathericons