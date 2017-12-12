import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class WebDriverDemo {

	public static void main(String[] args) throws Exception{
		// TODO Auto-generated method stub
		
		//System.setProperty("webdriver.gecko.driver", "D:\\Gopi\\Technical\\CI-ContinuousIntegration\\Selenium\\Selenium_WebDriver\\geckodriver.exe");
		
		System.setProperty("webdriver.chrome.driver", "D:\\Gopi\\Technical\\CI-ContinuousIntegration\\Selenium\\Selenium_WebDriver\\chromedriver_win32\\chromedriver.exe");
		
		
		
		//WebDriver driver = new FirefoxDriver();
		WebDriver driver = new ChromeDriver();
		
	      //Puts an Implicit wait, Will wait for 10 seconds before throwing exception
	      driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
	      
	      driver.get("http://192.168.231.149:9080/navigator/?desktop=icm");
	      
	      //Launch website
	      //driver.navigate().to("http://192.168.231.149:9080/navigator/?desktop=icm");
	      
	      //Maximize the browser
	      driver.manage().window().maximize();
	      
	      driver.findElement(By.xpath(".//*[@id='ecm_widget_layout_NavigatorMainLayout_0_LoginPane_username']")).sendKeys("p8admin");
	      
	      driver.findElement(By.xpath(".//*[@id='ecm_widget_layout_NavigatorMainLayout_0_LoginPane_password']")).sendKeys("filenet");
	      
	      driver.findElement(By.xpath(".//*[@id='ecm_widget_layout_NavigatorMainLayout_0_LoginPane_LoginButton']")).click();
	      
	      Thread.sleep(3000);
	      
	     /* driver.findElement(By.xpath(".//*[@id='CmAcmCaseIdentifier icm_pgwidget_casesearch_CaseSearch_0']")).sendKeys("%");
	      
	      Thread.sleep(2000);
	      
	      driver.findElement(By.xpath(".//*[@id='dijit_form_Button_18_label']")).click();*/
	      
	      System.out.println("Work Page Loaded");
	      
	      driver.findElement(By.className("firstColumnLink")).click();
	     
	      System.out.println("After Workitem Click");
	      
	      Thread.sleep(3000);
	      
	      //System.out.println("Complete Size Eleent:"+driver.findElements(By.xpath("//*Complete")).size());
	      
	      //driver.findElement(By.xpath(".//*[@id='dijit_form_Button_25_label']")).click();
	      
	      //WebElement webElement = driver.findElement(By.xpath("/html/body/div[3]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]"));
	      
	      //WebElement webElement = driver.findElement(By.xpath("/html/body/div[3]/div[1]/div[1]/div[2]/div[2]/div[1]"));
	      //WebElement webElement = driver.findElement(By.xpath("/html/body/div[3]/div[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[2]"));
	      
	      //WebElement webElement = driver.findElement(By.xpath("/html/body/div[3]/div[1]/div[1]/div[2]/div[2]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]"));
	      
	      List<WebElement> webElements = driver.findElements(By.xpath(".//*[@class='icmToolbar icmPageWidget']"));
	      
	      
	      for(int i=0;i<webElements.size();i++){
	    	  
	    	  System.out.println("webElement:"+webElements.get(i).getAttribute("id")+" : "+webElements.get(i).getAttribute("widgetid")+" : "+webElements.get(i).getText());
	    	 
	    	  if(webElements.get(i).getAttribute("widgetid").indexOf("WorkitemToolbar")>=0){
	    		  System.out.println("Entered into if");
	    		  
	    		  WebElement toolbar = webElements.get(i);
		    	  
		    	  List<WebElement> buttonWebElements= toolbar.findElements(By.xpath(".//*[@class='dijit dijitReset dijitInline idxButtonDerived dijitButton']"));
		    	  
		    	  for(int j=0;j<buttonWebElements.size();j++){
		    		  System.out.println("buttonWebElements:"+buttonWebElements.get(j).getAttribute("id")+" : "+buttonWebElements.get(j).getText());
		 	    	 
		    		  if(buttonWebElements.get(j).getText().equalsIgnoreCase("Complete")){
		    			System.out.println("Before Comple action");
		 	    		
		    			buttonWebElements.get(j).click();
		 	    		
		    			System.out.println("After Comple action");
		 	    	 }
		    	  }
		    	  
	    	  }
	    		  
	    	 
	      }
	      
	      

	      System.out.println("After 1st Complete the Workitem");
	      
	      //driver.findElement(By.xpath(".//*[@id='icm_widget_SelectorTabContainer_0_tablist_a134c5e2-ebe5-4a53-8276-20c76a74c870']")).click();

	      //===========================================
	     /* Thread.sleep(3000);
	      
	      driver.findElement(By.className("firstColumnLink")).click();
		     
	      System.out.println("After Workitem Click");
	      
	      Thread.sleep(3000);
	      
	      //System.out.println("Complete Size Eleent:"+driver.findElements(By.xpath("//*Complete")).size());
	      
	      driver.findElement(By.xpath(".//*[@id='dijit_form_Button_25_label']")).click();

	      System.out.println("After Complete the Workitem");*/
	      //============================================
	      
	      
	      //*[@id='ecm_widget_layout_NavigatorMainLayout_0_LoginPane_username']
	      
	     /* // Click on Math Calculators
	      driver.findElement(By.xpath(".//*[@id = 'menu']/div[3]/a")).click();
	      
	      // Click on Percent Calculators
	      driver.findElement(By.xpath(".//*[@id = 'menu']/div[4]/div[3]/a")).click();
	      
	      // Enter value 10 in the first number of the percent Calculator
	      driver.findElement(By.id("cpar1")).sendKeys("10");
	      
	      // Enter value 50 in the second number of the percent Calculator
	      driver.findElement(By.id("cpar2")).sendKeys("50");
	      
	      // Click Calculate Button
	      driver.findElement(By.xpath(".//*[@id = 'content']/table/tbody/tr[2]/td/input[2]")).click();

	      
	      // Get the Result Text based on its xpath
	      String result =
	         driver.findElement(By.xpath(".//*[@id = 'content']/p[2]/font/b")).getText();

	      
	      // Print a Log In message to the screen
	      System.out.println(" The Result is " + result);
	      
	      //Close the Browser.
	      driver.close();*/
	}

}
