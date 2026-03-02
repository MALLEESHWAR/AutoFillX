import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_MODEL = "gemini-3-flash-preview";

export interface ExtractedData {
  fullName?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  idNumber?: string;
  idType?: string;
  fatherName?: string;
  phoneNumber?: string;
  mobileNumber?: string;
  houseNo?: string;
  street?: string;
  landmark?: string;
  area?: string;
  village?: string;
  postOffice?: string;
  pinCode?: string;
  district?: string;
  state?: string;
}

export const extractDataFromDocument = async (
  apiKey: string,
  fileBase64: string,
  mimeType: string
): Promise<ExtractedData> => {
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `Extract key citizen details from this Indian identity document (Aadhaar, PAN, Voter ID, etc.). 
  Return the data in JSON format. 
  
  If it's an Aadhaar card, you MUST extract and map the following fields specifically:
  - fullName: The full name of the person.
  - dateOfBirth: The date of birth. Look for "DOB:", "Date of Birth:", or "Year of Birth:". If only Year of Birth is found (e.g., 1990), format it as 01-01-1990. Always format as DD-MM-YYYY.
  - gender: Male, Female, or Third Gender / Transgender.
  - idNumber: The 12-digit Aadhaar number.
  - mobileNumber: The mobile number if present.
  - houseNo: House/Building/Flat number.
  - street: Street/Road/Lane.
  - landmark: Landmark.
  - area: Area/Locality/Sector.
  - village: Village/Town/City.
  - postOffice: Post Office name.
  - pinCode: 6-digit PIN code.
  - district: District name.
  - state: State name.

  If it's a PAN card, extract fullName, fatherName, dateOfBirth, and idNumber (PAN number).
  
  Return null for any field not found. Be extremely precise with Indian addresses.`;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: [
      {
        parts: [
          { text: prompt },
          {
            inlineData: {
              data: fileBase64.split(",")[1],
              mimeType: mimeType,
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fullName: { type: Type.STRING },
          dateOfBirth: { type: Type.STRING },
          gender: { type: Type.STRING },
          address: { type: Type.STRING },
          idNumber: { type: Type.STRING },
          idType: { type: Type.STRING },
          fatherName: { type: Type.STRING },
          mobileNumber: { type: Type.STRING },
          houseNo: { type: Type.STRING },
          street: { type: Type.STRING },
          landmark: { type: Type.STRING },
          area: { type: Type.STRING },
          village: { type: Type.STRING },
          postOffice: { type: Type.STRING },
          pinCode: { type: Type.STRING },
          district: { type: Type.STRING },
          state: { type: Type.STRING },
        },
      },
    },
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    return {};
  }
};

export const translateText = async (
  apiKey: string,
  text: string,
  targetLanguage: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: `Translate the following text to ${targetLanguage}. Return only the translated text: "${text}"`,
  });
  return response.text || text;
};
