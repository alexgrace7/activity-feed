import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from 'react';
import axios from 'axios';

export interface Post {
  profileImage: string;
  postContent: string;
  likeCount: number;
  id: string;
  username: string;
  timeStamp: string;
}

// Current User's Data
interface UserData {
  userName: string;
  likedPosts: string[];
  profileImage: string;
}

// Data being pushed/pulled from localStorage
interface LocalData {
  activity: Post[];
  user: UserData;
}

interface PostContextValue {
  localData: LocalData;
  setLocalData: Dispatch<SetStateAction<LocalData>>;
  userSearch: string;
  setUserSearch: Dispatch<SetStateAction<string>>;
  keywordSearch: string;
  setKeywordSearch: Dispatch<SetStateAction<string>>;
}

const PostContext = createContext<PostContextValue | undefined>(undefined);

export const usePostContext = (): PostContextValue => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within PostProvider');
  }
  return context;
};

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: FC<PostProviderProps> = ({ children }) => {
  const [localData, setLocalData] = useState<LocalData>(() => {
    const storedData = localStorage.getItem('myData');
    // set up localData
    return storedData ? JSON.parse(storedData) : { user: { likedPosts: [], posts: [] }, activity: [] };
  });
  const [userSearch, setUserSearch] = useState<string>('');
  const [keywordSearch, setKeywordSearch] = useState<string>('');

  // fetch data from endpoint
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get('https://static.mediafly.com/fe-takehome/activity.json');
        const fetchedData: LocalData = response.data;

        // Add an ID to each post
        fetchedData.activity = fetchedData.activity.map((post: Post) => {
          if (!post.id) {
            post.id = `${post.username}${post.timeStamp}`;
          }
          return post;
        });

        // sorting the posts by most recent
        fetchedData.activity.sort((a: Post, b: Post) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());

        // add user's activity to local storage
        fetchedData.user = {
          userName: 'CurrentUser',
          likedPosts: [],
          profileImage: 'https://xsgames.co/randomusers/assets/avatars/pixel/4.jpg',
        };

        setLocalData(fetchedData);
        // Save data to localStorage to persist
        localStorage.setItem('myData', JSON.stringify(fetchedData));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // update localStorage if any changes are made to the localData state
  useEffect(() => {
    localStorage.setItem('myData', JSON.stringify(localData));
  }, [localData]);

  const contextValue: PostContextValue = {
    localData,
    setLocalData,
    userSearch,
    setUserSearch,
    keywordSearch,
    setKeywordSearch,
  };

  return <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>;
};
