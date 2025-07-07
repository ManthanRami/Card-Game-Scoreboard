'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered advice to new Kachuful players.
 *
 * - getAiAdvice - A function that takes a player's score and bidding history and provides advice.
 * - GetAiAdviceInput - The input type for the getAiAdvice function.
 * - GetAiAdviceOutput - The return type for the getAiAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetAiAdviceInputSchema = z.object({
  currentScore: z.number().describe('The player\'s current score.'),
  biddingHistory: z.string().describe('The player\'s bidding history in the current game.'),
});
export type GetAiAdviceInput = z.infer<typeof GetAiAdviceInputSchema>;

const GetAiAdviceOutputSchema = z.object({
  advice: z.string().describe('AI-powered advice for the player.'),
});
export type GetAiAdviceOutput = z.infer<typeof GetAiAdviceOutputSchema>;

export async function getAiAdvice(input: GetAiAdviceInput): Promise<GetAiAdviceOutput> {
  return getAiAdviceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getAiAdvicePrompt',
  input: {schema: GetAiAdviceInputSchema},
  output: {schema: GetAiAdviceOutputSchema},
  prompt: `You are an AI assistant that provides advice to new players of the card game Kachuful.

  The player\'s current score is {{{currentScore}}}.
  The player\'s bidding history is: {{{biddingHistory}}}.

  Based on the score and bidding history, provide a short, helpful tip to improve their gameplay. Focus on identifying unconventional bids and suggesting more strategic approaches. Be concise.`,
});

const getAiAdviceFlow = ai.defineFlow(
  {
    name: 'getAiAdviceFlow',
    inputSchema: GetAiAdviceInputSchema,
    outputSchema: GetAiAdviceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
