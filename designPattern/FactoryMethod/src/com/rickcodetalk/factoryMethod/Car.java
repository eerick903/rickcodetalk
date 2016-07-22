package com.rickcodetalk.factoryMethod;

public abstract class Car { 

	protected String model;
	protected int power;
	protected int seat;
	
	public Car(String model, int power, int seat) {
		
		this.model = model;
		this.power = power;
		this.seat = seat;
	}
	
	public void printInfo() {
		
		System.out.println("Car model : " + this.model + " - power: " + this.power + "cc with " + seat + " seats.");
	}
}
