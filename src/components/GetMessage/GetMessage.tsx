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
        if(!response.ok){
          throw new Error('ERROR' + response.status);
        }

        const posts: SendProps[] = await response.json();
        const dateTime = posts[posts.length - 1].datetime;
        console.log('result', dateTime);
        console.log('rest', posts);

        const dataresponse = await fetch(`${url}?datetime=${dateTime}`);

        const dataMessage: SendProps[] = await dataresponse.json();
        setListItem(dataMessage.reverse());
        console.log('111',dataMessage);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    setInterval(fetchMessage, 4000);
  }, []);


  return (
    <div>
      <GetListForm listItem={listItem} />
    </div>
  );
};

export default GetMessage;