package com.rickcodetalk.strategy;

public class TestStrategy {

	public static void main(String[] args) {

		Character character1 = new Character(new Walk());
		character1.executeMove();
		
		Character character2 = new Character(new Run());
		character2.executeMove();
		
		Character character3 = new Character(new Fly());
		character3.executeMove();
		
		character3.setStrategy(new Walk());
		character3.executeMove();
	}

}
