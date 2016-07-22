package com.rickcodetalk.factoryMethod;

public class ParameterizedCarFactory {

	public Car createCar(String model) {
		
		if("HondaCivic".equals(model)) {
			
			return new HondaCivic();
		} else if("HondaStream".equals(model)) {
			
			return new HondaStream("Honda Stream", 1800);
		} else {
			
			return null;
		}
	}
}
