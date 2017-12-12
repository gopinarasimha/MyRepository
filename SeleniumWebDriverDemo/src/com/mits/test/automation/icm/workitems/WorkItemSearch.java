package com.mits.test.automation.icm.workitems;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class WorkItemSearch {

	public void workEnquiry(WebDriver driver, String value) {

		try {
			driver.findElement(By.xpath(".//*[@id='CmAcmCaseIdentifier icm_pgwidget_casesearch_CaseSearch_0']"))
					.sendKeys(value);

			Thread.sleep(2000);

			driver.findElement(By.xpath(".//*[@id='dijit_form_Button_18_label']")).click();

		} catch (Exception e) {

			System.out.println("Exception Occured in the caseEnquiry function");

			e.printStackTrace();
		}
	}

	public void verifyWorkDetails(WebDriver driver, String value) {

		try {

			List<WebElement> webElements = driver.findElements(By.xpath(".//*[@class='icmToolbar icmPageWidget']"));

			for (int i = 0; i < webElements.size(); i++) {

				System.out.println("webElement:" + webElements.get(i).getAttribute("id") + " : "
						+ webElements.get(i).getAttribute("widgetid") + " : " + webElements.get(i).getText());

				if (webElements.get(i).getAttribute("widgetid").indexOf("WorkitemToolbar") >= 0) {
					
					System.out.println("Entered into if");

					WebElement toolbar = webElements.get(i);

					List<WebElement> buttonWebElements = toolbar.findElements(
							By.xpath(".//*[@class='dijit dijitReset dijitInline idxButtonDerived dijitButton']"));

					for (int j = 0; j < buttonWebElements.size(); j++) {
						
						System.out.println("buttonWebElements:" + buttonWebElements.get(j).getAttribute("id") + " : "
								+ buttonWebElements.get(j).getText());

						if (buttonWebElements.get(j).getText().equalsIgnoreCase("Complete")) {
							
							System.out.println("Before Comple action");

							buttonWebElements.get(j).click();

							System.out.println("After Comple action");
						}
					}

				}

			}

			System.out.println("After 1st Complete the Workitem");

		} catch (Exception e) {

			System.out.println("Exception Occured in the caseEnquiry function");

			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
