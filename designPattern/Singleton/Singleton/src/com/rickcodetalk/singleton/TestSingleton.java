package com.rickcodetalk.singleton;

public class TestSingleton implements Runnable {

	@Override
	public void run() {
		Singleton instance = Singleton.getInstance();
		
		System.out.println("instance : " + instance.hashCode());
		
	}

	
}
