package com.rickcodetalk.facade;

public class BankAccount { 

	private static double balance = 100;
	
	public double getBalance() {
		
		return balance;
	}
	
	public void withdraw(double money) {
		
		balance -= money;
		System.out.println("Balance : " + balance);
	}
	
	
	public void deposit(double money) {
		
		balance += money;
		System.out.println("Balance : " + balance);

	}
}
