export const configureOpenAI = () => {
    return {
        apiKey: process.env.OPEN_AI_SECRET, // Ensure this environment variable is set
        organization: process.env.OPENAI_ORGANIZATION_ID, // Optional, only include if needed
    };
};
//# sourceMappingURL=openai-config.js.map