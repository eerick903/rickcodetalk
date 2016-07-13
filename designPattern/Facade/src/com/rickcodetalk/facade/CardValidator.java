package com.rickcodetalk.facade;

public class CardValidator { 

	public boolean isCardValid(String secret) {
		
		if(secret.equals("VALID")) {
			
			return true;
		} else {
			
			return false;
		}
	}
}
