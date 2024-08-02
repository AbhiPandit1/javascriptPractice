import { useEffect, useState, useCallback } from 'react';

const useHandleScroll = () => {
  const [data, setData] = useState([
    { id: '1', name: 'Abhishek', detail: 'He is a good man' },
    { id: '2', name: 'Ravi', detail: 'He loves coding' },
    { id: '3', name: 'Priya', detail: 'She is a great designer' },
    { id: '4', name: 'Nikhil', detail: 'He is a data scientist' },
    { id: '5', name: 'Anjali', detail: 'She enjoys painting' },
    { id: '6', name: 'Vikram', detail: 'He is a musician' },
    { id: '7', name: 'Meera', detail: 'She is an author' },
    { id: '8', name: 'Arjun', detail: 'He is a professional athlete' },
    { id: '9', name: 'Kavya', detail: 'She is a chef' },
    { id: '10', name: 'Rahul', detail: 'He is a teacher' },
    { id: '11', name: 'Sneha', detail: 'She is a photographer' },
  ]);

  const loadMoreData = useCallback(() => {
    setData((prevData) => {
      const lastId = parseInt(prevData[prevData.length - 1]?.id || '0');
      const newData = Array.from({ length: 11 }, (_, index) => ({
        id: (lastId + index + 1).toString(),
        name: `New User ${lastId + index + 1}`,
        detail: 'New user detail',
      }));
      return [...prevData, ...newData];
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      loadMoreData();
    }
  }, [loadMoreData]);

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 300);
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [handleScroll]);

  return { data };
};

// Debounce utility function
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export default useHandleScroll;
