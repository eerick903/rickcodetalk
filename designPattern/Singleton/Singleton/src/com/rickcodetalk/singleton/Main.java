package com.rickcodetalk.singleton;

public class Main {

	public static void main(String[] args) {
/*
		Singleton instance1 = Singleton.getInstance();
		
		System.out.println("instance 1 : " + instance1.hashCode());
		
		Singleton instance2 = Singleton.getInstance();

		System.out.println("instance 2 : " + instance2.hashCode());
*/
		
		TestSingleton test1 = new TestSingleton();
		Thread thread1 = new Thread(test1);
		thread1.start();
		
		TestSingleton test2 = new TestSingleton();
		Thread thread2 = new Thread(test2);
		thread2.start();
	}

}
