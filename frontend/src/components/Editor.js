import React, { useContext } from 'react';

import Panel from './Panel';
import Output from './Output';
import Spinner from './Spinner';
import Settings from './Settings';
import CodeContext from '../context/CodeContext';
import Input from './Input';
import CodeSpace from './CodeSpace';

export default function Editor() {
  const { result, isLoading } = useContext(CodeContext);
  return (
    <>
      <Settings />
      <Input />
      <div id='code-editor'>
          <div id='playground'>
            <Panel />
            <CodeSpace />
          </div>
          <div id='output-box'>
            {isLoading && <Spinner />}
            {result && <Output />}
          </div>
      </div>
    </>
  );
}
