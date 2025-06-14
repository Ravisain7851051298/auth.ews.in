function selecteServiceProvider(available_Service_Providers, bookingData) {
    console.log("Available Service Providers sellection function running ");
    // Check if no service providers are available
    if (!available_Service_Providers || available_Service_Providers.length === 0) {
        return "no service provider selected";
    }

    // If exactly one service provider is available, return it
    if (available_Service_Providers.length === 1) {
        return available_Service_Providers[0];
    }

    // If multiple service providers are available, find a match
    for (let i = 0; i < available_Service_Providers.length; i++) {
        const provider = available_Service_Providers[i];
        const serviceTypeMatch = provider.service_type === bookingData.basic_Info.service_type;
        const cityMatch = provider.address.city.toLowerCase() === bookingData.city.toLowerCase();
        const isAvailable = provider.availability === "Available";

        if (serviceTypeMatch && cityMatch && isAvailable) {
            // Best match: service type AND city
            return provider;
        }
    }

    // Second pass: match only by service type and availability
    for (let i = 0; i < available_Service_Providers.length; i++) {
        const provider = available_Service_Providers[i];
        const serviceTypeMatch = provider.service_type === bookingData.basic_Info.service_type;
        const isAvailable = provider.availability === "Available";

        if (serviceTypeMatch && isAvailable) {
            return provider;
        }
    }

    // If no match found, return a message
    return "no matching service provider found";
}

module.exports = selecteServiceProvider;
