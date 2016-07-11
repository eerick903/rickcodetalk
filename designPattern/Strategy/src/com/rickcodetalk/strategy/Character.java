package com.rickcodetalk.strategy;

public class Character {

	/**
	 * 
	 */
	public Move strategy;

	public Character(Move strategy) {
		
		this.strategy = strategy;
	}
	
	/**
	 * Getter of strategy
	 */
	public Move getStrategy() {
	 	 return strategy; 
	}

	/**
	 * Setter of strategy
	 */
	public void setStrategy(Move strategy) { 
		 this.strategy = strategy; 
	}

	/**
	 * 
	 */
	public void executeMove() { 
		
		strategy.move();
	 } 

}
