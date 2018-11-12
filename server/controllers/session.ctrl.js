const axios = require('axios');

const client = axios.create({
  baseURL: 'http://localhost:8000/'
});

module.exports = {
  createSession: (req, res, next) => {
    console.log(req.body.code);

    client.post('/oauth/token', {
      client_id: '497f6e942c12049b25219e2e6d23ddfcbd3f3be7b7de3672d2bc79a36d0205d2',
      client_secret: process.env.CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: req.body.code,
      redirect_uri: 'http://localhost:3000/auth/redirect'
    })
      .then((response) => {
        res.json({ access_token: response.data.access_token });
      })
      .catch((err) =>{
        console.log(req.body.code);
      });
  },

  testRedirect: (req, res, next) => {
    return res.json({response: "You were redirected"});
  }
};
