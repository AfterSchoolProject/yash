const sessionController = require('../controllers/session.ctrl');

module.exports = (router) => {
  /**
   * Create a session
   **/
  router
    .route('/session')
    .post(sessionController.createSession);

  router
    .route('/redirected')
    .get(sessionController.testRedirect);
};
