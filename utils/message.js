const messages = {
    default: {
        success: 'Success',
        system_error: 'System error occured',
        server_error: 'Internal Server Error',
        no_data_found: 'No data found'
    },
    user: {
        user_exist: 'User already exists',
        user_created: 'User created successfully',
        login_successful: 'Login successful',
        password_incorrect: 'Password is incorrect',
        user_not_found: 'User not found',
        user_updated: 'User updated successfully'
    },
    feedback: {
        feedback_submitted: 'Feedback submitted successfully',
        something_went_wrong: 'Something went wrong',
        invalid_page: 'Invalid page number or data not available'
    }
};

module.exports = messages;