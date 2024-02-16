import './Dropdownprofile.css'

function Dropdownprofile() {

    const dropdownprofileData = [
            {
                title: 'Profile',
                id:1,
                link: ''
            },
            {
                title: 'Settings',
                id:2,
                link: ''
            },
            {
                title: 'Logout',
                id:3,
                link: ''
            },
        ]

    return (
        <div className="dropdownprofile">
            <ul className="dropdownprofileList">
                {dropdownprofileData.map((val, key) => {
                    return <li key={key} className="row" onClick={() => {window.location.pathname = val.link}}>
                        <div id="title">
                            {val.title}
                        </div>
                    </li>
                })}
            </ul>
        </div>
    );
}

export default Dropdownprofile;