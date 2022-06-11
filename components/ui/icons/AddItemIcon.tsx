import React from 'react'
import classes from './AddItemIcon.module.scss';

interface Props {
    
}

const AddItemIcon = () => {
  return (
      <a
          href="#todo-form"
          className={`sm:w-10 sm:h-10 md:w-14 md:h-14 text-slate-500 border-2 border-slate-300 rounded-full text-3xl hover:bg-slate-500 hover:text-slate-100 ${
              classes['add-icon']
          } ${theme ? 'hover:bg-transparent' : ''}`}
      >
          <FontAwesomeIcon
              icon={faPlus}
              className={`max-w-[3rem] max-h-[3rem] ${theme ? 'text-white' : ''}`}
          />
          <span className={`${classes['add-icon-text']}`}>
              Add <span className="hidden sm:inline">Todo</span>
          </span>
      </a>
  );
}

export default AddItemIcon