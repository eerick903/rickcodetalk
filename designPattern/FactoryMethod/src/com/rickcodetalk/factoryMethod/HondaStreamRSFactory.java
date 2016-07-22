package com.rickcodetalk.factoryMethod;

public class HondaStreamRSFactory implements CarFactory {

	public Car createCar() { 
		// TODO Auto-generated method
		return new HondaStream("Honda Stream RS", 2000);
	 } 
}
