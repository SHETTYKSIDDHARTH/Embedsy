import Groq from 'groq-sdk';
import { logger } from '../utils/logger.js';
import { LLM_MODEL } from '../config/constants.js';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateResponse = async (context, userMessage) => {
  try {
    logger.info('Generating LLM response');
    
    const prompt = `You are a helpful AI assistant. Answer the user's question based ONLY on the following context from documentation. If the answer is not in the context, politely say you don't have that information.

Context:
${context}

User Question: ${userMessage}

Provide a clear, concise answer:`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that answers questions based strictly on provided documentation context.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: LLM_MODEL,
      temperature: 0.3,
      max_tokens: 500,
      top_p: 1
    });
    
    const response = completion.choices[0].message.content;
    logger.info('LLM response generated', { length: response.length });
    
    return response;
  } catch (error) {
    logger.error('LLM generation failed', error);
    throw new Error('Failed to generate response: ' + error.message);
  }
};