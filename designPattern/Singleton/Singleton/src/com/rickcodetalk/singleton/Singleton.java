package com.rickcodetalk.singleton;

public class Singleton {

	/**
	 * 
	 */
	private static Singleton instance;

	private Singleton() {}
	
	/**
	 * 
	 * @return 
	 */
	public static Singleton getInstance() {
		
		if(instance == null) {
			
			synchronized(Singleton.class) {
			
				if(instance == null) {
					instance = new Singleton();
				}
			}
		}
		
	 	 return instance; 
	}

	/**
	 * Setter of instance
	 */
	public void setInstance(Singleton instance) { 
		 this.instance = instance; 
	} 

}
