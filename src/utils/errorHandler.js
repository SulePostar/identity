const errorHandler = (ctrlFunction) => async (req, res, next) => {
  let message = 'Internal Server Error';
  try {
    return await ctrlFunction(req, res, next);
  } catch (error) {
    // console.log(error);
    
    switch (error.name) {
      case 'SequelizeValidationError':
        message = 'Validation Error';
        break;
      case 'SequelizeUniqueConstraintError':
        message = 'Duplicate Entry';
        break;
      case 'NotFoundError':
      case 'NotLoggedIn':
      case 'Unauthorized':
        message = error.message;
        break;
      default:
        break;
    }
  }
  res.status(200).json({
    error: true,
    message
  });
}

export default errorHandler;