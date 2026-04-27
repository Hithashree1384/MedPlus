import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔐 Setup Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Fallback logic (expanded)
const fallbackAnalysis = (text) => {
  text = text.toLowerCase();
  if (text.includes("hi") || text.includes("hello")) {
  return {
    doctor: "",
    tests: [],
    urgency: "",
    advice: "Hi! I’m your AI Health Assistant. Describe your symptoms 😊",
  };
}

  // Heart & Breathing
  if (text.includes("chest") || text.includes("breath") || text.includes("heart") || text.includes("palpitation")) {
    return {
      doctor: "Cardiologist",
      tests: ["ECG", "Blood Test", "Echo"],
      urgency: "High",
      advice: "Visit hospital immediately",
    };
  }

  // Fever & Cold
  if (text.includes("fever") || text.includes("cough") || text.includes("cold") || text.includes("flu")) {
    return {
      doctor: "General Physician",
      tests: ["Blood Test", "CBC"],
      urgency: "Low",
      advice: "Rest and monitor symptoms",
    };
  }

  // Headache & Neurology
  if (text.includes("headache") || text.includes("migraine") || text.includes("dizziness") || text.includes("seizure")) {
    return {
      doctor: "Neurologist",
      tests: ["MRI", "CT Scan"],
      urgency: "Medium",
      advice: "Consult doctor if persists",
    };
  }

  // Skin & Dermatology
  if (text.includes("skin") || text.includes("rash") || text.includes("acne") || text.includes("itch")) {
    return {
      doctor: "Dermatologist",
      tests: ["Skin Biopsy", "Blood Test"],
      urgency: "Low",
      advice: "Avoid scratching, consult dermatologist",
    };
  }

  // Bones & Orthopedics
  if (text.includes("bone") || text.includes("joint") || text.includes("fracture") || text.includes("back pain") || text.includes("knee")) {
    return {
      doctor: "Orthopedic",
      tests: ["X-Ray", "MRI"],
      urgency: "Medium",
      advice: "Avoid heavy activity, consult orthopedist",
    };
  }

  // Eyes
  if (text.includes("eye") || text.includes("vision") || text.includes("blur") || text.includes("cataract")) {
    return {
      doctor: "Ophthalmologist",
      tests: ["Eye Exam", "Retinal Scan"],
      urgency: "Medium",
      advice: "Consult eye specialist",
    };
  }

  // Digestive
  if (text.includes("stomach") || text.includes("digestion") || text.includes("nausea") || text.includes("vomit") || text.includes("diarrhea")) {
    return {
      doctor: "Gastroenterologist",
      tests: ["Endoscopy", "Blood Test"],
      urgency: "Medium",
      advice: "Stay hydrated, consult doctor",
    };
  }

  // Diabetes & Thyroid
  if (text.includes("sugar") || text.includes("diabetes") || text.includes("thyroid") || text.includes("hormone")) {
    return {
      doctor: "Endocrinologist",
      tests: ["Blood Sugar", "Thyroid Panel"],
      urgency: "Medium",
      advice: "Monitor levels, consult specialist",
    };
  }

  // Women Health
  if (text.includes("period") || text.includes("pregnancy") || text.includes("menstrual") || text.includes("pcod")) {
    return {
      doctor: "Gynecologist",
      tests: ["Ultrasound", "Blood Test"],
      urgency: "Low",
      advice: "Consult gynecologist",
    };
  }

  // Mental Health
  if (text.includes("stress") || text.includes("anxiety") || text.includes("depression") || text.includes("sleep")) {
    return {
      doctor: "Psychiatrist",
      tests: ["Basic Assessment"],
      urgency: "Medium",
      advice: "Consult mental health specialist",
    };
  }
if (text.includes("ear") || text.includes("nose") || text.includes("throat")) {
  return {
    doctor: "ENT Specialist",
    tests: ["Otoscopy", "Nasal Endoscopy"],
    urgency: "Medium",
    advice: "Consult ENT specialist",
  };
}
  

  // Default
  return {
    doctor: "General Physician",
    tests: ["Basic Checkup"],
    urgency: "Medium",
    advice: "Consult doctor",
  };
};

// 🎯 Main controller
export const analyzeSymptoms = async (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms) {
    return res.status(400).json({ error: "Symptoms required" });
  }
  try {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("No API key");
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  const match = text.match(/\{[\s\S]*\}/);
  const data = JSON.parse(match[0]);

  return res.json(data);

} catch (error) {
  console.log("⚠️ Using fallback AI");

  const fallback = fallbackAnalysis(symptoms);
  return res.json(fallback);
}
};