import React, { useContext } from 'react';
import CodeContext from '../context/CodeContext';

export default function Alert() {
  const { message } = useContext(CodeContext);
  return (message &&
    <div className={`alert alert-box alert-${message.type} fixed-top text-center`} role="alert">
        { message.content }
    </div>
  )
}
