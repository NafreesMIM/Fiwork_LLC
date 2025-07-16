// firebase/functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Ensure you install openai in your functions directory: npm install openai
const OpenAI = require('openai');

// IMPORTANT: Set your OpenAI API key in Firebase environment config:
// firebase functions:config:set openai.api_key="YOUR_OPENAI_API_KEY"
const openai = new OpenAI({ apiKey: functions.config().openai?.api_key="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" });

// Trigger AI analysis when a brief's status changes to 'Payment Received - In Progress'
// This is the primary trigger for AI based on your manual admin action
exports.analyzeBriefOnPaymentConfirmed = functions.firestore
  .document('clientBriefs/{briefId}')
  .onUpdate(async (change, context) => {
    const oldBrief = change.before.data();
    const newBrief = change.after.data();
    const briefId = context.params.briefId;

    // Check if the status changed from *not* "Payment Received - In Progress"
    // to "Payment Received - In Progress" AND if AI analysis hasn't been done yet.
    if (
        oldBrief.status !== 'Payment Received - In Progress' &&
        newBrief.status === 'Payment Received - In Progress' &&
        !newBrief.aiAnalysis // Ensure it only runs once per brief
    ) {
      console.log(`Brief ${briefId} status changed to 'Payment Received - In Progress'. Triggering AI analysis.`);

      // Construct a detailed prompt for the AI
      const prompt = `Act as a senior brand strategist and graphic designer. Analyze the following client brief for a logo design project. Provide concise, actionable insights, suggested visual styles, and potential symbolic elements. Highlight any potential challenges or ambiguities in the brief.

Brief Details:
Brand Name: ${newBrief.brandName || 'N/A'}
Slogan: ${newBrief.slogan || 'N/A'}
Industry: ${newBrief.industry || 'N/A'}
Preferred Colors: ${newBrief.preferredColors || 'N/A'}
Description of Design: ${newBrief.description || 'N/A'}
${newBrief.inspirationFiles && newBrief.inspirationFiles.length > 0 ? `Inspiration File Names: ${newBrief.inspirationFiles.map(f => f.name).join(', ')} (Note: I cannot see the images, only names.)` : ''}

Provide your analysis in a structured format:
1.  **Core Brand Essence/Keywords:** What are the 3-5 most important keywords that define this brand?
2.  **Suggested Visual Styles:** Based on the brief, what 2-3 design styles (e.g., minimalist, vintage, futuristic, organic, abstract, iconic, wordmark, mascot) would be most appropriate?
3.  **Color Psychology/Palette Direction:** Interpret the preferred colors (if any) and suggest a primary direction or complementary colors from a psychological perspective.
4.  **Symbolic Elements/Motifs:** What potential symbols, shapes, or concepts could represent this brand's identity?
5.  **Potential Challenges/Questions for Client:** Are there any ambiguities or areas that require further clarification from the client?`;

      try {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o", // gpt-4o or gpt-4-turbo for better quality, gpt-3.5-turbo for lower cost
          messages: [{ role: "user", content: prompt }],
          max_tokens: 1000, // Adjust token limit as needed
          temperature: 0.7, // Adjust creativity
        });

        const aiAnalysis = completion.choices[0].message.content;

        // Update the brief document with AI insights for the designer to review
        await admin.firestore().collection('clientBriefs').doc(briefId).update({
          aiAnalysis: aiAnalysis,
          aiProcessedAt: admin.firestore.FieldValue.serverTimestamp(),
          aiStatus: 'completed'
        });

        console.log(`AI analysis completed and saved for brief ${briefId}`);
        return null;
      } catch (error) {
        console.error("Error during AI analysis Cloud Function:", error.message, error.stack);
        // Log error to Firestore for debugging in admin panel
        await admin.firestore().collection('clientBriefs').doc(briefId).update({
          aiError: `AI analysis failed: ${error.message.substring(0, 500)}`, // Truncate long errors
          aiProcessedAt: admin.firestore.FieldValue.serverTimestamp(),
          aiStatus: 'failed'
        });
        return null;
      }
    }
    return null; // No status change or already processed
  });