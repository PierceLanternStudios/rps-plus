/*
Declaration of `Move` type

Used as the basis for type aliasing rocks, papers, and scissors
*/

export const MOVES = ["rock", "scissors", "paper"] as const;
export type Move = (typeof MOVES)[number];
