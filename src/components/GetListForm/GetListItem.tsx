import React from 'react';
import {SendProps} from '../../types';

interface Props {
  list: SendProps;
}
const GetListItem: React.FC<Props> = ({list}) => {

  return (
    <div className="my-3 p-2 card">
      <div>
        <span><strong>Author:</strong> {list.author}</span>
        <span className="ms-3"><strong>Date:</strong> {list.datetime}</span>
      </div>
      <div><strong>Message:</strong> {list.message}</div>
    </div>
  );
};

export default GetListItem;