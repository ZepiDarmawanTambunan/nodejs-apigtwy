const apiAdapter = require('../../apiAdapter');
const {
  URL_SERVICE_COURSE
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async(req, res) =>{
    try {
        console.log(URL_SERVICE_COURSE);
        const mentors = await api.get('/api/mentors');
        return res.json(mentors.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
          console.log(error);
        return res.status(500).json({ status: 'error', message: 'service unavailable' });
      }
  
      const { status, data } = error.response;
      return res.status(status).json(data);
    }
}