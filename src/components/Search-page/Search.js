import { useState } from 'react';
import Dropdown from 'react-dropdown-select';
import axios from 'axios';
import './Search.css'

function Search({managementgroupsData, subscriptionsData, resouceGroupsData, vmsData}) {
      const selectAllOption = { label: 'Select All', value: 0 };
      
      const managementgroupList = managementgroupsData !== undefined && managementgroupsData.map(({ name, id  }) => ({ label: name, value: id }));

      const [subscriptions, setSubscriptions] = useState([]);
      const [resources, setResouces] = useState([]);
      const [vms, setVms] = useState([]);

      const subscriptionList = subscriptions !== undefined && subscriptions.map(({ name, id  }) => ({ label: name, value: id }));
    
      const [selectedManagementGroupOptions, setSelectedManagementGroupOptions] = useState([]);
    
      const handleManagementGroupSelectAll = () => {
        if (selectedManagementGroupOptions.length === managementgroupList.length) {
          // If all options are already selected, unselect all
          setSelectedManagementGroupOptions([]);
        } else {
          // If not all options are selected, select all
          setSelectedManagementGroupOptions(managementgroupList);
        }
      };

      const [selectedOptions, setSelectedOptions] = useState([]);
    
      const handleSelectAll = () => {
        if (selectedOptions.length === subscriptionList.length) {
          // If all options are already selected, unselect all
          setSelectedOptions([]);
        } else {
          // If not all options are selected, select all
          setSelectedOptions(subscriptionList);
        }
      };

      const [selectedResouceOptions, setSelectedResouceOptions] = useState([]);
    
      const handleResouceSelectAll = () => {
        if (selectedResouceOptions.length === resouceList.length) {
          // If all options are already selected, unselect all
          setSelectedResouceOptions([]);
        } else {
          // If not all options are selected, select all
          setSelectedResouceOptions(resouceList);
        }
      };

      const [selectedVmsOptions, setSelectedVmsOptions] = useState([]);
    
      const handleVmsSelectAll = () => {
        if (selectedVmsOptions.length === vmsList.length) {
          // If all options are already selected, unselect all
          setSelectedVmsOptions([]);
        } else {
          // If not all options are selected, select all
          setSelectedVmsOptions(vmsList);
        }
      };
    
      let resouceList = resources.map(({ resourcename, resourceId  }) => ({ label: resourcename, value: resourceId }));
      
      async function handleManagementGroupChange(values) {
        setSelectedManagementGroupOptions(values);
        
        setSelectedOptions([]);
        setSelectedResouceOptions([]);
        setSelectedVmsOptions([]);

        setSubscriptions([]);
        setResouces([]);
        setVms([]);
        if(values !== undefined)
        {
            const subscriptionsByManagmentGroupdId = subscriptionsData.filter(
            (res) => 
            values.map(sub => parseInt(sub.value)).includes(res.managementgroupId)
            );
            console.log(subscriptionsByManagmentGroupdId);
            setSubscriptions(subscriptionsByManagmentGroupdId);
        }
        else
        {
          setSubscriptions([]);
          setResouces([]);
          setVms([]);
        }
      }

      async function handleSubscriptionChange(values) {
        setSelectedOptions(values);

        setSelectedResouceOptions([]);
        setSelectedVmsOptions([]);

        setResouces([]);
        setVms([]);

        if(values !== undefined)
        {
            const resoucegroupBySubscriptionIds = resouceGroupsData.filter(
            (res) => 
            values.map(sub => parseInt(sub.value)).includes(res.subscriptionId)
            );
          setResouces(resoucegroupBySubscriptionIds);
        }
        else
        {
          setResouces([]);
          setVms([]);
        }
      }
     
      let vmsList = vms.map(({ vmname, vmid  }) => ({ label: vmname, value: vmid }));
      
      function handleResourceChange(values) {
        setSelectedResouceOptions(values);
        setSelectedVmsOptions([]);
        if(values !== undefined)
        {
          const vmsByresouceGroupIds = vmsData.filter(
            (res) => 
            values.map(sub => parseInt(sub.value)).includes(res.resourceId)
            );
            setVms(vmsByresouceGroupIds);
        }
        else
        {
          setVms([]);
        }
      }

      const handleVmsChange = (values) => {
        setSelectedVmsOptions(values);
      }

      const months = [
        { label: 'January', value: '01' },
        { label: 'February', value: '02' },
        { label: 'March', value: '03' },
        { label: 'April', value: '04' },
        { label: 'May', value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'August', value: '08' },
        { label: 'September', value: '09' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
      ];
    
      
    
      const handleDropdownChange = (values) => {
        setSelectedMonths(values);
      };

      const [selectedMonths, setSelectedMonths] = useState([]);
    
      const handleMonthsSelectAll = () => {
        if (selectedMonths.length === 0) {
          // If all options are already selected, unselect all
          setSelectedMonths(months);
        } else {
          // If not all options are selected, select all
          setSelectedMonths([]);
        }
      };

      const years = [
        { label: '2024', value: '01' },
        { label: '2023', value: '02' }
      ];
    
      
    
      const handleYearDropdownChange = (values) => {
        setSelectedYears(values);
      };

      const [selectedYears, setSelectedYears] = useState([]);
    
      const handleYearsSelectAll = () => {
        if (selectedYears.length === 0) {
          // If all options are already selected, unselect all
          setSelectedYears(years);
        } else {
          // If not all options are selected, select all
          setSelectedYears([]);
        }
      };

      const [configDetails, setConfigDetails] = useState([]); 

      const handleSubmit = () => {
        return axios.post('https://garudadb.azurewebsites.net/api/GetConfigDetailsFromBlobStorage?code=cFwYiRgTBNlwG8fJHIN_0YEU-0w2fPUkx8sFQRC9EfUJAzFuQOkrQg==',{
                managementgroups: selectedManagementGroupOptions.map(sub => sub.label),
                subscriptions: selectedOptions.map(sub => sub.label),
                resouces: selectedResouceOptions.map(res => res.label),
                vms: selectedVmsOptions.map(vms => vms.label),
                months: selectedMonths.map(month => month.label),
                years: selectedYears.map(year => year.label),
        })
        .then((res) => {
            setConfigDetails(res.data);
            return res.data;
        });
      }

    const handleRecommendation = () => {
      alert("Recommendations are inprogress...");
    }

    return (
        <div className="searchdetails">
          <div className="searchbox">
          <Dropdown
        options={[selectAllOption, ...managementgroupList]}
        multi
        placeholder="--management group--"
        values={selectedManagementGroupOptions}
        onChange={(values) => handleManagementGroupChange(values)}
        searchable={true}
        style={{ width: '206px', marginRight: '10px', borderRadius: '25px' }}
        itemRenderer={(props) => (
          <div
            key={props.itemIndex}
            onClick={() => {
              if (props.item.value === 0) {
                handleManagementGroupSelectAll();
              } else {
                props.methods.addItem(props.item);
              }
            }}
            className={props.state.values.findIndex((val) => val.value === props.item.value) !== -1 ? 'selected' : ''}
          >
            <input
              type="checkbox"
              checked={props.state.values.findIndex((val) => val.value === props.item.value) !== -1}
              readOnly
            />
            {props.item.label}
          </div>
        )}
      />

      <Dropdown
        options={[selectAllOption, ...subscriptionList]}
        multi
        placeholder="--subscription--"
        values={selectedOptions}
        onChange={(values) => handleSubscriptionChange(values)}
        searchable={true}
        style={{ width: '206px', marginRight: '10px', borderRadius: '25px' }}
        itemRenderer={(props) => (
          <div
            key={props.itemIndex}
            onClick={() => {
              if (props.item.value === 0) {
                handleSelectAll();
              } else {
                props.methods.addItem(props.item);
              }
            }}
            className={props.state.values.findIndex((val) => val.value === props.item.value) !== -1 ? 'selected' : ''}
          >
            <input
              type="checkbox"
              checked={props.state.values.findIndex((val) => val.value === props.item.value) !== -1}
              readOnly
            />
            {props.item.label}
          </div>
        )}
      />
            <Dropdown
        options={[selectAllOption, ...resouceList]}
        multi
        placeholder="--resouce group--"
        values={selectedResouceOptions}
        onChange={(values) => handleResourceChange(values)}
        searchable={true}
        style={{ width: '206px', marginRight: '10px', borderRadius: '25px'}}
        itemRenderer={(props) => (
          <div
            key={props.itemIndex}
            onClick={() => {
              if (props.item.value === 0) {
                handleResouceSelectAll();
              } else {
                props.methods.addItem(props.item);
              }
            }}
            className={props.state.values.findIndex((val) => val.value === props.item.value) !== -1 ? 'selected' : ''}
          >
            <input
              type="checkbox"
              checked={props.state.values.findIndex((val) => val.value === props.item.value) !== -1}
              readOnly
            />
            {props.item.label}
          </div>
        )}
      />
        <Dropdown
        options={[selectAllOption, ...vmsList]}
        multi
        placeholder="--virtual machine--"
        values={selectedVmsOptions}
        onChange={(values) => handleVmsChange(values)}
        searchable={true}
        style={{ width: '206px', marginRight: '10px', borderRadius: '25px'}}
        itemRenderer={(props) => (
          <div
            key={props.itemIndex}
            onClick={() => {
              if (props.item.value === 0) {
                handleVmsSelectAll();
              } else {
                props.methods.addItem(props.item);
              }
            }}
            className={props.state.values.findIndex((val) => val.value === props.item.value) !== -1 ? 'selected' : ''}
          >
            <input
              type="checkbox"
              checked={props.state.values.findIndex((val) => val.value === props.item.value) !== -1}
              readOnly
            />
            {props.item.label}
          </div>
        )}
      />
      <Dropdown
        id="monthDropdown"
        options={[selectAllOption, ...months]}
        placeholder="Select month(s)"
        valueField="value"
        labelField="label"
        searchable={true}
        style={{ width: '206px', marginRight: '10px', borderRadius: '25px' }}
        multi
        onChange={(values) => handleDropdownChange(values)}
        values={selectedMonths}
        itemRenderer={(props) => (
          <div
            key={props.itemIndex}
            onClick={() => {
              if (props.item.value === 0) {
                handleMonthsSelectAll();
              } else {
                props.methods.addItem(props.item);
              }
            }}
            className={props.state.values.findIndex((val) => val.value === props.item.value) !== -1 ? 'selected' : ''}
          >
            <input
              type="checkbox"
              checked={props.state.values.findIndex((val) => val.value === props.item.value) !== -1}
              readOnly
            />
            {props.item.label}
          </div>
        )}
      />
            <Dropdown
        id="yearDropdown"
        options={[selectAllOption, ...years]}
        placeholder="Select years(s)"
        valueField="value"
        labelField="label"
        searchable={true}
        style={{ width: '206px', borderRadius: '25px' }}
        multi
        onChange={(values) => handleYearDropdownChange(values)}
        values={selectedYears}
        itemRenderer={(props) => (
          <div
            key={props.itemIndex}
            onClick={() => {
              if (props.item.value === 0) {
                handleYearsSelectAll();
              } else {
                props.methods.addItem(props.item);
              }
            }}
            className={props.state.values.findIndex((val) => val.value === props.item.value) !== -1 ? 'selected' : ''}
          >
            <input
              type="checkbox"
              checked={props.state.values.findIndex((val) => val.value === props.item.value) !== -1}
              readOnly
            />
            {props.item.label}
          </div>
        )}
      />
      </div>
      <div className="submt">
            <input type="button" id="submit" value ="Submit" onClick={handleSubmit} className="sbtbtn"/>
            <input type="button" id="Recommendation" value ="Recommendation" onClick={handleRecommendation} className="recbtn"/>
      </div>
      <div className="table-container">
      <table className="responsive-table">
      <thead className="fixed-header">
        <tr>
          <th className="fixed-column" rowSpan='3' colSpan="1">VirtualMachine Name</th>
          <th rowSpan='1' colSpan="4">CPU</th>
          <th rowSpan='1' colSpan="4">Memory</th>
          <th rowSpan='1' colSpan="4">Disk</th>
          <th rowSpan='1' colSpan="4">IOPS</th>
          <th rowSpan='1' colSpan="4">Network</th>
        </tr>
        <tr>
          <th>config</th>
          <th colSpan="2">Usage</th>
          <th>Billing</th>
          <th>config</th>
          <th colSpan="2">Usage</th>
          <th>Billing</th>
          <th>config</th>
          <th colSpan="2">Usage</th>
          <th>Billing</th>
          <th>config</th>
          <th colSpan="2">Usage</th>
          <th>Billing</th>
          <th>config</th>
          <th colSpan="2">Usage</th>
          <th>Billing</th>
        </tr>
      <tr>
          <th></th>
          <th colSpan="1">Min</th>
          <th colSpan="1">Max</th>
          <th></th>
          <th></th>
          <th colSpan="1">Min</th>
          <th colSpan="1">Max</th>
          <th></th>
          <th></th>
          <th colSpan="1">Min</th>
          <th colSpan="1">Max</th>
          <th></th>
          <th></th>
          <th colSpan="1">Min</th>
          <th colSpan="1">Max</th>
          <th></th>
          <th></th>
          <th colSpan="1">Min</th>
          <th colSpan="1">Max</th>
          <th></th>
      </tr>
    </thead>
    <tbody>
            {configDetails.length>0?configDetails.map((item, index) => (
                    <tr key={index}>
                        <td className="fixed-column">{item.virtualMachine} {item.tagName !== "" && item.tagName!= undefined && '[' + item.tagName + ']'}</td>
                        <td>{item.cpuConfig}</td>
                        <td>{item.cpuUsageMin}</td>
                        <td>{item.cpuUsageMax}</td>
                        <td>{item.cpuBilling}</td>
                        <td>{item.memoryConfig}</td>
                        <td>{item.memoryUsageMin}</td>
                        <td>{item.memoryUsageMax}</td>
                        <td>{item.memoryBilling}</td>
                        <td>{item.diskConfig}</td>
                        <td>{item.diskUsageMin}</td>
                        <td>{item.diskUsageMax}</td>
                        <td>{item.diskBilling}</td>
                        <td>{item.iopsConfig}</td>
                        <td>{item.iopsUsageMin}</td>
                        <td>{item.iopsUsageMax}</td>
                        <td>{item.iopsBilling}</td>
                        <td>{item.networkConfig}</td>
                        <td>{item.networkUsageMin}</td>
                        <td>{item.networkUsageMax}</td>
                        <td>{item.networkBilling}</td>
                    </tr>
                )):<tr id="nodata">we dont have data for this search criteria</tr>}
      </tbody>
    </table>
        </div>    
        </div>
    );
}

export default Search;

// https://codepen.io/yaoyao/pen/mezGbN

{/* <table border="1">
    <tr>
        <th rowspan='3' colspan="1">Company</th>
        <th rowspan='1' colspan="2">Address</th>
        <th rowspan='1' colspan="2">Phone</th>
    </tr>
    <tr>
        <th rowspan='1' colspan="1">Address1</th>
        <th rowspan='1' colspan="1">Address2</th>
        <th rowspan='1' colspan="1">Phone1</th>
        <th rowspan='1' colspan="1">Phone2</th>
    </tr>
      <tr>
        <th></th>
        <th rowspan='1' colspan="1">Address2</th>
        <th rowspan='1' colspan="1">Phone1</th>
        <th rowspan='1' colspan="1">Phone2</th>
    </tr>
    <tbody>
        <tr>
            <td>Apple, Inc.</td>
            <td>1 Infinite Loop Cupertino, CA 95014</td>
            <td>USA</td>
            <td>12345</td>
            <td>67890</td>
        </tr>
    </tbody>
</table> */}

// td {
//   text-align: center
// }

// th {
//   min-width: 100px;
//   text-align: center
// }

{/* <tr>
            <td>VirtualMachine 1</td>
            <td>CPU config1</td>
            <td>CPU usage min</td>
            <td>CPU usage max</td>
            <td>CPU billing1</td>
            <td>Memory config1</td>
            <td>Memory usage min</td>
            <td>Memory usage max</td>
            <td>Memory billing1</td>
            <td>Disk config1</td>
            <td>Disk usage min</td>
            <td>Disk usage max</td>
            <td>Disk billing1</td>
            <td>IOPS config1</td>
            <td>IOPS usage min</td>
            <td>IOPS usage max</td>
            <td>IOPS billing1</td>
            <td>Network config1</td>
            <td>Network usage min</td>
            <td>Network usage max</td>
            <td>Network billing1</td>
        </tr>
        <tr>
            <td>VirtualMachine 2</td>
            <td>CPU config2</td>
            <td>CPU usage min</td>
            <td>CPU usage max</td>
            <td>CPU billing2</td>
            <td>Memory config2</td>
            <td>Memory usage min</td>
            <td>Memory usage max</td>
            <td>Memory billing2</td>
            <td>Disk config2</td>
            <td>Disk usage min</td>
            <td>Disk usage max</td>
            <td>Disk billing2</td>
            <td>IOPS config2</td>
            <td>IOPS usage min</td>
            <td>IOPS usage max</td>
            <td>IOPS billing2</td>
            <td>Network config2</td>
            <td>Network usage min</td>
            <td>Network usage max</td>
            <td>Network billing2</td>
        </tr>
        <tr>
            <td>VirtualMachine 3</td>
            <td>CPU config3</td>
            <td>CPU usage min</td>
            <td>CPU usage max</td>
            <td>CPU billing3</td>
            <td>Memory config3</td>
            <td>Memory usage min</td>
            <td>Memory usage max</td>
            <td>Memory billing3</td>
            <td>Disk config3</td>
            <td>Disk usage min</td>
            <td>Disk usage max</td>
            <td>Disk billing3</td>
            <td>IOPS config3</td>
            <td>IOPS usage min</td>
            <td>IOPS usage max</td>
            <td>IOPS billing3</td>
            <td>Network config3</td>
            <td>Network usage min</td>
            <td>Network usage max</td>
            <td>Network billing3</td>
        </tr>
        <tr>
            <td>VirtualMachine 4</td>
            <td>CPU config4</td>
            <td>CPU usage min</td>
            <td>CPU usage max</td>
            <td>CPU billing4</td>
            <td>Memory config4</td>
            <td>Memory usage min</td>
            <td>Memory usage max</td>
            <td>Memory billing4</td>
            <td>Disk config4</td>
            <td>Disk usage min</td>
            <td>Disk usage max</td>
            <td>Disk billing4</td>
            <td>IOPS config4</td>
            <td>IOPS usage min</td>
            <td>IOPS usage max</td>
            <td>IOPS billing4</td>
            <td>Network config4</td>
            <td>Network usage min</td>
            <td>Network usage max</td>
            <td>Network billing4</td>
        </tr>
        <tr>
            <td>VirtualMachine 5</td>
            <td>CPU config5</td>
            <td>CPU usage min</td>
            <td>CPU usage max</td>
            <td>CPU billing5</td>
            <td>Memory config5</td>
            <td>Memory usage min</td>
            <td>Memory usage max</td>
            <td>Memory billing5</td>
            <td>Disk config5</td>
            <td>Disk usage min</td>
            <td>Disk usage max</td>
            <td>Disk billing5</td>
            <td>IOPS config5</td>
            <td>IOPS usage min</td>
            <td>IOPS usage max</td>
            <td>IOPS billing5</td>
            <td>Network config5</td>
            <td>Network usage min</td>
            <td>Network usage max</td>
            <td>Network billing5</td>
        </tr> */}