class QueryController {
  constructor(queryService) {
    this.queryService = queryService;
  }

  async addQuery(req, res) {
    try {
      const newQuery = await this.queryService.createQuery(req.body);
      res.status(201).json(newQuery);
    } catch (error) {
      res.status(500).json({ message: 'Error adding query', error: error.message });
    }
  }

  async getQueries(req, res) {
    try {
      const queries = await this.queryService.getAllQueries();
      res.status(200).json(queries);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving queries', error: error.message });
    }
  }

  async getQueryById(req, res) {
    try {
      const query = await this.queryService.getQueryById(req.params.id);
      if (!query) {
        return res.status(404).json({ message: 'Query not found' });
      }
      res.status(200).json(query);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving query', error: error.message });
    }
  }

  async updateQuery(req, res) {
    try {
      const updatedQuery = await this.queryService.updateQuery(req.params.id, req.body);
      if (!updatedQuery) {
        return res.status(404).json({ message: 'Query not found' });
      }
      res.status(200).json(updatedQuery);
    } catch (error) {
      res.status(500).json({ message: 'Error updating query', error: error.message });
    }
  }

  async deleteQuery(req, res) {
    try {
      const deleted = await this.queryService.deleteQuery(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Query not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting query', error: error.message });
    }
  }
}

export default QueryController;