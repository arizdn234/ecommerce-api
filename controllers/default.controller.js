class DefaultController {
    static async underMaintenance(req, res) {
        try {
            res.status(503).json({ message: 'Sorry, this feature is under maintenance.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async landingPage(req, res) {
        try {
            res.status(200).json({ message: `Visit the API documentation at https://github.com/arizdn234/ecommerce-api#dokumentasi.` });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
  }
  
  module.exports = DefaultController;