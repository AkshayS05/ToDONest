import { useState, useEffect } from "react";

interface useLocalStorageProps<T> {
  // geenric initial state to make it reusbale
  initialState: T;
  // expecting any string to store in a local storahge
  key: string;
}

export function useLocalStorageState<T>({
  initialState,
  key,
}: useLocalStorageProps<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
  //if we have a stored value it will be set to that else it will return the initial state which is [] in this case.
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      // if have value return that else return the initial state
      return storedValue ? JSON.parse(storedValue) : initialState;
    } catch (error) {
      //in case of error, noitify the user and return initial state.
      console.error("Error parsing data from localStorage:", error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      //if value changes, set the value to the new data with the given key
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      //notify if there is an error
      console.error("Error saving data to localStorage:", error);
    }
  }, [value, key]);

  // returning the current state and the updated state
  return [value, setValue];
}
