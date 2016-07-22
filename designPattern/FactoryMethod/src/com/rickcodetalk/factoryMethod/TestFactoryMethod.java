package com.rickcodetalk.factoryMethod;

public class TestFactoryMethod { 

	public static void main(String[] args) {
		
		
		Car car1 = new HondaCivicFactory().createCar();
		car1.printInfo();
		
		Car car2 = new HondaStreamFactory().createCar();
		car2.printInfo();
		
		Car car3 = new HondaStreamRSFactory().createCar();
		car3.printInfo();
		
		Car car4 = new ParameterizedCarFactory().createCar("HondaCivic");
		car4.printInfo();
	}
}
