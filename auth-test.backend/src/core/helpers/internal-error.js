export default (res, error) =>
    res
        .status(500)
        .json({ message: error.message, error: 'SOMETHING_WENT_WRONG' });
