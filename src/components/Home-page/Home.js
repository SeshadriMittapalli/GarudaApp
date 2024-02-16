import Sidebar from "../Sidebar/Sidebar";
import Dropdownprofile from "../Dropdown-page/Dropdownprofile";
import logo from '../../company_logo.png';
import './Home.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useRef, useState} from 'react';
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { BarElement,  CategoryScale,Chart as ChartJS,Legend, LinearScale,Title, Tooltip, ArcElement } from "chart.js";
import Expenses from "../Expenses-page/Expenses";
import ModalAdapter from "../Modal-page/Modal";
import { Colors } from 'chart.js';
import html2canvas from 'html2canvas';
import emailjs from 'emailjs-com';
import axios from 'axios';
import PushPinIcon from '@mui/icons-material/PushPin';
import Search from "../Search-page/Search";

ChartJS.register(CategoryScale, LinearScale, BarElement,Title,Tooltip,Legend, ArcElement, Colors);

function Home({currentUserType}) {
    const [shouldOpenProfile, setOpenProfile] = useState(false);
    const [menuName, setMenuName] = useState('Home');
    const [graphBoxsData, setGraphBoxsData] = useState( [
        {
            id: 1,
            graphType: 'doughnut',
            pin: false
        },
        {
            id: 2,
            graphType: 'barchart',
            pin: false
        },
        {
            id: 3,
            graphType: 'piechart',
            pin: false
        },
        {
            id: 4,
            graphType: 'barchart',
            pin: false
        },
        {
            id: 5,
            graphType: 'piechart',
            pin: false
        },
        {
            id: 6,
            graphType: 'doughnut',
            pin: false
        },
        {
            id: 7,
            graphType: 'piechart',
            pin: false
        },
        {
            id: 8,
            graphType: 'doughnut',
            pin: false
        },
        {
            id: 9,
            graphType: 'barchart',
            pin: false
        },
    ]);

    const handleClick = () => {
        setOpenProfile(!shouldOpenProfile);
    }

    const barOptions = {
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
            colors: {
                forceOverride: true
            },
            font: {
              color: "black"
            }
          }
        },
        scales: {
            y: {
                ticks: {
                    callback: function(value, index, ticks) {
                        return '$' + value / 1000 + "k";
                    }
                }
            },
            x: {
                grid: {
                    display: false
                 }
            }
        }
      };

    const data = {
        labels : ["July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            data:[170000.57,210000.57,190000.57,225000.57,270000.57,140000.57]
          },
        ],
      
      };
    const [managementgroupsData, setManagementGroupsData] = useState([]);
    const [subscriptionsData, setSubscriptionsData] = useState([]);
    const [resouceGroupsData, setresourceGroupsData] = useState([]);
    const [vmsData, setVmsData] = useState([]);

    async function getSpecificMenu(menu){
        if(menu === 'Pools')
        {
            await getmanagementGroupList();
            await getSubscriptionsList();
            await getResouceGroupsList();
            await getVmsList();
        }
        setMenuName(menu);
    }

    async function  getmanagementGroupList() {
        return await axios.get('https://garudadb.azurewebsites.net/api/GetManagementGroupFromBlobStorage?code=GG1zXu-dnP26WJbQL5wotMvpwEK9dt4BMRSyajYL34qzAzFuO2AgRw==')
        .then((res) => {
            setManagementGroupsData(res.data.managementgroups);
            return res.data.managementgroups;
        });
    }

    async function  getSubscriptionsList() {
        return await axios.get('https://garudadb.azurewebsites.net/api/GetSubscriptionsFromBlobStorage?code=u1CSbQ-j33M4R-D4XqFnMwmLbQKXH85qPBRtRRtL5kSqAzFu-P6epg==')
        .then((res) => {
            setSubscriptionsData(res.data.subscriptions);
            return res.data.subscriptions;
        });
    }

    async function  getResouceGroupsList() {
        return await axios.get('https://garudadb.azurewebsites.net/api/GetResouceGroupBySubscriptionList?code=RhSMVZDbH_JlH704-X8Pjcqf8uyULh47tY96wyESqTqvAzFuWUk3rw==')
          .then((res) => {
            setresourceGroupsData(res.data.resoucegroups);
              return res.data.resoucegroups;
          });
    }

    async function  getVmsList() {
        return await axios.get('https://garudadb.azurewebsites.net/api/GetVMSByResouceGroupList?code=n0vSboCMqQMw5-AzgZVKyYOM3Zz9KCGIq4EjPjJoo-ycAzFuA2VTpQ==')
        .then((res) => {
            setVmsData(res.data.vms);
            return res.data.vms;
        });
    }
    
    const doughnutdata = {
        labels: data.labels,
        datasets: [{
            data:data.datasets[0].data
        }],
        
    }

    const doughnutOptions ={
        plugins: {
            legend: {
                position: 'right'
            },
            colors: {
                forceOverride: true
            }
        }
    }

    const getChartType = (e, index) => {
        if(e.target.className === 'bx bxs-doughnut-chart')
        graphBoxsData[index].graphType = 'doughnut';
        else if (e.target.className === 'bx bxs-bar-chart-alt-2')
        graphBoxsData[index].graphType = 'barchart';
        else if (e.target.className === 'bx bxs-pie-chart-alt-2')
        graphBoxsData[index].graphType = 'piechart';

        setGraphBoxsData([...graphBoxsData]);
    }

    const handlePin = (e, index) => {
        graphBoxsData[index].pin = !graphBoxsData[index].pin;
        setGraphBoxsData([...graphBoxsData]);
      }

    const dragBox = useRef(0);
    const draggerOverBox = useRef(0);

    function handleSort() {
        const newGraphBoxsData = [...graphBoxsData];
        const temp = newGraphBoxsData[dragBox.current];
        newGraphBoxsData[dragBox.current] = newGraphBoxsData[draggerOverBox.current];
        newGraphBoxsData[draggerOverBox.current] = temp;
        setGraphBoxsData([...newGraphBoxsData]);
    }

    const handleDownload = async (e, index, val) => {
        const chartRef = document.getElementById(index+"-"+val.graphType); // Replace with your chart's ID
        const canvas = await html2canvas(chartRef);
        const dataUrl = canvas.toDataURL('image/png');
    
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'chart.png';
        a.click();
      };

      const handleSendEmail = async (e, index, val) => {
        // const chartRef = document.getElementById(index+"-"+val.graphType);
        // const canvas = await html2canvas(chartRef);
        // const imageData = canvas.toDataURL('image/png');
    
        // Configure your Email.js service ID and template ID
        const serviceId = 'service_r3k181n';
        const templateId = 'template_0mkxz9a';
    
        // Configure your Email.js user ID
        const userId = 'AMEvi9fLVwsXT5_Jc';
    
        try {
          const response = await emailjs.send(serviceId, templateId, {
            to_email: 'seshadri6080@gmail.com',
            from_name: 'Lorvin Technologies',
            subject: 'Chart Image',
            body: 'Check out this chart!'
          }, userId);
    
            console.log('Email sent successfully:', response);
        } catch (error) {
            console.log('Error sending email:', error);
        }
      };

      const handleScheduleMeeting = async () => {
        const apiKey = 'AIzaSyBXkM8nUr8dMihNbGM7YfKQXo24QmG1X9g'; // Replace with your Google Calendar API key
    
        const calendarApiUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
    
        const eventData = {
          summary: 'Lorvin Technology meeting',
          start: {
            dateTime: '2024-01-01T10:00:00',
            timeZone: 'UTC',
          },
          end: {
            dateTime: '2024-01-01T11:00:00',
            timeZone: 'UTC',
          },
        };
    
        try {
          const response = await axios.post(calendarApiUrl, eventData, {
            params: {
              key: apiKey,
            },
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          console.log('Meeting scheduled successfully:', response.data);
        } catch (error) {
          console.error('Error scheduling meeting:', error);
        }
      };

    return (
        <div className="home">
            <div className="logotext">
                <img src={logo} alt="Logo" />
                <span onClick={()=>handleClick()}>
                    <AccountCircleIcon style={{ color: 'white', position: 'absolute', right: '45px', top: '5px', fontSize: '40px' }}/>
                </span>
                {shouldOpenProfile && <Dropdownprofile />}
            </div>
            <div className="sidebar">
                <Sidebar currentUserType={currentUserType} getSpecificMenu={getSpecificMenu}/>
            </div>
            {menuName === 'Home' &&
            (<div className="homedetails">
                <ul>
                    {graphBoxsData.map((val, index)=>
                    <li key={index} draggable 
                    onDragStart={()=>{dragBox.current = index}}
                    onDragEnter={()=>{draggerOverBox.current = index}}
                    onDragEnd={handleSort}
                    onDragOver={(e)=>e.preventDefault()}
                    >
                        <div>
                            {(val.graphType === 'barchart' || val.graphType === 'piechart') && <i className='bx bxs-doughnut-chart' onClick={(e)=>getChartType(e, index)}></i>}
                            {(val.graphType === 'doughnut' || val.graphType === 'piechart') && <i className='bx bxs-bar-chart-alt-2' onClick={(e)=>getChartType(e, index)}></i>}
                            {(val.graphType === 'barchart' || val.graphType === 'doughnut') && <i className='bx bxs-pie-chart-alt-2' onClick={(e)=>getChartType(e, index)}></i>}
                            <div className="pin"><PushPinIcon fontSize="small" style={ val.pin ? {}: { transform: 'rotate(90deg)' }} onClick={(e)=> handlePin(e, index)}/></div>
                        </div>
                        <div className="graphcontent">
                          {val.graphType === 'doughnut' && <Doughnut id={index+"-doughnut"} data={doughnutdata} options={doughnutOptions}/>}
                          {val.graphType === 'barchart' && <Bar id={index+"-barchart"} data={data} options={barOptions}/>}
                          {val.graphType === 'piechart' && <Pie id={index+"-piechart"} data={doughnutdata} options={doughnutOptions}/>}
                        </div>
                        <div>
                            <ModalAdapter handleDownload={(e)=> handleDownload(e, index, val)} handleSendEmail={(e)=> handleSendEmail(e, index, val)} handleScheduleMeeting={handleScheduleMeeting}/>
                        </div>
                    </li>
                    )}
                </ul>
            </div>
            )}
            {/* {shouldDisplayHome&&
                <div className="homepage">
                    <div className="expenses" onClick={()=>showExpenses()}>
                        Organization Expenses
                    </div>
                <div className="topSideleft">
                    <Bar options={option} data={data}/>
                </div>
                </div>
            } */}
            {menuName === 'Expenses' && 
                <div>
                    <Expenses />
                </div>
            }
            {menuName === 'Recommendations' && 
                <div>
                    Recommendations
                </div>
            }
            {menuName === 'Resources' && 
                <div>
                    Resources
                </div>
            }
            {menuName === 'Pools' && 
                    <Search managementgroupsData={managementgroupsData} subscriptionsData={subscriptionsData} resouceGroupsData={resouceGroupsData} vmsData={vmsData}/>
            }
        </div>
    );
}

export default Home;