import GetListForm from '../GetListForm/GetListForm';
import { useEffect, useState } from 'react';
import { SendProps } from '../../types';
import './Loader.css';

const GetMessage = () => {
  const [listItem, setListItem] = useState<SendProps[]>([]);
  const [lastDatetime, setLastDatetime] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const url = 'http://146.185.154.90:8000/messages';

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('ERROR ' + response.status);
        }

        const posts: SendProps[] = await response.json();

        if (posts.length > 0) {
          const latestDatetime = posts[posts.length - 1].datetime;
          if (latestDatetime !== lastDatetime) {
            setListItem(posts);
            setLastDatetime(latestDatetime);
          }
        }

      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMessageLastDatetime = async () => {
      try {
        const dataresponse = await fetch(`${url}?datetime=${lastDatetime}`);
        if (!dataresponse.ok) {
          throw new Error('ERROR ' + dataresponse.status);
        }
        const dataMessage: SendProps[] = await dataresponse.json();
        if (dataMessage.length > 0) {
          setListItem(dataMessage.reverse());
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    void fetchMessage();
    const interval = setInterval(fetchMessageLastDatetime, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div>
          <GetListForm listItem={listItem} />
        </div>
      )}
    </>
  );
};

export default GetMessage;
