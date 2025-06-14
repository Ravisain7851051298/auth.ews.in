const NotificationModel = require('../models/Notification.model'); 
 
async function notifyServiceProviders (_id , data , estimated_Cost) {
    try {
        // Create a new notification object
        const notification = new NotificationModel({
            data: data, // Data related to the booking
            estimated_Cost: estimated_Cost, // Estimated cost of the service 
            ellectrician_id:_id, // Electrician being notified
            isRead: false // Notification is initially unread
        });

        // Save the notification to the database
        await notification.save();

        // Return the saved notification
        return notification;
    } catch (error) {
        console.error("Error notifying service providers:", error);
        throw error; // Propagate the error for further handling
    }

}

module.exports = notifyServiceProviders;