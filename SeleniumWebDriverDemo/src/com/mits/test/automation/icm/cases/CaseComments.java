package com.mits.test.automation.icm.cases;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import com.mits.test.automation.icm.login.LoginAutomate;

public class CaseComments {
	
	public static WebDriver webDriver= null;
	
	
	@BeforeMethod
	public void startFireFox() {

		System.out.println("Entered into start Chrome");
		
		LoginAutomate loginAutomate = new LoginAutomate();
		
		webDriver = loginAutomate.intiateBrowser();
		
		loginAutomate.loginApplication("p8admin", "filenet", null);
		
		System.out.println("Exit from start Chrome");
	}
	
	@Parameters({ "comments" })
	@Test
	public void writeCaseComments(String comments){
		try{
			
			System.out.println("Entered into writeCaseComments:"+comments);
			
			CaseSearch caseSearch = new CaseSearch();
			
			caseSearch.caseEnquiry(webDriver, "%");
			
			caseSearch.verifyCaseDetails(webDriver, "%");
			
			Thread.sleep(1000);
			
			 List<WebElement> webElements = webDriver.findElements(By.xpath(".//*[@dojoattachpoint='toolbarColumn_left']"));
			 
			 System.out.println("webElements size:"+webElements.size());
			 
			 for(int i=0;i<webElements.size();i++){
				 
				 System.out.println("Inside for loop");
				
				if(webElements.get(i).getText().contains("Comments")){
					
					System.out.println("Entered into Comments if loop:"+webElements.get(i).getText());
					
					WebElement commentsWebElement = webElements.get(i).findElement(By.xpath(".//*[@id='dijit_form_Button_19_label']"));
					
					System.out.println("commentsWebElement:"+commentsWebElement.getText());
					
					commentsWebElement.click();
					
					//Alert alert = webDriver.switchTo().alert();
					//alert.sendKeys("Added By Selenium");
					WebElement commentsWebElementArea = webDriver.findElement(By.xpath(".//*[@id='commentText']"));
					
					commentsWebElementArea.sendKeys(comments);
					
					webDriver.findElement(By.xpath(".//*[@id='dijit_form_Button_31_label']")).click();
					
				}else{
					System.out.println("Entered into else condition:"+webElements.get(i).getText());
				}
				
			}
			//Assert.fail();
		}catch(Exception e){
			e.printStackTrace();
			System.out.println("Exception Occured inside the writeCaseComments method");
			Assert.fail();
		}
	}
	
	@AfterMethod
	public void cleaupProc() {
		
		System.out.println("Entered into cleaupProc");
		
		System.out.print("\nBrowser close");
		
		webDriver.quit();
		
		System.out.println("Exit from cleaupProc");
	}
	
	public static void main(String[] args) throws Exception{
		// TODO Auto-generated method stub
		
		LoginAutomate loginAutomate = new LoginAutomate();
		
		webDriver = loginAutomate.intiateBrowser();
		
		loginAutomate.loginApplication("p8admin", "filenet", null);
				
		CaseSearch caseSearch = new CaseSearch();
		
		caseSearch.caseEnquiry(webDriver, "%");
		
		caseSearch.verifyCaseDetails(webDriver, "%");
		
		Thread.sleep(2000);
		
		new CaseComments().writeCaseComments("Added By Selenium");
		
	}

}
