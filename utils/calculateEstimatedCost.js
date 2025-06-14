function calculateEstimatedCost( service_type, dynamic_Info ) {
    let estimatedCost = 0;

    // Define cost factors based on service type
    const costFactors = {
        "New Installations": 1000,
        "Repairs and Maintenance": 800,
        "Appliance and Machinery Installation": 1200,
        "Safety and Upgrades": 900,
        "Energy Efficiency Solutions": 1100,
        "Emergency Services": 1500
    };

    // Check if the service type exists in the cost factors
    if (costFactors[service_type]) {
        estimatedCost += costFactors[service_type];
    } else {
        throw new Error("Invalid service type provided.");
    }

    // Add dynamic costs based on additional information
    if (dynamic_Info && typeof dynamic_Info === 'object') {
        for (const key in dynamic_Info) {
            if (dynamic_Info.hasOwnProperty(key)) {
                estimatedCost += dynamic_Info[key] || 0; // Add any additional costs
            }
        }
    }
    console.log("running Estimated Cost function:", estimatedCost);
    return estimatedCost;
}

module.exports = calculateEstimatedCost;
// This function calculates the estimated cost based on the service type and any additional dynamic information provided.