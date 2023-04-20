import { useEffect, useState } from "react";
import { mailSliceActions } from "../store/mailBoxSlice";
import { useDispatch } from "react-redux";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function fetchData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      let mailsData = [];
      for (let key in data) {
        mailsData.push({ id: key, ...data[key] });
      }
      console.log(mailsData, "ooooo");
      dispatch(mailSliceActions.mailSending(mailsData));
      setData(data);
      setLoading(false);
    } catch (error) {
      console.logf(error);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(interval);
  }, [url]);

  return { data, loading };
}
