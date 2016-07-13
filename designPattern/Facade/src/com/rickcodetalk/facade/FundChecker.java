package com.rickcodetalk.facade;

public class FundChecker { 

	
	public boolean isFundAvaliable(double money) {
		
		BankAccount account = new BankAccount();
		
		return (account.getBalance() >= money);
	}
}
