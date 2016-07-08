package com.rickcodetalk.abstractFactory;

public class MacUIToolkit extends UIToolKit {

	/**
	 * 
	 */
	public Button createButton() { 
		
		return new MacButton();
	 }

	/**
	 * 
	 */

	@Override
	public ScrollBar createScrollBar() {
		return new MacScrollBar();
	} 

}
