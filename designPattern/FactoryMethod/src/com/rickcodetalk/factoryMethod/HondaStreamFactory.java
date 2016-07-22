package com.rickcodetalk.factoryMethod;

public class HondaStreamFactory implements CarFactory {

	public Car createCar() { 
		// TODO Auto-generated method
		return new HondaStream("Honda Stream", 1800);
	 } 
}
