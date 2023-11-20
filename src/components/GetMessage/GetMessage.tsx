import GetListForm from '../GetListForm/GetListForm';
import { useEffect, useState } from 'react';
import { SendProps } from '../../types';

const GetMessage = () => {
  const [listItem, setListItem] = useState<SendProps[]>([]);
  const [lastDatetime, setLastDatetime] = useState<string>('');
  const url = 'http://146.185.154.90:8000/messages';

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('ERROR ' + response.status);
        }

        const posts: SendProps[] = await response.json();

        if (posts.length > 0) {
          setListItem((prev) => [...prev, ...posts]);
          const latestDatetime = posts[posts.length - 1].datetime;
          setLastDatetime(latestDatetime);
        }
        const dataresponse = await fetch(`${url}?datetime=${lastDatetime}`);
        const dataMessage: SendProps[] = await dataresponse.json();

        setListItem(dataMessage.reverse());
      } catch (error) {
        console.error('Error:', error);
      }
    };

    void fetchMessage();
    const  interval = setInterval(fetchMessage, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <GetListForm listItem={listItem} />
    </div>
  );
};

export default GetMessage;
