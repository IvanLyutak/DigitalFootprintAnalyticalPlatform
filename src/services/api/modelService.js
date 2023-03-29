import axios from 'axios'

const modelService = (data, callback) => {
    axios.post('/api/analyticsData/modelService', data)
    .then(function (res) {
        console.log(res)
        callback(res.data)
    })
    .catch(function (error) {
        callback("error")
    });
};

export const uploadService = (data, callback) => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }

    axios.post('/upload', data, config)
    .then(function (res) {
        console.log(res)
        callback(res.data)
    })
    .catch(function (error) {
        callback("error")
    });
}

export default modelService