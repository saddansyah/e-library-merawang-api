const successResponseBuilder = (data) => {
    return {
        success: true,
        data: data,
    };
};

const errorResponseBuilder = (error) => {
    return {
        success: false,
        error: error.message || 'An error occured',
    };
};

const httpNotFound = (message = 'Request Not Found') => {
    return {
        success: false,
        statusCode: 404,
        message: message
    }
}

const httpBadRequest = (message = 'Bad Request') => {
    return {
        success: false,
        statusCode: 400,
        message: message
    }
}

const httpUnauthorized = (message = 'Unauthorized') => {
    return {
        success: false,
        statusCode: 401,
        message: message
    }
}

module.exports = {
    successResponseBuilder,
    errorResponseBuilder,
    httpNotFound,
    httpBadRequest,
    httpUnauthorized
}