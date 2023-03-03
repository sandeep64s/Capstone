import React from 'react';
import Modal from 'react-modal';
import { User } from '../../../types/UserTypes';
import './ViewModal.css';

const customStyles = {
  content: {
    top: '50%',
    height: '330px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "20px",
    background: '#4C4C4C',
    color: 'white',
    boxShadow: '0 0px 8px 0 rgb(0, 0, 0), 0 0px 25px 0 rgb(0, 0, 0)',
    border: 'none',
    width: 'auto',
    paddingRight: '50px'
  },
};

export const ViewModal = ({open, handleClose, entry} : {open : boolean, entry:User, handleClose : ()=>void}) => {
    return (
        <Modal
        ariaHideApp={false}
            isOpen={open}
            style={customStyles}
            contentLabel="View Modal"
        >
            <h3 style={{marginLeft:'50px',marginTop:'20px',marginBottom:'20px', fontWeight:'bold'}}>User details</h3>

            <span className='modal-headers'>Name: </span>
            <span className='view-modal-content'>{entry.first_name} {entry.last_name}</span>
            <br />
            
            <span className='modal-headers'>Username: </span>
            <span className='view-modal-content'>{entry.username}</span>
            <br />

            <span className='modal-headers'>Email: </span>
            <span className='view-modal-content'>{entry.email}</span>
            <br />
            
            <span className='modal-headers'>DOB: </span>
            <span className='view-modal-content'>{entry.dob}</span>
            <br /><br />
            
            <button id='view-modal-close-btn' onClick={handleClose}>close</button>
        </Modal>
    )
}
