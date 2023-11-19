import React from 'react';
import {SendProps} from '../../types';

interface Props {
  list: SendProps;
}
const GetListItem: React.FC<Props> = ({list}) => {

  return (
    <div key={list.id}>
      <div>
        <span>Author: {list.author}</span>
        <span>{list.datetime}</span>
      </div>
      <div>Message: {list.message}</div>
    </div>
  );
};

export default GetListItem;