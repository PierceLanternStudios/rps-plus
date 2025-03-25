/*
Declaration of `Move` type

Used as the basis for type aliasing rocks, papers, and scissors
*/

export type Move = "rock" | "paper" | "scissors";
export const moves: readonly Move[] = ["rock", "paper", "scissors"];
