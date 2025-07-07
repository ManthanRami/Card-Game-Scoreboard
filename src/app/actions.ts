'use server';

import { getAiAdvice as getAiAdviceFlow, type GetAiAdviceInput } from '@/ai/flows/get-advice';

export async function getAiAdvice(input: GetAiAdviceInput) {
  try {
    const result = await getAiAdviceFlow(input);
    return { advice: result.advice };
  } catch (error) {
    console.error('Error getting AI advice:', error);
    // In a real app, you might want to log this error to a monitoring service.
    return { error: 'Failed to get advice from AI coach. Please try again later.' };
  }
}
