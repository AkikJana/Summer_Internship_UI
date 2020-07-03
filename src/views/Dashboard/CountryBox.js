import React,{Component} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import crossfilter from 'crossfilter2';
import Card from "@material-ui/core/Card";
import { GetGraphInfo } from "../../services/services";
import axios from "axios";
function throwOptions(categoryArray, valueArray){
    const options ={
        chart: {
          type: 'bar',
          height: "280px",
          backgroundColor:"#252c48",
      },
      title: {
          style:{
          color:"white",
          },
          align:"left",
          text: 'Total Amount By Company Code'
      },
      xAxis: {
      lineWidth: 0,
      minorGridLineWidth: 0,
      labels:{
          style:{
          color:"white",
          },
          },
          categories: categoryArray,
          title: {
              text: null, 
          }
      },
      yAxis: {
       gridLineWidth: 0,
        minorGridLineWidth: 0,
          min: 0,
          visible:false
      },
      legend:{
      enabled:false,
      
      },
      tooltip: {
          
          valueSuffix: '$'
      },
      plotOptions: {
          bar: {
              borderWidth: 0,
              color:'grey',
              dataLabels: {
                  enabled: false,
              },
              groupPadding: 0,
              stacking: 'normal',
              pointWidth: 20,
              pointPadding: 0
          },
          series: {
              groupPadding: 0,
              stacking: 'normal',
              pointWidth: 20,
              pointPadding: 0
          }
      },
      credits: {
          enabled: false
      },
      series: [{
          data: valueArray
      }
       ]
      };

      return options;
}

class CountryBox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchVal: "",
            data: [],
            advance: false,
        };
    }
    async componentDidMount() {
       /* GetGraphInfo().then((res) => {
            const data = res.data;
            this.setState({ data });
        });*/

        axios.get("http://localhost:8080/1705205/GraphCompany",{ headers: {'Content-Type': 'application/json'}})
        .then(response => {
            //const tmp=response.data;
            //this.setState({viewableEls:response.data});
            this.setState({data:response.data});
            console.log(this.state.data)
          })
          .catch(error => console.log(error));
    }

    render(){
        console.log(this.state.data);

        var myArray = this.state.data;
        var i=0;
       console.log(myArray);
        //if(this.state.data){
        /*var payments=crossfilter(this.state.data);
        var paymentsByType = payments.dimension(function(d) { return d.customer_name; }),
    paymentVolumeByType = paymentsByType.group().reduceSum(function(d) { return d.total_open_amount; }),
    topTypes = paymentVolumeByType.top(1);
        //var CompanyArr=payments.dimension(d=>d.customer_name);
        /*var paymentVolumeByCode = CompanyArr.group().reduceSum(d=>{console.log(d.total_open_amount); return d.total_open_amount;});
        console.log(paymentVolumeByCode);
       var topTypes = paymentVolumeByCode.top(1);
console.log(topTypes[0].key); // the top payment type (e.g., "tab")
console.log(topTypes[0].value);} */
//console.log(paymentVolumeByType);
        var categories = [];
        var amounts = [];

        while(i < myArray.length){
            categories.push(myArray[i].customer_name);
            amounts.push(myArray[i].total_open_amount);
            i=i+1;
        }
        console.log("1) ",categories);
        console.log("2) ",amounts);

        return(
            <Card className="sideCard">
                <div className="vertScroll" autoid="companycode-chart">
                    <HighchartsReact highcharts={Highcharts} options={throwOptions(categories,amounts)}/>
                </div>
            </Card>
        );
    }
}
export default CountryBox;