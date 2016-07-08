package com.rickcodetalk.abstractFactory;

public class WindowUIToolkit extends UIToolKit {

	/**
	 * 
	 */
	public Button createButton() { 
		
		return new WindowButton();
	 }

	/**
	 * 
	 */
	public ScrollBar createScrollBar() { 
		
		return new WindowScrollBar();
	 } 

}
