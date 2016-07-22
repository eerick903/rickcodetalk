package com.rickcodetalk.factoryMethod;

public class HondaCivicFactory implements CarFactory {

	/**
	 * 
	 * @return 
	 */
	public Car createCar() { 
		// TODO Auto-generated method
		return new HondaCivic();
	 } 

}
