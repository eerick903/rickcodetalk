package com.rickcodetalk.facade;

public class ATMFacade {

	/**
	 * 
	 */
	private BankAccount account;
	/**
	 * 
	 */
	private CardValidator validator;
	/**
	 * 
	 */
	private FundChecker fundChecker;

	String secret;
	
	public ATMFacade(String sec) {
		
		secret = sec;
		account = new BankAccount();
		validator = new CardValidator();
		fundChecker = new FundChecker();
	}
	
	public void withdraw(double money) {
		
		if(validator.isCardValid(secret)) {
			
			if(fundChecker.isFundAvaliable(money)) {
				
				account.withdraw(money);
				
			} else {
				
				System.out.println("Not enough funding!");
			}
			
		} else {
			
			System.out.println("Card is not valid!");
		}
		
	}
	
	public void deposit() {
		
	}
	

}
