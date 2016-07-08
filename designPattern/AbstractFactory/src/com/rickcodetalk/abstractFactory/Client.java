package com.rickcodetalk.abstractFactory;

public class Client { 

	public static void main(String[] args) {
		
		UIToolKit toolkit = null;
		
		switch(getPlatform()) {
		
		case "WINDOW": 
			
			toolkit = new WindowUIToolkit();
			break;
			
		case "MAC":
			
			toolkit = new MacUIToolkit();
			break;
			
		}
		
		toolkit.createButton().paint();
		toolkit.createScrollBar().paint();
	}
	
	public static String getPlatform() {
		
		return "MAC";
	}
}
