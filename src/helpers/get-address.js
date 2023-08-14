export async function getAddress(ip) {
    const response = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=at_sTfxU3LgO5UPOl6UEA4LFgmGvIbYN&ipAddress=${ip}`
    );
    return await response.json();
}
