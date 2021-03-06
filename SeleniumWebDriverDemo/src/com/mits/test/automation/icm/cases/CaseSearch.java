package com.mits.test.automation.icm.cases;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.Test;

public class CaseSearch {
	
	@Test
	public void caseEnquiry(WebDriver driver, String value){
		
		try{
			driver.findElement(By.xpath(".//*[@id='NAO_AccountNumber icm_pgwidget_casesearch_CaseSearch_0']")).sendKeys(value);
		      
		    Thread.sleep(2000);
		      
		    driver.findElement(By.xpath(".//*[@id='dijit_form_Button_18_label']")).click();
		      
		}catch(Exception e){
			
			System.out.println("Exception Occured in the caseEnquiry function");
			
			e.printStackTrace();
		}
	}
	@Test
	public void verifyCaseDetails(WebDriver driver, String value){
		
		try{
			
			Thread.sleep(2000);
			
			driver.findElement(By.xpath(".//*[@title='TS_Test_000000100001']")).click();
		      
		}catch(Exception e){
			
			System.out.println("Exception Occured in the caseEnquiry function");
			
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
