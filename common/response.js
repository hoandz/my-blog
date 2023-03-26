// export default là một object, chứa các phương thức trả về response
export default {
  success: (res, data = null) => {
    res.status(200).json({
      success: true,
      data: data,
    });
  },

  created: (res, data = null) => {
    res.status(201).json({
      success: true,
      data: data,
    });
  },

  badRequest: (res, error = null) => {
    res.status(400).json({
      success: false,
      error: error || "Bad request",
    });
  },

  unauthorized: (res, error = null) => {
    res.status(401).json({
      success: false,
      error: error || "Unauthorized",
    });
  },

  forbidden: (res, error = null) => {
    res.status(403).json({
      success: false,
      error: error || "Forbidden",
    });
  },

  notFound: (res, error = null) => {
    res.status(404).json({
      success: false,
      error: error || "Not found",
    });
  },

  serverError: (res, error = null) => {
    res.status(500).json({
      success: false,
      error: error || "Internal server error",
    });
  },
};
