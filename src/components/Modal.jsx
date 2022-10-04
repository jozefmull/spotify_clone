import React, {useEffect} from 'react'

import {MdClose} from 'react-icons/md'

import styles from '../css/Modal.module.css'

const Modal = ({data, setopenModal}) => {

    useEffect(() => {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            setopenModal(false)
        }
      })
      return () => document.removeEventListener('keydown',(e) => {
        if (e.key === 'Escape') {
            setopenModal(false)
        }
      })
    }, [setopenModal])
    

    const catchParentClick = (e) => {
        if (e.target.id === 'modal_wrapper') {
            setopenModal(false)
        }
    }

  return (
    <div id='modal_wrapper' className={styles.modal_wrapper} onClick={(e) => catchParentClick(e)}>
        <div className={styles.modal_container}>
            <div className={styles.modal_content}>
                <h2 className='font-bold mb-5 text-xl text-gray-300'>Lyrics:</h2>
                {data.map((line,id) => (
                <p key={`lyrics-${line}-${id}`} className="text-gray-400 text-base my-1">{line}</p>
                ))}
            </div>
            <MdClose color={'#fff'} size={30} cursor={'pointer'} onClick={() => setopenModal(false)}/>
        </div>
    </div>
  )
}

export default Modal