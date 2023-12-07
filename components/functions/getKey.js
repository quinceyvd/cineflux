export const getKey = () => {
    // Get API key from runtime config
    const config = useRuntimeConfig();
    const API_KEY = config.public.apiKey
    return API_KEY
}