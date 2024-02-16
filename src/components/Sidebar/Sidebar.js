import './Sidebar.css';
import { SidebarData, AdminSettings } from './SidebarData';
import { useState } from 'react';

function Sidebar({currentUserType, getSpecificMenu}) {
    const [isTabDisabled, setTabDisabled] = useState('Home');
    const handleClick=(e, val)=>{
        getSpecificMenu(val.title);
        setTabDisabled(val.title);
    }

    return (
        <>
            <ul className="sidebarList">
                {SidebarData.map((val, key) => {
                    return <li key={key} className={isTabDisabled === val.title?"rowclicked":"row"} onClick={(e) => {handleClick(e, val)}}>
                        <div id="icon">
                            {val.icon}
                        </div>
                        <div id="title">
                            {val.title}
                        </div>
                    </li>
                })}
            {currentUserType === 'admin' &&(
            <div>
                {AdminSettings.map((val, key) => {
                    return <li key={key} className={isTabDisabled === val.title?"rowclicked":"row"} onClick={(e)=> { handleClick(e, val)}}>
                        <div id="icon">
                            {val.icon}
                        </div>
                        <div id="title">
                            {val.title}
                        </div>
                    </li>
                })}
            </div>)}
            </ul>
        </>
    );
}

export default Sidebar;