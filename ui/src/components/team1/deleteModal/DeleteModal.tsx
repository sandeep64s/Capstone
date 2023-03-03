import React from 'react';
import Modal from 'react-modal';
import './deleteModal.css';

const customStyles = {
  content: {
    top: '50%',
    height: '200px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "20px",
    background: 'linear-gradient(to bottom right, #A71D31, #3F0D12)',
    overflow: 'hidden',
    color: 'white',
    boxShadow: '0 0px 8px 0 rgb(0, 0, 0), 0 0px 25px 0 rgb(0, 0, 0)',
    border: 'none',
    width: '540px',
    padding: '50px'
  },
};


export const DeleteModal = ({
    open,
    handleClose,
    handleDelete,
  }: {
    open: boolean,
    handleClose: () => void,
    handleDelete : ()=>void

}) => {
    return (    
        <Modal
            ariaHideApp={true}
            isOpen={open}
            style={customStyles}
            contentLabel="Delete Modal"
        >
            <h2 style={{ fontSize:'1.3em', fontWeight: 'bold'}}>Are you sure you want to delete the selected entry&#40;s&#41;?</h2>
          
            <button id='delete-modal-yes-btn' className='delete-modal-button-common' onClick={handleDelete}>Yes</button>
            <button id='delete-modal-no-btn' className='delete-modal-button-common' onClick={()=>handleClose()}>No</button>

        </Modal>
    )
}
