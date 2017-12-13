package com.mits.selenium.testing;

import org.testng.annotations.AfterMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

public class ParametersTesting {
//Test NG Parameter testing and verify wether it is updated in GitHub
	@Parameters({ "BrowserName" })
	@Test
	public void OpenBrowser(String BrowserName) {
		System.out.println("browser passed as :- " + BrowserName);
	}

	@Parameters({ "UserName", "Passcode" })
	@Test
	public void FillLoginForm(String UserName, String Passcode) {
		System.out.println("Parameter for User Name passed as :- " + UserName);
		System.out.println("Parameter for Passcode passed as :- " + Passcode);
	}
	
	@AfterMethod
	public void cleaupProcInParamTest() {
		
		System.out.println("Entered into cleaupProcInParamTest");
		
		System.out.println("Exit from cleaupProcInParamTest");
	}

}
