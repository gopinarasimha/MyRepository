package com.mits.selenium.testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class SeleniumWebDriverTest {

	WebDriver driver = null;

	@Test
	public void MyFirstTestNGTestCase() throws InterruptedException {
		
		System.out.println("Entered into MyFirstTestNGTestCase test case");

		String title = driver.getTitle();

		System.out.print("Current page title is : " + title);

		WebElement user = driver.findElement(By.name("userName"));
		
		user.sendKeys("test");
		
		WebElement pwd = driver.findElement(By.name("password"));
		
		pwd.sendKeys("test");
		
		WebElement signin = driver.findElement(By.name("login"));
		
		signin.click();

		Thread.sleep(1000);

		System.out.print("\n'SUCCESSFUL EXECUTION!!!");
		
		System.out.println("Exit from MyFirstTestNGTestCase test case");
	}

	@BeforeMethod
	public void startFireFox() {

		System.out.println("Entered into startFireFox");
		
		System.setProperty("webdriver.chrome.driver",
				"D:\\Gopi\\Technical\\CI-ContinuousIntegration\\Selenium\\Selenium_WebDriver\\chromedriver_win32\\chromedriver.exe");

		driver = new ChromeDriver();

		driver.manage().window().maximize();

		driver.get("http://newtours.demoaut.com/");
		
		System.out.println("Exit from startFireFox");
	}

	@AfterMethod
	public void cleaupProc() {
		
		System.out.println("Entered into cleaupProc");
		
		System.out.print("\nBrowser close");
		
		driver.quit();
		
		System.out.println("Exit from cleaupProc");
	}

}