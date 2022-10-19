import { SignedInUserData } from "../types/types";

const useLocalStorage = () => {
  const setLocalStorage = (signedInUserData: SignedInUserData): void =>
    window.localStorage.setItem('signedInUserData', JSON.stringify(signedInUserData));

  const getLocalStorage = (): SignedInUserData =>
    JSON.parse(window.localStorage.getItem('signedInUserData') as string);

  return { getLocalStorage, setLocalStorage };
};

export default useLocalStorage;