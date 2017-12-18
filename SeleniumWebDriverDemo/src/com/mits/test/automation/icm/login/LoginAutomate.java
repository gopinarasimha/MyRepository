package com.mits.test.automation.icm.login;

import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginAutomate {
	
	private WebDriver driver = null;

	public WebDriver intiateBrowser() {

		try {

			System.setProperty("webdriver.chrome.driver",
					"D:\\Gopi\\Technical\\CI-ContinuousIntegration\\Selenium\\Selenium_WebDriver\\chromedriver_win32\\chromedriver.exe");

			if(driver==null){
				
				driver = new ChromeDriver();
			
				driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);

				driver.get("http://192.168.231.156:9080/navigator/?desktop=icm");

				driver.manage().window().maximize();
			}
			
			return driver;

		} catch (Exception e) {
			
			System.out.println("Exception occured while intiate the Browser");
			
			e.printStackTrace();
			
			return null;
		}

	}
	
	public void loginApplication(String userName, String password,String domain){
		
		try{
			driver.findElement(By.xpath(".//*[@id='ecm_widget_layout_NavigatorMainLayout_0_LoginPane_username']")).sendKeys(userName);
		      
		    driver.findElement(By.xpath(".//*[@id='ecm_widget_layout_NavigatorMainLayout_0_LoginPane_password']")).sendKeys(password);
		      
		    driver.findElement(By.xpath(".//*[@id='ecm_widget_layout_NavigatorMainLayout_0_LoginPane_LoginButton']")).click();
		      
		      Thread.sleep(3000);
		      
		}catch(Exception e){
			e.printStackTrace();
			System.out.println("Failed Login into the application");
		}
	}

	public void closeBrowser() {

		try {

			driver.close();

		} catch (Exception e) {
			
			System.out.println("Exception occured while closing the Browser");
			
			e.printStackTrace();
		}

	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
