const controllerHandler = (ctrlFunction) => async (req, res, next) => {
  try {
    await ctrlFunction(req, res, next);
  } catch (error) {
    console.error(error);
    switch (error.name) {
      case 'SequelizeValidationError':
        return res.status(400).json({
          status: 'error',
          message: 'Validation Error',
          errors: error.errors.map(err => (err => ({
            field: err.path,
            message: err.message
          })))
        });
      case 'SequelizeUniqueConstraintError':
        return res.status(409).json({
          status: 'error',
          message: 'Duplicate Entry',
          errors: error.errors.map(err => (err => ({
            field: err.path,
            message: err.message
          })))
        });
      case 'NotFoundError':
        return res.status(404).json({
          status: 'error',
          message: error.message
        });
      default:
        return res.status(500).json({
          status: 'error',
          message: 'Internal Server Error'
        });
    }
  }
}

export default controllerHandler;
