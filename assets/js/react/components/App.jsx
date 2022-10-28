import React from "react";
import {useEffect, useState} from "react";
import Spinner from "react-bootstrap/Spinner";

export const App = ({component, fetchData}) => {

  const [fetchingData, setFetchingData] = useState({
    loading: true,
    data: null,
    error: null,
  })

  useEffect(() => {
    const fetchAsync = async () => {
      try {
        const data = await fetchData()

        setFetchingData({
          loading: false,
          data,
          error: null
        })
      } catch (e) {
        setFetchingData({
          loading: false,
          data: null,
          error: e.message
        })
      }
    }

    fetchAsync()
  }, [])

  if (fetchingData.loading) {
    return <Spinner animation="border" />
  }

  if (fetchingData.data) {
    const Component = component
    return <Component {...fetchingData.data} />
  }

  return <div>Error</div>
}
