
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { ContextData, FitAssessmentItem } from '../types';

const getAiClient = (): GoogleGenAI => {
    const apiKey = sessionStorage.getItem('gemini-api-key');
    if (!apiKey) {
        throw new Error("API_KEY_MISSING");
    }
    return new GoogleGenAI({ apiKey });
};


const fileToGenerativePart = (base64Data: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64Data.split(',')[1],
      mimeType
    },
  };
};

export async function generateTryOnImage(userImage: string, garmentImage: string, contextData: ContextData): Promise<string> {
  const ai = getAiClient();
  const userImageMime = userImage.match(/data:(image\/\w+);base64,/)?.[1] || 'image/jpeg';
  const garmentImageMime = garmentImage.match(/data:(image\/\w+);base64,/)?.[1] || 'image/png';

  const prompt = `You are an expert AI stylist for a virtual trial room. Your primary task is to create a photorealistic composite image.
  Realistically place the provided garment onto the person in the user image. 
  Consider the following user preferences: ${JSON.stringify(contextData)}.
  Pay close attention to fit, style, pose, lighting, and shadows to ensure the final image is seamless and believable. The output must be the generated image only.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: prompt },
        fileToGenerativePart(userImage, userImageMime),
        fileToGenerativePart(garmentImage, garmentImageMime),
      ],
    },
    config: {
        responseModalities: [Modality.IMAGE],
    },
  });

  if (response.candidates && response.candidates[0].content.parts[0].inlineData) {
      const generatedPart = response.candidates[0].content.parts[0];
      const base64Image = generatedPart.inlineData.data;
      const mimeType = generatedPart.inlineData.mimeType;
      return `data:${mimeType};base64,${base64Image}`;
  } else {
    throw new Error("Image generation failed or returned an unexpected format.");
  }
}

export async function getFitAssessment(
  userImage: string, 
  garmentImage: string, 
  generatedImage: string,
  contextData: ContextData
): Promise<{ fitAssessment: FitAssessmentItem[], styleRecommendations: string[] }> {
    const ai = getAiClient();
    const userImageMime = userImage.match(/data:(image\/\w+);base64,/)?.[1] || 'image/jpeg';
    const garmentImageMime = garmentImage.match(/data:(image\/\w+);base64,/)?.[1] || 'image/png';
    const generatedImageMime = generatedImage.match(/data:(image\/\w+);base64,/)?.[1] || 'image/png';

    const prompt = `You are a professional AI fashion advisor.
    Analyze the provided images: 1) the original user, 2) the garment, and 3) the virtual try-on result.
    Also consider the user's preferences: ${JSON.stringify(contextData)}.

    Your task is to provide a detailed "Virtual Fit Assessment" and "Style Match Recommendations".
    
    For the fit assessment, identify potential areas of concern (e.g., Shoulders, Length, Fit Type) and provide a recommendation and a suggested action.
    For style recommendations, suggest three complementary items to complete the look.
    
    Return the analysis in the specified JSON format.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
            parts: [
                { text: prompt },
                fileToGenerativePart(userImage, userImageMime),
                fileToGenerativePart(garmentImage, garmentImageMime),
                fileToGenerativePart(generatedImage, generatedImageMime),
            ],
        },
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    fitAssessment: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                area: { type: Type.STRING, description: "Area of Concern (e.g., Shoulders, Length, Chest)" },
                                recommendation: { type: Type.STRING, description: "AI's analysis of the fit in this area." },
                                action: { type: Type.STRING, description: "A suggested action for the user (e.g., 'Try the next size up')." }
                            },
                            required: ["area", "recommendation", "action"]
                        }
                    },
                    styleRecommendations: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING
                        },
                        description: "An array of three strings, each suggesting a complementary clothing item."
                    }
                },
                required: ["fitAssessment", "styleRecommendations"]
            },
        },
    });
    
    try {
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse JSON response:", response.text);
        throw new Error("Could not get fit assessment due to an invalid format from the API.");
    }
}
