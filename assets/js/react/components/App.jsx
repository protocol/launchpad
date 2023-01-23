import React from "react";
import {useEffect, useState} from "react";
import Spinner from "react-bootstrap/Spinner";

export const App = ({component, fetchData, container = null}) => {

  const [fetchingData, setFetchingData] = useState({
    loading: true,
    data: null,
    error: null,
  })

  useEffect(() => {
    const fetchAsync = async () => {
      try {
        const data = await fetchData(container)

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

    if (fetchData) {
      fetchAsync()
    } else {
      setFetchingData({
        loading: false,
        data: {},
        error: null
      })
    }
  }, [])

  let renderComponent = <div>Error rendering component</div>

  if (fetchingData.loading) {
    renderComponent = <Spinner animation="border" />
  }

  if (fetchingData.data) {
    const Component = component
    renderComponent = <Component {...fetchingData.data} />
  }

  return <div>
    {renderComponent}
  </div>
}

export const buildAppComponent = (component, fetchData, container) => {
  return <App component={component} container={container} fetchData={fetchData} />
}
