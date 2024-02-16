import { useState } from 'react';
import './Modal.css'

function ModalAdapter({handleDownload, handleSendEmail, handleScheduleMeeting}) {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    }

    // const openInNewTab = (url) => {
    //     window.open(url, '_blank', 'noreferrer');
    //   };
      
    return (
        <>
        <input type="button" id="options" value ="More" className="optbtn" onClick={toggleModal}/>
        {modal &&
        (<div className="modal">
            <div className="overlay" onClick={toggleModal}>
                <div className="modal-content">
                <button
                type="button"
                className="close-modal"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
                    <div className="optionsbtns">
                        <span className='option1' onClick={handleDownload}>Export Image</span>
                        <span className='option2' onClick={handleSendEmail}>Send Notification</span>
                        <span className='option3' onClick={handleScheduleMeeting}>Schedule Meeting</span>
                        {/* <input type="button" id="exportexcel" value ="Export Excel" className="modal-excel"/>
                        <input type="button" id="sendnotification" value ="Send Notification" className="modal-notification"/>
                        <input type="button" id="schedulemeeting" value ="Schedule Meeting" className="modal-schedule"/> */}
                    </div>
                </div>
            </div>
        </div>
        )
        }   
        </>
    );
}

export default ModalAdapter;
