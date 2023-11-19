import GetListForm from '../GetListForm/GetListForm';
import { useEffect, useState } from 'react';
import { SendProps } from '../../types';

const GetMessage = () => {
  const [listItem, setListItem] = useState<SendProps[]>([]);
  const url = 'http://146.185.154.90:8000/messages';

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const posts: SendProps[] = await response.json();
          setListItem(posts);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    void fetchMessage();
  }, []);

  return (
    <div>
      <GetListForm listItem={listItem} />
    </div>
  );
};

export default GetMessage;