import React from 'react'
import Modal from "react-modal";

const LoadProjectForm = (props) => {
  return (
    <Modal
      className="modal"
      isOpen={props.loadProjectIsOpen}
      onRequestClose={props.closeLoadProject}
    ><div className='container'>
      <form className='form'>
        <h1
          style={{
            marginBottom: "4rem",
          }}
        >
          프로젝트 불러오기
        </h1>
      LoadProjectForm prototype
      <button className="btn"
      onClick={props.closeLoadProject}>
        확인
      </button>
      </form>
    </div>
    </Modal>
  )
}
export default LoadProjectForm;
