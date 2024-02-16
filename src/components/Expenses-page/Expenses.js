import './Expenses.css';
import { Bar } from "react-chartjs-2";
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip } from "chart.js";
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend);

function Expenses() {
    const [isBtnDisable, setBtnDisable] = useState({dailyreport:true});

    const days = [
        'Dec 01',
'Dec 02',
'Dec 03',
'Dec 04',
'Dec 05',
'Dec 06',
'Dec 07',
'Dec 08',
'Dec 09',
'Dec 10',
'Dec 11',
'Dec 12',
'Dec 13',
'Dec 14',
'Dec 15',
'Dec 16',
'Dec 17',
'Dec 18',
'Dec 19',
'Dec 20',
'Dec 21',
'Dec 22',
'Dec 23',
'Dec 24',
'Dec 25',
'Dec 26',
'Dec 27',
'Dec 28',
'Dec 29',
'Dec 30',
'Dec 31'
]

const weekly = [
    'Dec 1 - Dec 3',
    'Dec 4 - Dec 10',
    'Dec 11 - Dec 17',
    'Dec 18 - Dec 24',
    'Dec 25 - Dec 31',    
];

const Monthly = [
    'Dec'    
];

    const monthlydata = {
        vms: [11000],
        databases: [10010],
        lambdafunctions: [6000],
        ec2: [4000],
        jira: [800]
    }
    const weeklydata = {
        vms: [1100,1120,1140,1200,900,],
        databases: [1001,1102,1014,1200,1090],
        lambdafunctions: [600,490,494,550,570],
        ec2: [400,112,114,120,90],
        jira: [80,192,134,110,190]
    }
    
    const dailydata = {
        vms: [1100,1120,1140,1200,900,800,1300,1120,1140,1140,1150,1700,1810,1500,1800,1100,1040,1180,1190,1200,990,1130,1110,1400,1510,1230,1320,1240,1240,1080,1100],
        databases: [1001,1102,1014,1200,1090,1080,1030,1012,1014,1014,1015,1070,1801,1050,1080,1010,1004,1018,1019,1020,909,1013,1011,1400,1501,1203,1302,1204,1204,1089,1010],
        lambdafunctions: [600,490,494,550,570,800,830,112,114,114,115,170,181,150,180,110,104,118,119,120,99,113,111,140,151,123,132,124,124,108,121],
        ec2: [400,112,114,120,90,80,130,112,114,114,115,170,181,150,180,110,104,118,119,120,99,113,111,140,151,123,132,124,124,108,119],
        jira: [80,192,134,110,190,180,120,120,140,148,150,130,121,130,150,120,114,180,190,110,199,130,119,120,111,143,112,154,114,180,163]
    }

    let ddata = { 
            datasets:[{
                label: 'VMs',
                data:  dailydata.vms,
                backgroundColor:'rgb(255, 99, 132)'

              }, {
                label: 'Databases',
                data: dailydata.databases,
                backgroundColor:'rgb(75, 192, 192)'
              }, {
                label: 'Lambda Functions',
                data: dailydata.lambdafunctions,
                backgroundColor:'rgb(53, 162, 235)'
              }, {
                label: 'EC2',
                data: dailydata.ec2,
                backgroundColor:'rgb(79, 75, 192)'
              }, {
                label: 'Jira',
                data: dailydata.jira,
                backgroundColor:'rgb(196, 108, 196)'
              }],
            labels:days
        };

        let wdata ={ 
            datasets:[{
                label: 'VMs',
                data:  weeklydata.vms,
                backgroundColor:'rgb(255, 99, 132)'

              }, {
                label: 'Databases',
                data: weeklydata.databases,
                backgroundColor:'rgb(75, 192, 192)'
              }, {
                label: 'Lambda Functions',
                data: weeklydata.lambdafunctions,
                backgroundColor:'rgb(53, 162, 235)'
              }, {
                label: 'EC2',
                data: weeklydata.ec2,
                backgroundColor:'rgb(79, 75, 192)'
              }, {
                label: 'Jira',
                data: weeklydata.jira,
                backgroundColor:'rgb(196, 108, 196)'
              }],
            labels:weekly
        }

        let mdata ={ 
            datasets:[{
                label: 'VMs',
                data:  monthlydata.vms,
                backgroundColor:'rgb(255, 99, 132)'

              }, {
                label: 'Databases',
                data: monthlydata.databases,
                backgroundColor:'rgb(75, 192, 192)'
              }, {
                label: 'Lambda Functions',
                data: monthlydata.lambdafunctions,
                backgroundColor:'rgb(53, 162, 235)'
              }, {
                label: 'EC2',
                data: monthlydata.ec2,
                backgroundColor:'rgb(79, 75, 192)'
              }, {
                label: 'Jira',
                data: monthlydata.jira,
                backgroundColor:'rgb(196, 108, 196)'
              }],
            labels:Monthly
        }

        const option = {
            responsive: true,
            plugins: {
              legend: { display: false },
              datalabels : {
                display: true,
                anchor: "end",
                align: "left",
                formatter: function(context) {
                  return context / 1000 + "k";
                },
                font: {
                  color: "black"
                }
              },
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value, index, ticks) {
                            return '$' + value / 1000 + "k";
                        }
                    },
                    stacked : true,
                },
                x: {
                    stacked : true,
                    grid: {
                        display: false
                     }
                }
            }
          };

    const handleClick = (e) => {
        if(e.target.id === 'monthlyreport')
        {
            setBtnDisable({[e.target.id]: true});
            setData({...mdata});
        }
        else if (e.target.id === 'weeklyreport')
        {
            setBtnDisable({[e.target.id]: true});
            setData({...wdata});
        }
        else
        {
            setBtnDisable({[e.target.id]: true});
            setData({...ddata});
        }
    }

    const [data, setData] = useState({ 
        datasets:[{
            label: 'VMs',
            data:  dailydata.vms,
            backgroundColor:'rgb(255, 99, 132)'

          }, {
            label: 'Databases',
            data: dailydata.databases,
            backgroundColor:'rgb(75, 192, 192)'
          }, {
            label: 'Lambda Functions',
            data: dailydata.lambdafunctions,
            backgroundColor:'rgb(53, 162, 235)'
          }, {
            label: 'EC2',
            data: dailydata.ec2,
            backgroundColor:'rgb(79, 75, 192)'
          }, {
            label: 'Jira',
            data: dailydata.jira,
            backgroundColor:'rgb(196, 108, 196)'
          }],
        labels:days
    });

    return (
        <div className="expense">
            <div className="btns">
                <div>
                    <input type="button" id="dailyreport" value ="Daily" className="dbtn" onClick={(e)=>handleClick(e)} disabled={isBtnDisable['dailyreport']}/>
                </div>
                <div>
                    <input type="button" id="weeklyreport" value ="Weekly" className="wbtn" onClick={(e)=>handleClick(e)} disabled={isBtnDisable['weeklyreport']}/>
                </div>
                <div>
                    <input type="button" id="monthlyreport" value ="Monthly" className="mbtn" onClick={(e)=>handleClick(e)} disabled={isBtnDisable['monthlyreport']}/>
                </div>
                <div className="datepicker">
                
                </div>
            </div>
            <div className="stackedgraph">
                <Bar options={option} data={data}/>
            </div>
        </div>
    );
}

export default Expenses;