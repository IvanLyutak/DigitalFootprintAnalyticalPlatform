import axios from 'axios'

const getLaunchedAnalyticsModules = (callback) => {

  axios.get("/api/analyticsData/launchedAnalyticsModules", { withCredentials: 'include' })
        .then(function (response) {
            callback(response.data)
        })
        .catch(function (error) {
          console.log(error, "error");
    });
  };

export const getDataAnalyticsModule = (name, callback) => {

  axios.post("/api/analyticsData/dataAnalyticsModule", name, { withCredentials: 'include' })
        .then(function (response) {
            callback(response.data)
        })
        .catch(function (error) {
          console.log(error, "error");
    });
};


export const getAllAnalyticsModules = (callback) => {

  axios.get("/api/analyticsData/allAnalyticsModules", { withCredentials: 'include' })
        .then(function (response) {
            callback(response.data)
        })
        .catch(function (error) {
          console.log(error, "error");
    });
  };

export default getLaunchedAnalyticsModules

