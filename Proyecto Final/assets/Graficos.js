var LineChart = ReactChartkick.LineChart;
class Graficos extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(<LineChart data={{"2017-01-01": 11, "2017-01-02": 6}} />);
  }
}
