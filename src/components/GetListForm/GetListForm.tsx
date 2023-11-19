import React from 'react';
import { SendProps } from '../../types';
import GetListItem from './GetListItem';

interface Props {
  listItem: SendProps[];
}

const GetListForm: React.FC<Props> = ({ listItem }) => {
  return (
    <div>
      {listItem.map((item) => (
        <GetListItem key={item.id} list={item} />
      ))}
    </div>
  );
};

export default GetListForm;