package com.rickcodetalk.facade;

public class TestATM {

	/**
	 * 
	 */

	public static void main(String args[]) {
		
		ATMFacade facade = new ATMFacade("VALID");
		
		facade.withdraw(55);
		facade.withdraw(5);
		facade.withdraw(111);

	}

}
