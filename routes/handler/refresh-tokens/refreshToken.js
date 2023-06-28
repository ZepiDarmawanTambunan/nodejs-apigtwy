const apiAdapter = require('../../apiAdapter');
const jwt = require('jsonwebtoken');
const { 
    URL_SERVICE_USER,
    JWT_SECRET,
    JWT_SECRET_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN_EXPIRED,
} = process.env;

const api = apiAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
    try {
        const {refresh_token: refreshToken, email} = req.body;

        if(!refreshToken || !email){
            return res.status(400).json({
                status:"error",
                message: 'invalid token'
            });
        }

        // cek apakah refresh token ada di database
        await api.get('/refresh_tokens', {params: {refresh_token: refreshToken}});

        // jika ada kita verify refresh token nya
        jwt.verify(refreshToken, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
            if(err){
                return res.status(403).json({
                    status: 'error',
                    message: err.message
                });
            }

            // jika refresh token nya benar,di cek apakah email yg pakai refresh Token ini sama 
            if(email !== decoded.data.email){
                return res.status(403).json({
                    status: 'error',
                    message: 'email isnot valid'
                });
            }
        
            // jika email yg pakai refresh token sama, maka token akan di perbaharui
            const token = jwt.sign({data: decoded.data}, JWT_SECRET, {expiresIn: JWT_ACCESS_TOKEN_EXPIRED});
            return res.json({
                status: 'success',
                data: {
                    token
                }
            });
        });
    } catch (error) {
        if(error.code === 'ECONNREFUSED'){
            return res.status(500).json({status: 'error', message: 'service unavailable'});
        }
        const {status, data} = error.response;
        return res.status(status).json(data);
    }
};